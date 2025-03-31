import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaClientService {
    test() {
        console.log('test');
    }
}
