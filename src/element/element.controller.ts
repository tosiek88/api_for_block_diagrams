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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ElementService } from './element.service';
import { Element } from './entity/element.entity';
import { restElement } from '@babel/types';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}
  @Get()
  public async getElement(): Promise<Element[]> {
    return await this.elementService.getAllElement();
  }

  @Get(':id')
  public async getElementAt(@Res() res: Response, @Param() params) {
    const result = await this.elementService.getElementAt(params.id);
    if (result === undefined) {
      return await res.status(HttpStatus.NO_CONTENT).send();
    } else {
      return await res.status(HttpStatus.OK).json(result);
    }
  }

  @Post()
  public async createElement(@Body() elements: ElementDTO[]) {
    const req = await this.elementService.createElements(elements);
    return req;
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
