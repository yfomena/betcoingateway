import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pronotype } from './pronotype.model';
import { PronotypePopupService } from './pronotype-popup.service';
import { PronotypeService } from './pronotype.service';

@Component({
    selector: 'jhi-pronotype-dialog',
    templateUrl: './pronotype-dialog.component.html'
})
export class PronotypeDialogComponent implements OnInit {

    pronotype: Pronotype;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private pronotypeService: PronotypeService,
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
        if (this.pronotype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pronotypeService.update(this.pronotype));
        } else {
            this.subscribeToSaveResponse(
                this.pronotypeService.create(this.pronotype));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pronotype>>) {
        result.subscribe((res: HttpResponse<Pronotype>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pronotype) {
        this.eventManager.broadcast({ name: 'pronotypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-pronotype-popup',
    template: ''
})
export class PronotypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pronotypePopupService: PronotypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pronotypePopupService
                    .open(PronotypeDialogComponent as Component, params['id']);
            } else {
                this.pronotypePopupService
                    .open(PronotypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
