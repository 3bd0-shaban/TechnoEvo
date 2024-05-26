import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { LogModule } from './modules/log/log.module';
import { SeoModule } from './modules/seo/seo.module';
import { BlogModule } from './modules/blog/blog.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BannerModule } from './modules/banner/banner.module';
import { CommentModule } from './modules/comment/comment.module';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { isDev } from './global/env';
import config from './config';
import { DatabaseModule } from './shared/database/database.module';
import { MailerModule } from './shared/mailer/mailer.module';
import { SeoAnalyticsModule } from './modules/analytics/seo-analytics/seo-analytics.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [
        '.env.development',
        // '.env.production',
        `.env.${process.env.NODE_ENV}`,
        '.env',
      ],
      load: [...Object.values(config)],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        errorMessage: '当前操作过于频繁，请稍后再试！',
        throttlers: [{ ttl: seconds(10), limit: 7 }],
      }),
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: isDev,
      ignoreErrors: false,
    }),
    MailerModule,
    BlogModule,
    CategoryModule,
    LogModule,
    SeoModule,
    AuthModule,
    UserModule,
    BannerModule,
    CommentModule,

    //Analytics
    SeoAnalyticsModule,

    ReplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
