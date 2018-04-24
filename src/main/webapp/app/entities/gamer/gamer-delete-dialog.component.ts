import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gamer } from './gamer.model';
import { GamerPopupService } from './gamer-popup.service';
import { GamerService } from './gamer.service';

@Component({
    selector: 'jhi-gamer-delete-dialog',
    templateUrl: './gamer-delete-dialog.component.html'
})
export class GamerDeleteDialogComponent {

    gamer: Gamer;

    constructor(
        private gamerService: GamerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gamerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gamerListModification',
                content: 'Deleted an gamer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gamer-delete-popup',
    template: ''
})
export class GamerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gamerPopupService: GamerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gamerPopupService
                .open(GamerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
