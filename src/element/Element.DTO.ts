import ConnectionDTO from 'src/connection/connection.DTO';

export default class ElementDTO {
  id: number;
  name: string;

  connection: ConnectionDTO[];
}
