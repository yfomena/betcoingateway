import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pronostatus } from './pronostatus.model';
import { PronostatusPopupService } from './pronostatus-popup.service';
import { PronostatusService } from './pronostatus.service';

@Component({
    selector: 'jhi-pronostatus-delete-dialog',
    templateUrl: './pronostatus-delete-dialog.component.html'
})
export class PronostatusDeleteDialogComponent {

    pronostatus: Pronostatus;

    constructor(
        private pronostatusService: PronostatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pronostatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pronostatusListModification',
                content: 'Deleted an pronostatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pronostatus-delete-popup',
    template: ''
})
export class PronostatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pronostatusPopupService: PronostatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pronostatusPopupService
                .open(PronostatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
