import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetcoingatewaySharedModule } from '../../shared';
import {
    PronosticService,
    PronosticPopupService,
    PronosticComponent,
    PronosticDetailComponent,
    PronosticDialogComponent,
    PronosticPopupComponent,
    PronosticDeletePopupComponent,
    PronosticDeleteDialogComponent,
    pronosticRoute,
    pronosticPopupRoute,
    PronosticResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pronosticRoute,
    ...pronosticPopupRoute,
];

@NgModule({
    imports: [
        BetcoingatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PronosticComponent,
        PronosticDetailComponent,
        PronosticDialogComponent,
        PronosticDeleteDialogComponent,
        PronosticPopupComponent,
        PronosticDeletePopupComponent,
    ],
    entryComponents: [
        PronosticComponent,
        PronosticDialogComponent,
        PronosticPopupComponent,
        PronosticDeleteDialogComponent,
        PronosticDeletePopupComponent,
    ],
    providers: [
        PronosticService,
        PronosticPopupService,
        PronosticResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetcoingatewayPronosticModule {}
