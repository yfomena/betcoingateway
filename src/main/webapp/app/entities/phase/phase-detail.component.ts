import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Phase } from './phase.model';
import { PhaseService } from './phase.service';

@Component({
    selector: 'jhi-phase-detail',
    templateUrl: './phase-detail.component.html'
})
export class PhaseDetailComponent implements OnInit, OnDestroy {

    phase: Phase;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private phaseService: PhaseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhases();
    }

    load(id) {
        this.phaseService.find(id)
            .subscribe((phaseResponse: HttpResponse<Phase>) => {
                this.phase = phaseResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhases() {
        this.eventSubscriber = this.eventManager.subscribe(
            'phaseListModification',
            (response) => this.load(this.phase.id)
        );
    }
}
