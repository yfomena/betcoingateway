import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Phase } from './phase.model';
import { PhasePopupService } from './phase-popup.service';
import { PhaseService } from './phase.service';

@Component({
    selector: 'jhi-phase-dialog',
    templateUrl: './phase-dialog.component.html'
})
export class PhaseDialogComponent implements OnInit {

    phase: Phase;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private phaseService: PhaseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.phase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.phaseService.update(this.phase));
        } else {
            this.subscribeToSaveResponse(
                this.phaseService.create(this.phase));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Phase>>) {
        result.subscribe((res: HttpResponse<Phase>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Phase) {
        this.eventManager.broadcast({ name: 'phaseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-phase-popup',
    template: ''
})
export class PhasePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phasePopupService: PhasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.phasePopupService
                    .open(PhaseDialogComponent as Component, params['id']);
            } else {
                this.phasePopupService
                    .open(PhaseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
