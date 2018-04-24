import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PronotypeComponent } from './pronotype.component';
import { PronotypeDetailComponent } from './pronotype-detail.component';
import { PronotypePopupComponent } from './pronotype-dialog.component';
import { PronotypeDeletePopupComponent } from './pronotype-delete-dialog.component';

@Injectable()
export class PronotypeResolvePagingParams implements Resolve<any> {

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

export const pronotypeRoute: Routes = [
    {
        path: 'pronotype',
        component: PronotypeComponent,
        resolve: {
            'pagingParams': PronotypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronotypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pronotype/:id',
        component: PronotypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronotypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pronotypePopupRoute: Routes = [
    {
        path: 'pronotype-new',
        component: PronotypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronotypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pronotype/:id/edit',
        component: PronotypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronotypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pronotype/:id/delete',
        component: PronotypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pronotypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
