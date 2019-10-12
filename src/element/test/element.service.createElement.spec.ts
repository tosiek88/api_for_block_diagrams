import { Test, TestingModule } from '@nestjs/testing';
import { ElementService } from '../element.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Element } from '../entity/element.entity';
import { Repository } from 'typeorm';
import { Connection } from '../../connection/entity/connection.entity';
import ElementDTO from '../Element.DTO';
import CustomRepo from '../element.repository';
import { debug, isFunction } from 'util';
import { exportSpecifier } from '@babel/types';

describe('Create element', () => {
  let service: ElementService;
  let repoElement: CustomRepo;
  let repoConnection: Repository<Connection>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([Element, Connection]),
      ],
      providers: [
        ElementService,
        {
          // https://github.com/nestjs/nest/issues/1229
          provide: CustomRepo,
          useClass: CustomRepo,
        },
        {
          provide: `${getRepositoryToken(Connection)}Repository`,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ElementService>(ElementService);
    repoElement = module.get<CustomRepo>(CustomRepo);
    repoConnection = module.get<Repository<Connection>>(
      getRepositoryToken(Connection),
    );
  });

  it('should create an Element', async () => {
    const testElement: ElementDTO = {
      name: 'LV Switchboard nb 1',
      connections: [{ id: 1, label: 'test' }],
    };

    jest
      .spyOn(repoElement, 'createElement')
      .mockResolvedValue(Promise.resolve<ElementDTO>(testElement));
    expect(await service.createElement(testElement)).toEqual(testElement);
  });

  it('should return Exception', async () => {
    const testElementDTO = {
      name: 'LV Switchboard nb 2',
    };
    repoElement.createElement = jest.fn().mockImplementation(() => {
      throw new Error('Exception');
    });
    expect(service.createElement(testElementDTO)).rejects.toThrow();
  });
});
