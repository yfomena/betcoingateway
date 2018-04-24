import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PronosticComponent } from './pronostic.component';
import { PronosticDetailComponent } from './pronostic-detail.component';
import { PronosticPopupComponent } from './pronostic-dialog.component';
import { PronosticDeletePopupComponent } from './pronostic-delete-dialog.component';

@Injectable()
export class PronosticResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const pronosticRoute: Routes = [
    {
        path: 'pronostic',
        component: PronosticComponent,
        resolve: {
            'pagingParams': PronosticResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pronostic/:id',
        component: PronosticDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pronosticPopupRoute: Routes = [
    {
        path: 'pronostic-new',
        component: PronosticPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pronostic/:id/edit',
        component: PronosticPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pronostic/:id/delete',
        component: PronosticDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
