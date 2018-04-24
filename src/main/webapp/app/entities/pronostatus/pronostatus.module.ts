import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetcoingatewaySharedModule } from '../../shared';
import {
    PronostatusService,
    PronostatusPopupService,
    PronostatusComponent,
    PronostatusDetailComponent,
    PronostatusDialogComponent,
    PronostatusPopupComponent,
    PronostatusDeletePopupComponent,
    PronostatusDeleteDialogComponent,
    pronostatusRoute,
    pronostatusPopupRoute,
    PronostatusResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pronostatusRoute,
    ...pronostatusPopupRoute,
];

@NgModule({
    imports: [
        BetcoingatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PronostatusComponent,
        PronostatusDetailComponent,
        PronostatusDialogComponent,
        PronostatusDeleteDialogComponent,
        PronostatusPopupComponent,
        PronostatusDeletePopupComponent,
    ],
    entryComponents: [
        PronostatusComponent,
        PronostatusDialogComponent,
        PronostatusPopupComponent,
        PronostatusDeleteDialogComponent,
        PronostatusDeletePopupComponent,
    ],
    providers: [
        PronostatusService,
        PronostatusPopupService,
        PronostatusResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetcoingatewayPronostatusModule {}
