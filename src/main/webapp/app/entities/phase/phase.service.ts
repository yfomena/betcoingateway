import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Phase } from './phase.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Phase>;

@Injectable()
export class PhaseService {

    private resourceUrl =  SERVER_API_URL + 'betcoinapi/api/phases';

    constructor(private http: HttpClient) { }

    create(phase: Phase): Observable<EntityResponseType> {
        const copy = this.convert(phase);
        return this.http.post<Phase>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(phase: Phase): Observable<EntityResponseType> {
        const copy = this.convert(phase);
        return this.http.put<Phase>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Phase>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Phase[]>> {
        const options = createRequestOption(req);
        return this.http.get<Phase[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Phase[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Phase = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Phase[]>): HttpResponse<Phase[]> {
        const jsonResponse: Phase[] = res.body;
        const body: Phase[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Phase.
     */
    private convertItemFromServer(phase: Phase): Phase {
        const copy: Phase = Object.assign({}, phase);
        return copy;
    }

    /**
     * Convert a Phase to a JSON which can be sent to the server.
     */
    private convert(phase: Phase): Phase {
        const copy: Phase = Object.assign({}, phase);
        return copy;
    }
}
