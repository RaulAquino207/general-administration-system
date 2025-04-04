import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaClientModule } from '@libs/prisma-client'

@Module({
  imports: [PrismaClientModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
