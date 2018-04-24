import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GroupeComponent } from './groupe.component';
import { GroupeDetailComponent } from './groupe-detail.component';
import { GroupePopupComponent } from './groupe-dialog.component';
import { GroupeDeletePopupComponent } from './groupe-delete-dialog.component';

@Injectable()
export class GroupeResolvePagingParams implements Resolve<any> {

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

export const groupeRoute: Routes = [
    {
        path: 'groupe',
        component: GroupeComponent,
        resolve: {
            'pagingParams': GroupeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groupes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'groupe/:id',
        component: GroupeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groupes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groupePopupRoute: Routes = [
    {
        path: 'groupe-new',
        component: GroupePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groupes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'groupe/:id/edit',
        component: GroupePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groupes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'groupe/:id/delete',
        component: GroupeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groupes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
