import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PhaseComponent } from './phase.component';
import { PhaseDetailComponent } from './phase-detail.component';
import { PhasePopupComponent } from './phase-dialog.component';
import { PhaseDeletePopupComponent } from './phase-delete-dialog.component';

@Injectable()
export class PhaseResolvePagingParams implements Resolve<any> {

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

export const phaseRoute: Routes = [
    {
        path: 'phase',
        component: PhaseComponent,
        resolve: {
            'pagingParams': PhaseResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'phase/:id',
        component: PhaseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phasePopupRoute: Routes = [
    {
        path: 'phase-new',
        component: PhasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phase/:id/edit',
        component: PhasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phase/:id/delete',
        component: PhaseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
