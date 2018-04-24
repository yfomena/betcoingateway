import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetcoingatewaySharedModule } from '../../shared';
import {
    GamerService,
    GamerPopupService,
    GamerComponent,
    GamerDetailComponent,
    GamerDialogComponent,
    GamerPopupComponent,
    GamerDeletePopupComponent,
    GamerDeleteDialogComponent,
    gamerRoute,
    gamerPopupRoute,
    GamerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...gamerRoute,
    ...gamerPopupRoute,
];

@NgModule({
    imports: [
        BetcoingatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GamerComponent,
        GamerDetailComponent,
        GamerDialogComponent,
        GamerDeleteDialogComponent,
        GamerPopupComponent,
        GamerDeletePopupComponent,
    ],
    entryComponents: [
        GamerComponent,
        GamerDialogComponent,
        GamerPopupComponent,
        GamerDeleteDialogComponent,
        GamerDeletePopupComponent,
    ],
    providers: [
        GamerService,
        GamerPopupService,
        GamerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetcoingatewayGamerModule {}
