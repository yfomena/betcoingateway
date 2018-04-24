import { BaseEntity } from './../../shared';

export class Gamer implements BaseEntity {
    constructor(
        public id?: number,
        public pseudo?: string,
        public email?: string,
        public points?: number,
        public lastConnexion?: any,
        public winningRun?: number,
        public isAdmin?: boolean,
        public pronostics?: BaseEntity[],
    ) {
        this.isAdmin = false;
    }
}
