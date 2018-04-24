import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PronostatusComponent } from './pronostatus.component';
import { PronostatusDetailComponent } from './pronostatus-detail.component';
import { PronostatusPopupComponent } from './pronostatus-dialog.component';
import { PronostatusDeletePopupComponent } from './pronostatus-delete-dialog.component';

@Injectable()
export class PronostatusResolvePagingParams implements Resolve<any> {

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

export const pronostatusRoute: Routes = [
    {
        path: 'pronostatus',
        component: PronostatusComponent,
        resolve: {
            'pagingParams': PronostatusResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostatuses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pronostatus/:id',
        component: PronostatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pronostatusPopupRoute: Routes = [
    {
        path: 'pronostatus-new',
        component: PronostatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pronostatus/:id/edit',
        component: PronostatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pronostatus/:id/delete',
        component: PronostatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronostatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
