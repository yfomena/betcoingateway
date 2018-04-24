import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pronostatus } from './pronostatus.model';
import { PronostatusPopupService } from './pronostatus-popup.service';
import { PronostatusService } from './pronostatus.service';

@Component({
    selector: 'jhi-pronostatus-dialog',
    templateUrl: './pronostatus-dialog.component.html'
})
export class PronostatusDialogComponent implements OnInit {

    pronostatus: Pronostatus;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private pronostatusService: PronostatusService,
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
        if (this.pronostatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pronostatusService.update(this.pronostatus));
        } else {
            this.subscribeToSaveResponse(
                this.pronostatusService.create(this.pronostatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pronostatus>>) {
        result.subscribe((res: HttpResponse<Pronostatus>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pronostatus) {
        this.eventManager.broadcast({ name: 'pronostatusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-pronostatus-popup',
    template: ''
})
export class PronostatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pronostatusPopupService: PronostatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pronostatusPopupService
                    .open(PronostatusDialogComponent as Component, params['id']);
            } else {
                this.pronostatusPopupService
                    .open(PronostatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
