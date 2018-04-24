import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pronostic } from './pronostic.model';
import { PronosticPopupService } from './pronostic-popup.service';
import { PronosticService } from './pronostic.service';
import { Gamer, GamerService } from '../gamer';
import { Pronotype, PronotypeService } from '../pronotype';
import { Pronostatus, PronostatusService } from '../pronostatus';

@Component({
    selector: 'jhi-pronostic-dialog',
    templateUrl: './pronostic-dialog.component.html'
})
export class PronosticDialogComponent implements OnInit {

    pronostic: Pronostic;
    isSaving: boolean;

    gamers: Gamer[];

    pronotypes: Pronotype[];

    pronostatuses: Pronostatus[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pronosticService: PronosticService,
        private gamerService: GamerService,
        private pronotypeService: PronotypeService,
        private pronostatusService: PronostatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.gamerService.query()
            .subscribe((res: HttpResponse<Gamer[]>) => { this.gamers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.pronotypeService.query()
            .subscribe((res: HttpResponse<Pronotype[]>) => { this.pronotypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.pronostatusService.query()
            .subscribe((res: HttpResponse<Pronostatus[]>) => { this.pronostatuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pronostic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pronosticService.update(this.pronostic));
        } else {
            this.subscribeToSaveResponse(
                this.pronosticService.create(this.pronostic));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pronostic>>) {
        result.subscribe((res: HttpResponse<Pronostic>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pronostic) {
        this.eventManager.broadcast({ name: 'pronosticListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGamerById(index: number, item: Gamer) {
        return item.id;
    }

    trackPronotypeById(index: number, item: Pronotype) {
        return item.id;
    }

    trackPronostatusById(index: number, item: Pronostatus) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pronostic-popup',
    template: ''
})
export class PronosticPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pronosticPopupService: PronosticPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pronosticPopupService
                    .open(PronosticDialogComponent as Component, params['id']);
            } else {
                this.pronosticPopupService
                    .open(PronosticDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
