import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetcoingatewaySharedModule } from '../../shared';
import {
    PronotypeService,
    PronotypePopupService,
    PronotypeComponent,
    PronotypeDetailComponent,
    PronotypeDialogComponent,
    PronotypePopupComponent,
    PronotypeDeletePopupComponent,
    PronotypeDeleteDialogComponent,
    pronotypeRoute,
    pronotypePopupRoute,
    PronotypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pronotypeRoute,
    ...pronotypePopupRoute,
];

@NgModule({
    imports: [
        BetcoingatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PronotypeComponent,
        PronotypeDetailComponent,
        PronotypeDialogComponent,
        PronotypeDeleteDialogComponent,
        PronotypePopupComponent,
        PronotypeDeletePopupComponent,
    ],
    entryComponents: [
        PronotypeComponent,
        PronotypeDialogComponent,
        PronotypePopupComponent,
        PronotypeDeleteDialogComponent,
        PronotypeDeletePopupComponent,
    ],
    providers: [
        PronotypeService,
        PronotypePopupService,
        PronotypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetcoingatewayPronotypeModule {}
