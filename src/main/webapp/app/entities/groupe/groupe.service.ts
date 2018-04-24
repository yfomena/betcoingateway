import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Groupe } from './groupe.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Groupe>;

@Injectable()
export class GroupeService {

    private resourceUrl =  SERVER_API_URL + 'betcoinapi/api/groupes';

    constructor(private http: HttpClient) { }

    create(groupe: Groupe): Observable<EntityResponseType> {
        const copy = this.convert(groupe);
        return this.http.post<Groupe>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(groupe: Groupe): Observable<EntityResponseType> {
        const copy = this.convert(groupe);
        return this.http.put<Groupe>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Groupe>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Groupe[]>> {
        const options = createRequestOption(req);
        return this.http.get<Groupe[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Groupe[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Groupe = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Groupe[]>): HttpResponse<Groupe[]> {
        const jsonResponse: Groupe[] = res.body;
        const body: Groupe[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Groupe.
     */
    private convertItemFromServer(groupe: Groupe): Groupe {
        const copy: Groupe = Object.assign({}, groupe);
        return copy;
    }

    /**
     * Convert a Groupe to a JSON which can be sent to the server.
     */
    private convert(groupe: Groupe): Groupe {
        const copy: Groupe = Object.assign({}, groupe);
        return copy;
    }
}
