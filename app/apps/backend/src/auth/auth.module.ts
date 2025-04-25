import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google-oauth.config';

@Module({
    imports: [ConfigModule.forFeature(googleOauthConfig)]
})
export class AuthModule {}
