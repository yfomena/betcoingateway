import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetcoingatewaySharedModule } from '../../shared';
import {
    CompetitionService,
    CompetitionPopupService,
    CompetitionComponent,
    CompetitionDetailComponent,
    CompetitionDialogComponent,
    CompetitionPopupComponent,
    CompetitionDeletePopupComponent,
    CompetitionDeleteDialogComponent,
    competitionRoute,
    competitionPopupRoute,
    CompetitionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...competitionRoute,
    ...competitionPopupRoute,
];

@NgModule({
    imports: [
        BetcoingatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CompetitionComponent,
        CompetitionDetailComponent,
        CompetitionDialogComponent,
        CompetitionDeleteDialogComponent,
        CompetitionPopupComponent,
        CompetitionDeletePopupComponent,
    ],
    entryComponents: [
        CompetitionComponent,
        CompetitionDialogComponent,
        CompetitionPopupComponent,
        CompetitionDeleteDialogComponent,
        CompetitionDeletePopupComponent,
    ],
    providers: [
        CompetitionService,
        CompetitionPopupService,
        CompetitionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetcoingatewayCompetitionModule {}
