import { BaseEntity } from './../../shared';

export class Groupe implements BaseEntity {
    constructor(
        public id?: number,
        public groupName?: string,
        public winner?: BaseEntity,
        public second?: BaseEntity,
        public teams?: BaseEntity[],
    ) {
    }
}
