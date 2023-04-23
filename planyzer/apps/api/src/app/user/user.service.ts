import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordHasherService } from './auth/psw-hasher.service';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, LoginRsp } from '@planyzer/shared-types';
import { SignupRsp } from '@planyzer/shared-types';

import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { LogginDto } from 'libs/shared-types/src/lib/user/create-user.dto';
import { jwtConstants } from './auth/jwt.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userrepository: Repository<User>,
    @InjectRepository(Role) private readonly rolerepository: Repository<Role>,
    private hasherService: PasswordHasherService,
    private jwtService: JwtService
  ) {}

  /*create_usr(dto: CreateUserDto): Promise<User> {
    const entity = this.userrepository.create(dto);
    return this.userrepository.save(entity);
  }*/

  getAll_usr(): Promise<User[]> {
    const entity = this.userrepository.find();
    return entity;
  }

  getOne_usr(id: number): Promise<User> {
    const entity = this.userrepository.findOne({
      where: {
        id: id,
      },
    });
    return entity;
  }

  getAll_rl(): Promise<Role[]> {
    const entity = this.rolerepository.find();
    return entity;
  }

  async create_usr(doc: CreateUserDto): Promise<SignupRsp> {
    console.log(doc);
    const user = await this.userrepository.findOne({
      where: {
        mail: doc.mail,
      },
    });
    if (user) {
      throw new UnauthorizedException(
        `User already created with this ${doc.mail}`
      );
    }
    const encryptedPassword = await this.hasherService.hashPassword(doc.psw);
    doc.psw = encryptedPassword;
    console.log(doc);
    const newUser = this.userrepository.create(doc);
    this.userrepository.save(newUser);

    return { mail: doc.mail };
  }

  async login(doc: LogginDto): Promise<LoginRsp> {
    console.log('blaaaa');
    // verfiy user email
    const user = await this.userrepository.findOne({
      where: { mail: doc.mail },
    });
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    // verify user password
    const matchedPassword = await this.hasherService.comparePassword(
      doc.psw,
      user.psw
    );
    console.log(matchedPassword);

    if (matchedPassword) {
      console.log({
        email: user.mail,
        id: user.id,
      });
      // generate JSON web token
      const token = await this.jwtService.signAsync(
        {
          email: user.mail,
          id: user.id,
        },
        { secret: jwtConstants.secret }
      );
      return { token };
    } else {
      throw new UnauthorizedException(`Invalid credentials`);
    }
  }
}
