import { BaseEntity } from './../../shared';

export class Pronostic implements BaseEntity {
    constructor(
        public id?: number,
        public pronoDate?: any,
        public matchOrGroupOrcompetId?: number,
        public scoreHome?: number,
        public scoreAway?: number,
        public winner?: number,
        public gamer?: BaseEntity,
        public pronotype?: BaseEntity,
        public pronostatus?: BaseEntity,
    ) {
    }
}
