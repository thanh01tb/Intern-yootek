import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { MiddlewareConsumer,NestModule , RequestMethod } from '@nestjs/common';
//import { AuthMiddleware } from './auth/auth.middleware.js';
import { PostsModule } from './posts/posts.module.js';
import { validateEach } from '@nestjs/common/utils/validate-each.util.js';
import { validateEnv } from './config/env.validation.js';
import { EnvCheckMiddleware } from './common/logger.middleware.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'my-app',
    }),
    ConfigModule.forRoot({ 
      isGlobal: true ,
      envFilePath: '.env' ,
      validate: validateEnv,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(EnvCheckMiddleware).forRoutes('*') ;
  }
}