import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Phase } from './phase.model';
import { PhasePopupService } from './phase-popup.service';
import { PhaseService } from './phase.service';

@Component({
    selector: 'jhi-phase-delete-dialog',
    templateUrl: './phase-delete-dialog.component.html'
})
export class PhaseDeleteDialogComponent {

    phase: Phase;

    constructor(
        private phaseService: PhaseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.phaseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'phaseListModification',
                content: 'Deleted an phase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-phase-delete-popup',
    template: ''
})
export class PhaseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phasePopupService: PhasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.phasePopupService
                .open(PhaseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
