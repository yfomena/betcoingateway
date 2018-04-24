import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetcoingatewaySharedModule } from '../../shared';
import {
    GroupeService,
    GroupePopupService,
    GroupeComponent,
    GroupeDetailComponent,
    GroupeDialogComponent,
    GroupePopupComponent,
    GroupeDeletePopupComponent,
    GroupeDeleteDialogComponent,
    groupeRoute,
    groupePopupRoute,
    GroupeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...groupeRoute,
    ...groupePopupRoute,
];

@NgModule({
    imports: [
        BetcoingatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GroupeComponent,
        GroupeDetailComponent,
        GroupeDialogComponent,
        GroupeDeleteDialogComponent,
        GroupePopupComponent,
        GroupeDeletePopupComponent,
    ],
    entryComponents: [
        GroupeComponent,
        GroupeDialogComponent,
        GroupePopupComponent,
        GroupeDeleteDialogComponent,
        GroupeDeletePopupComponent,
    ],
    providers: [
        GroupeService,
        GroupePopupService,
        GroupeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetcoingatewayGroupeModule {}
