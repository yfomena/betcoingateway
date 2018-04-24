import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Gamer } from './gamer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Gamer>;

@Injectable()
export class GamerService {

    private resourceUrl =  SERVER_API_URL + 'betcoinapi/api/gamers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(gamer: Gamer): Observable<EntityResponseType> {
        const copy = this.convert(gamer);
        return this.http.post<Gamer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(gamer: Gamer): Observable<EntityResponseType> {
        const copy = this.convert(gamer);
        return this.http.put<Gamer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Gamer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Gamer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Gamer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Gamer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Gamer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Gamer[]>): HttpResponse<Gamer[]> {
        const jsonResponse: Gamer[] = res.body;
        const body: Gamer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Gamer.
     */
    private convertItemFromServer(gamer: Gamer): Gamer {
        const copy: Gamer = Object.assign({}, gamer);
        copy.lastConnexion = this.dateUtils
            .convertDateTimeFromServer(gamer.lastConnexion);
        return copy;
    }

    /**
     * Convert a Gamer to a JSON which can be sent to the server.
     */
    private convert(gamer: Gamer): Gamer {
        const copy: Gamer = Object.assign({}, gamer);

        copy.lastConnexion = this.dateUtils.toDate(gamer.lastConnexion);
        return copy;
    }
}
