import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Competition } from './competition.model';
import { CompetitionPopupService } from './competition-popup.service';
import { CompetitionService } from './competition.service';
import { Team, TeamService } from '../team';

@Component({
    selector: 'jhi-competition-dialog',
    templateUrl: './competition-dialog.component.html'
})
export class CompetitionDialogComponent implements OnInit {

    competition: Competition;
    isSaving: boolean;

    winners: Team[];

    seconds: Team[];

    thirds: Team[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private competitionService: CompetitionService,
        private teamService: TeamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teamService
            .query({filter: 'competition-is-null'})
            .subscribe((res: HttpResponse<Team[]>) => {
                if (!this.competition.winner || !this.competition.winner.id) {
                    this.winners = res.body;
                } else {
                    this.teamService
                        .find(this.competition.winner.id)
                        .subscribe((subRes: HttpResponse<Team>) => {
                            this.winners = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.teamService
            .query({filter: 'competition-is-null'})
            .subscribe((res: HttpResponse<Team[]>) => {
                if (!this.competition.second || !this.competition.second.id) {
                    this.seconds = res.body;
                } else {
                    this.teamService
                        .find(this.competition.second.id)
                        .subscribe((subRes: HttpResponse<Team>) => {
                            this.seconds = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.teamService
            .query({filter: 'competition-is-null'})
            .subscribe((res: HttpResponse<Team[]>) => {
                if (!this.competition.third || !this.competition.third.id) {
                    this.thirds = res.body;
                } else {
                    this.teamService
                        .find(this.competition.third.id)
                        .subscribe((subRes: HttpResponse<Team>) => {
                            this.thirds = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.competition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.competitionService.update(this.competition));
        } else {
            this.subscribeToSaveResponse(
                this.competitionService.create(this.competition));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Competition>>) {
        result.subscribe((res: HttpResponse<Competition>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Competition) {
        this.eventManager.broadcast({ name: 'competitionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTeamById(index: number, item: Team) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-competition-popup',
    template: ''
})
export class CompetitionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private competitionPopupService: CompetitionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.competitionPopupService
                    .open(CompetitionDialogComponent as Component, params['id']);
            } else {
                this.competitionPopupService
                    .open(CompetitionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
