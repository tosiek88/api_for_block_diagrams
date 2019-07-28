import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ElementService } from './element.service';
import { Element } from './element/element.entity';
@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}
  @Get()
  public getElement(): string {
    return this.elementService.getElement();
  }

  @Get(':id')
  public getElementA(@Param() params) {
    return this.elementService.getElementA(params.id);
  }

  @Post()
  public createUser(@Body() element: Element) {
    return this.elementService.createElement(element);
  }
}
