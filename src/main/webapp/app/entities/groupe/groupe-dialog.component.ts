import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Groupe } from './groupe.model';
import { GroupePopupService } from './groupe-popup.service';
import { GroupeService } from './groupe.service';
import { Team, TeamService } from '../team';

@Component({
    selector: 'jhi-groupe-dialog',
    templateUrl: './groupe-dialog.component.html'
})
export class GroupeDialogComponent implements OnInit {

    groupe: Groupe;
    isSaving: boolean;

    winners: Team[];

    seconds: Team[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private groupeService: GroupeService,
        private teamService: TeamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teamService
            .query({filter: 'groupe-is-null'})
            .subscribe((res: HttpResponse<Team[]>) => {
                if (!this.groupe.winner || !this.groupe.winner.id) {
                    this.winners = res.body;
                } else {
                    this.teamService
                        .find(this.groupe.winner.id)
                        .subscribe((subRes: HttpResponse<Team>) => {
                            this.winners = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.teamService
            .query({filter: 'groupe-is-null'})
            .subscribe((res: HttpResponse<Team[]>) => {
                if (!this.groupe.second || !this.groupe.second.id) {
                    this.seconds = res.body;
                } else {
                    this.teamService
                        .find(this.groupe.second.id)
                        .subscribe((subRes: HttpResponse<Team>) => {
                            this.seconds = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.groupe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.groupeService.update(this.groupe));
        } else {
            this.subscribeToSaveResponse(
                this.groupeService.create(this.groupe));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Groupe>>) {
        result.subscribe((res: HttpResponse<Groupe>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Groupe) {
        this.eventManager.broadcast({ name: 'groupeListModification', content: 'OK'});
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
    selector: 'jhi-groupe-popup',
    template: ''
})
export class GroupePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupePopupService: GroupePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.groupePopupService
                    .open(GroupeDialogComponent as Component, params['id']);
            } else {
                this.groupePopupService
                    .open(GroupeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
