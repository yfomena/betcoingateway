import { BaseEntity } from './../../shared';

export class Pronotype implements BaseEntity {
    constructor(
        public id?: number,
        public pronotypeName?: string,
        public expirationDate?: any,
        public points?: number,
        public pronostics?: BaseEntity[],
    ) {
    }
}
