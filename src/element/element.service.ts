import { Injectable } from '@nestjs/common';

@Injectable()
export class ElementService {
  getElement(): string {
    return 'Element';
  }
}
