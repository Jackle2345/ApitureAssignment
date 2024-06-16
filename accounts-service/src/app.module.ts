import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './objects/Account.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.dto{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Account])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
