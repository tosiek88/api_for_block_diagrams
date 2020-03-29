import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Logger,
    Param,
    Patch,
    Post,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import ElementDTO from '../element/Element.DTO';
import { ElementService } from './element.service';
import { Element } from './entity/element.entity';

@Controller('element')
export class ElementController {
    constructor(private readonly elementService: ElementService) { }

    @Get()
    public async getElement(@Res() res: Response): Promise<Response> {
        Logger.log(`GET element`);
        const result = await this.elementService.getAllElement();
        return res.status(HttpStatus.OK).json(result);
    }

    @Get(':id')
    public async getElementAt(@Res() res: Response, @Param() params) {
        const result = await this.elementService.getElementAt(params.id);
        if (result === undefined) {
            return res.status(HttpStatus.NO_CONTENT).send();
        } else {
            return res.status(HttpStatus.OK).json(result);
        }
    }

    @Post()
    public async createElement(@Body() elements: ElementDTO[]) {
        const req = await this.elementService.createElements(elements);
        return req;
    }

    @Patch()
    public async updateElement(
        @Res() res: Response,
        @Body() element: ElementDTO,
    ) {
        const result = await this.elementService.updateElement(element);
        if (result === undefined) {
            return res.status(HttpStatus.NO_CONTENT).send();
        } else {
            return res.status(HttpStatus.CREATED).json(result);
        }
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
