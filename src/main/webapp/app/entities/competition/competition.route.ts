import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CompetitionComponent } from './competition.component';
import { CompetitionDetailComponent } from './competition-detail.component';
import { CompetitionPopupComponent } from './competition-dialog.component';
import { CompetitionDeletePopupComponent } from './competition-delete-dialog.component';

@Injectable()
export class CompetitionResolvePagingParams implements Resolve<any> {

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

export const competitionRoute: Routes = [
    {
        path: 'competition',
        component: CompetitionComponent,
        resolve: {
            'pagingParams': CompetitionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'competition/:id',
        component: CompetitionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const competitionPopupRoute: Routes = [
    {
        path: 'competition-new',
        component: CompetitionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'competition/:id/edit',
        component: CompetitionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'competition/:id/delete',
        component: CompetitionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
