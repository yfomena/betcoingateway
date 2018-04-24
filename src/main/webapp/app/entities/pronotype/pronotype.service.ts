import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Pronotype } from './pronotype.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pronotype>;

@Injectable()
export class PronotypeService {

    private resourceUrl =  SERVER_API_URL + 'betcoinapi/api/pronotypes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(pronotype: Pronotype): Observable<EntityResponseType> {
        const copy = this.convert(pronotype);
        return this.http.post<Pronotype>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pronotype: Pronotype): Observable<EntityResponseType> {
        const copy = this.convert(pronotype);
        return this.http.put<Pronotype>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pronotype>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pronotype[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pronotype[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pronotype[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pronotype = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pronotype[]>): HttpResponse<Pronotype[]> {
        const jsonResponse: Pronotype[] = res.body;
        const body: Pronotype[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pronotype.
     */
    private convertItemFromServer(pronotype: Pronotype): Pronotype {
        const copy: Pronotype = Object.assign({}, pronotype);
        copy.expirationDate = this.dateUtils
            .convertDateTimeFromServer(pronotype.expirationDate);
        return copy;
    }

    /**
     * Convert a Pronotype to a JSON which can be sent to the server.
     */
    private convert(pronotype: Pronotype): Pronotype {
        const copy: Pronotype = Object.assign({}, pronotype);

        copy.expirationDate = this.dateUtils.toDate(pronotype.expirationDate);
        return copy;
    }
}
