import ElementDTO from '../element/Element.DTO';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Logger,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { Element } from './entity/element.entity';
@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}
  @Get()
  public async getElement(): Promise<Element[]> {
    return await this.elementService.getAllElement();
  }

  @Get(':id')
  public getElementAt(@Param() params) {
    return this.elementService.getElementAt(params.id);
  }

  @Post()
  public createElement(@Body() element: ElementDTO) {
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
