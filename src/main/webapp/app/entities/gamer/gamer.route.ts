import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GamerComponent } from './gamer.component';
import { GamerDetailComponent } from './gamer-detail.component';
import { GamerPopupComponent } from './gamer-dialog.component';
import { GamerDeletePopupComponent } from './gamer-delete-dialog.component';

@Injectable()
export class GamerResolvePagingParams implements Resolve<any> {

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

export const gamerRoute: Routes = [
    {
        path: 'gamer',
        component: GamerComponent,
        resolve: {
            'pagingParams': GamerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gamers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gamer/:id',
        component: GamerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gamers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gamerPopupRoute: Routes = [
    {
        path: 'gamer-new',
        component: GamerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gamers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gamer/:id/edit',
        component: GamerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gamers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gamer/:id/delete',
        component: GamerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gamers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
