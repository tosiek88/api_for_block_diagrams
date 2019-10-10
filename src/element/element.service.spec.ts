import { Test, TestingModule } from '@nestjs/testing';
import { ElementService } from './element.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entity/element.entity';
import { Repository } from 'typeorm';
import { Connection } from '../connection/entity/connection.entity';

describe('Element Service', () => {
  let service: ElementService;
  let repoElement: Repository<Element>;
  let repoConnection: Repository<Connection>;

  beforeEach(async () => {
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
          provide: `${getRepositoryToken(Element)}Repository`,
          useClass: Repository,
        },
        {
          provide: `${getRepositoryToken(Connection)}Reposiotry`,
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<ElementService>(ElementService);

    repoElement = module.get<Repository<Element>>(getRepositoryToken(Element));
    repoConnection = module.get<Repository<Connection>>(
      getRepositoryToken(Connection),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
  it('should create an Element', async () => {
    const testElement: Element = {
      id: 1,
      name: 'LV Switchboard nb 1',
      connections: [],
    };

    jest
      .spyOn(repoElement.manager, 'save')
      .mockResolvedValue(Promise.resolve<Element[]>([testElement]));

    expect(await service.createElement(testElement)).toEqual([testElement]);
  });

  it('should return Exception if Element is not valid', async () => {
    const testElement: Element = {
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
      .mockResolvedValue(Promise.resolve<Element[]>([testElement]));
    await expect(errorProneFunc()).rejects.toThrow();
  });
});
