import { Test, TestingModule } from '@nestjs/testing';
import { ElementService } from '../element.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Element } from '../entity/element.entity';
import { Repository } from 'typeorm';
import { Connection } from '../../connection/entity/connection.entity';
import { ElementRepository } from '../element.repository';
import ElementDTO from '../Element.DTO';

describe('Getting Elements', () => {
  let service: ElementService;
  let repoElement: ElementRepository;
  beforeAll(async () => {
    // tslint:disable-next-line: no-console
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
          provide: `${getRepositoryToken(ElementRepository)}Repository`,
          useClass: ElementRepository,
        },
        {
          provide: `${getRepositoryToken(Connection)}Reposiotry`,
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<ElementService>(ElementService);

    repoElement = module.get<ElementRepository>(ElementRepository);
  });

  it('should return for getAllElement', async () => {
    const testElement: Element[] = [
      {
        id: 1,
        name: 'LV Switchboard nb 1',
        connections: [],
      },
      {
        id: 2,
        name: 'LV Switchboard nb 2',
        connections: [],
      },
    ];
    jest
      .spyOn(repoElement, 'find')
      .mockResolvedValue(Promise.resolve<Element[]>(testElement));

    expect(await service.getAllElement()).toEqual(testElement);
  });
});
describe('Create element', () => {
  let service: ElementService;
  let repoElement: ElementRepository;
  let repoConnection: Repository<Connection>;

  beforeAll(async () => {
    // tslint:disable-next-line: no-console
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
          provide: `${getRepositoryToken(ElementRepository)}Repository`,
          useClass: ElementRepository,
        },
        {
          provide: `${getRepositoryToken(Connection)}Reposiotry`,
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<ElementService>(ElementService);

    repoElement = module.get<ElementRepository>(ElementRepository);
    repoConnection = module.get<Repository<Connection>>(
      getRepositoryToken(Connection),
    );
  });

  it('should create an Element', async () => {
    const testElement: ElementDTO = {
      name: 'LV Switchboard nb 1',
      connections: [{ id: 1, label: 'test' }],
    };

    repoElement.createElement = jest.fn().mockReturnValue(testElement);
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

  it('should return Exception if Element is not valid', async () => {
    const testElement: ElementDTO = {
      id: 1,
      name: 'LV Switchboard nb 1',
      connections: null,
    };

    async function errorProneFunc(): Promise<Error> {
      return new Promise<Error>((resolve, reject) => {
        throw new Error('Connection i null');
      });
    }
    jest
      .spyOn(repoElement.manager, 'save')
      .mockResolvedValue(Promise.resolve<ElementDTO[]>([testElement]));
    await expect(errorProneFunc()).rejects.toThrow();
  });
});
