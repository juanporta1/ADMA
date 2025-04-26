import { Module } from '@nestjs/common';
import { ConfigModule, ConfigFactory } from '@flowcore/microservice';
import googleOauthConfig from './config/google-oauth.config';
import {
  OidcProtectModuleBuilder,
  OidcProtectConfigurationSchema,
  RoleGuard,
} from '@flowcore/nestjs-oidc-protect';

const config = ConfigModule.forRoot(
  new ConfigFactory().withSchema(OidcProtectConfigurationSchema)
);
@Module({
  imports: [config, new OidcProtectModuleBuilder().withConfig(config).build()],
  providers: [RoleGuard],
})
export class AuthModule {}
