import { Element } from './../entity/element.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ElementService } from '../element.service';
import CustomRepo from '../element.repository';
import { TestingModule, Test } from '@nestjs/testing';
import { Connection } from '../../connection/entity/connection.entity';
import { Repository } from 'typeorm';

describe('Getting Elements', () => {
  let service: ElementService;
  let repoElement: CustomRepo;
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
          provide: CustomRepo,
          useClass: CustomRepo,
        },
        {
          provide: `${getRepositoryToken(Connection)}Reposiotry`,
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<ElementService>(ElementService);
    repoElement = module.get<CustomRepo>(CustomRepo);
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
