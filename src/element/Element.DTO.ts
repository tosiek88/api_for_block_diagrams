import ConnectionDTO from '../connection/connection.DTO';
// Stash test
export default class ElementDTO {
    id?: number;
    name: string;

    input?: ConnectionDTO[];
    output?: ConnectionDTO[];
}
