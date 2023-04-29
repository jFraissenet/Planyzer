import {
  BadRequestException,
  Injectable,
  forwardRef,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from '@planyzer/shared-types';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from '@planyzer/shared-types';

@Injectable()
export class AuthService {
  constructor(
    //@Inject(forwardRef(() => UserService))
    @Inject(UserService)
    private readonly usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findBymail(createUserDto.mail);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.psw);

    const newUser = await this.usersService.create({
      ...createUserDto,
      psw: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.mail);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findBymail(data.mail);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.psw, data.psw);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.mail);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    let log = '';
    try {
      this.usersService.update(userId, { refreshToken: null });
      console.log('Cool');
      log = 'cool';
    } catch (err) {
      console.log('Erreur : ', err);
      log = err;
    }
    return log;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, mail: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          mail,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          mail,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getOne_usr(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
