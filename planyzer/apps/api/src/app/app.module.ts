import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { FeatureModule } from './feature/feature.module';
import { ProjectModule } from './project/project.module';

import { ProjectFeatureModule } from './projectfeature/projectfeature.module';
import { UserProjectFeatureModule } from './userprojectfeature/userprojectfeature.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProjectModule,
    FeatureModule,
    ProjectFeatureModule,
    UserProjectFeatureModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
