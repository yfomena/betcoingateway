import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Pronostatus } from './pronostatus.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pronostatus>;

@Injectable()
export class PronostatusService {

    private resourceUrl =  SERVER_API_URL + 'betcoinapi/api/pronostatuses';

    constructor(private http: HttpClient) { }

    create(pronostatus: Pronostatus): Observable<EntityResponseType> {
        const copy = this.convert(pronostatus);
        return this.http.post<Pronostatus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pronostatus: Pronostatus): Observable<EntityResponseType> {
        const copy = this.convert(pronostatus);
        return this.http.put<Pronostatus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pronostatus>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pronostatus[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pronostatus[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pronostatus[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pronostatus = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pronostatus[]>): HttpResponse<Pronostatus[]> {
        const jsonResponse: Pronostatus[] = res.body;
        const body: Pronostatus[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pronostatus.
     */
    private convertItemFromServer(pronostatus: Pronostatus): Pronostatus {
        const copy: Pronostatus = Object.assign({}, pronostatus);
        return copy;
    }

    /**
     * Convert a Pronostatus to a JSON which can be sent to the server.
     */
    private convert(pronostatus: Pronostatus): Pronostatus {
        const copy: Pronostatus = Object.assign({}, pronostatus);
        return copy;
    }
}
