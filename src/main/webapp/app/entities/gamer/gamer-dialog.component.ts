import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gamer } from './gamer.model';
import { GamerPopupService } from './gamer-popup.service';
import { GamerService } from './gamer.service';

@Component({
    selector: 'jhi-gamer-dialog',
    templateUrl: './gamer-dialog.component.html'
})
export class GamerDialogComponent implements OnInit {

    gamer: Gamer;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private gamerService: GamerService,
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
        if (this.gamer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gamerService.update(this.gamer));
        } else {
            this.subscribeToSaveResponse(
                this.gamerService.create(this.gamer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Gamer>>) {
        result.subscribe((res: HttpResponse<Gamer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Gamer) {
        this.eventManager.broadcast({ name: 'gamerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-gamer-popup',
    template: ''
})
export class GamerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gamerPopupService: GamerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gamerPopupService
                    .open(GamerDialogComponent as Component, params['id']);
            } else {
                this.gamerPopupService
                    .open(GamerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
