import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [PostsModule, PostsModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
