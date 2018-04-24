import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pronotype } from './pronotype.model';
import { PronotypePopupService } from './pronotype-popup.service';
import { PronotypeService } from './pronotype.service';

@Component({
    selector: 'jhi-pronotype-delete-dialog',
    templateUrl: './pronotype-delete-dialog.component.html'
})
export class PronotypeDeleteDialogComponent {

    pronotype: Pronotype;

    constructor(
        private pronotypeService: PronotypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pronotypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pronotypeListModification',
                content: 'Deleted an pronotype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pronotype-delete-popup',
    template: ''
})
export class PronotypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pronotypePopupService: PronotypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pronotypePopupService
                .open(PronotypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
