import { BaseEntity } from './../../shared';

export class Phase implements BaseEntity {
    constructor(
        public id?: number,
        public phaseName?: string,
        public games?: BaseEntity[],
    ) {
    }
}
