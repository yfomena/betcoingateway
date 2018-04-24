import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Pronotype } from './pronotype.model';
import { PronotypeService } from './pronotype.service';

@Component({
    selector: 'jhi-pronotype-detail',
    templateUrl: './pronotype-detail.component.html'
})
export class PronotypeDetailComponent implements OnInit, OnDestroy {

    pronotype: Pronotype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pronotypeService: PronotypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPronotypes();
    }

    load(id) {
        this.pronotypeService.find(id)
            .subscribe((pronotypeResponse: HttpResponse<Pronotype>) => {
                this.pronotype = pronotypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPronotypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pronotypeListModification',
            (response) => this.load(this.pronotype.id)
        );
    }
}
