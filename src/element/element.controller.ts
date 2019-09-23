import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { Element } from './entity/element.entity';
import { identity } from 'rxjs';
@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}
  @Get()
  public getElement(): string {
    return this.elementService.getElement();
  }

  @Get(':id')
  public getElementA(@Param() params) {
    return this.elementService.getElementAt(params.id);
  }

  @Post()
  public createElement(@Body() element: Element) {
    return this.elementService.createElement(element);
  }

  @Patch(':id')
  public updateElement(@Param() params, @Body() element: Element) {
    return this.elementService.updateElement(params.id, element);
  }

  @Patch('/addConnection/:id')
  public addConnection(@Param() params, @Body() element: Element) {
    return this.elementService.assignConnectionToElement(params.id, element);
  }

  @Delete(':id')
  public deleteElement(@Param() params) {
    this.elementService.deleteElement(params.id);
  }

  @Delete()
  public deleteAllElements() {
    this.elementService.deleteAllElements();
  }
}
