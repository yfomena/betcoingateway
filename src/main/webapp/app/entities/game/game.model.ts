import { BaseEntity } from './../../shared';

export class Game implements BaseEntity {
    constructor(
        public id?: number,
        public matchDate?: any,
        public scoreHome?: number,
        public scoreAway?: number,
        public team1?: BaseEntity,
        public team2?: BaseEntity,
        public phase?: BaseEntity,
    ) {
    }
}
