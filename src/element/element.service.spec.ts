import { Test, TestingModule } from '@nestjs/testing';
import { ElementService } from './element.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Element } from './entity/element.entity';
import { Repository } from 'typeorm';
