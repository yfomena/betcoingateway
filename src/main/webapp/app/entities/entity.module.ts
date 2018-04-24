import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BetcoingatewayGamerModule } from './gamer/gamer.module';
import { BetcoingatewayTeamModule } from './team/team.module';
import { BetcoingatewayGroupeModule } from './groupe/groupe.module';
import { BetcoingatewayCompetitionModule } from './competition/competition.module';
import { BetcoingatewayPronotypeModule } from './pronotype/pronotype.module';
import { BetcoingatewayPhaseModule } from './phase/phase.module';
import { BetcoingatewayPronostatusModule } from './pronostatus/pronostatus.module';
import { BetcoingatewayGameModule } from './game/game.module';
import { BetcoingatewayPronosticModule } from './pronostic/pronostic.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BetcoingatewayGamerModule,
        BetcoingatewayTeamModule,
        BetcoingatewayGroupeModule,
        BetcoingatewayCompetitionModule,
        BetcoingatewayPronotypeModule,
        BetcoingatewayPhaseModule,
        BetcoingatewayPronostatusModule,
        BetcoingatewayGameModule,
        BetcoingatewayPronosticModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BetcoingatewayEntityModule {}
