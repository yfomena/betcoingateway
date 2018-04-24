import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Gamer } from './gamer.model';
import { GamerService } from './gamer.service';

@Component({
    selector: 'jhi-gamer-detail',
    templateUrl: './gamer-detail.component.html'
})
export class GamerDetailComponent implements OnInit, OnDestroy {

    gamer: Gamer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gamerService: GamerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGamers();
    }

    load(id) {
        this.gamerService.find(id)
            .subscribe((gamerResponse: HttpResponse<Gamer>) => {
                this.gamer = gamerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGamers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gamerListModification',
            (response) => this.load(this.gamer.id)
        );
    }
}
