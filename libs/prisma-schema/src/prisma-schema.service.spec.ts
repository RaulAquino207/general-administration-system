import { Test, TestingModule } from '@nestjs/testing';
import { PrismaSchemaService } from './prisma-schema.service';

describe('PrismaSchemaService', () => {
  let service: PrismaSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaSchemaService],
    }).compile();

    service = module.get<PrismaSchemaService>(PrismaSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
