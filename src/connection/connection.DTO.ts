import ElementDTO from 'src/element/Element.DTO';

export default class ConnectionDTO {
  id?: number;
  label: string;

  elements?: ElementDTO[];
}
