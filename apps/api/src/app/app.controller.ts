import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClientService } from '@libs/prisma-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prismaClientService: PrismaClientService) {}

  @Get()
  getData() {
    this.prismaClientService.test();
    return this.appService.getData();
  }
}
