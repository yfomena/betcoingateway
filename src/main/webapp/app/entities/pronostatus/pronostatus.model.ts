import { BaseEntity } from './../../shared';

export class Pronostatus implements BaseEntity {
    constructor(
        public id?: number,
        public pronostatusName?: string,
        public pronostics?: BaseEntity[],
    ) {
    }
}
