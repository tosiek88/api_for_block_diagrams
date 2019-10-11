import ConnectionDTO from '../connection/connection.DTO';

export default class ElementDTO {
  id?: number;
  name: string;

  connections?: ConnectionDTO[];
}
