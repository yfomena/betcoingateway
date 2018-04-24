import { BaseEntity } from './../../shared';

export class Competition implements BaseEntity {
    constructor(
        public id?: number,
        public competitionName?: string,
        public winner?: BaseEntity,
        public second?: BaseEntity,
        public third?: BaseEntity,
    ) {
    }
}
