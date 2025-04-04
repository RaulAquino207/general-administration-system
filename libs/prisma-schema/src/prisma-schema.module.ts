import { Module } from '@nestjs/common';
import { PrismaSchemaService } from './prisma-schema.service';

@Module({
  providers: [PrismaSchemaService],
  exports: [PrismaSchemaService],
})
export class PrismaSchemaModule {}
