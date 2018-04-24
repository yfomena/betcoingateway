import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Pronostatus } from './pronostatus.model';
import { PronostatusService } from './pronostatus.service';

@Component({
    selector: 'jhi-pronostatus-detail',
    templateUrl: './pronostatus-detail.component.html'
})
export class PronostatusDetailComponent implements OnInit, OnDestroy {

    pronostatus: Pronostatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pronostatusService: PronostatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPronostatuses();
    }

    load(id) {
        this.pronostatusService.find(id)
            .subscribe((pronostatusResponse: HttpResponse<Pronostatus>) => {
                this.pronostatus = pronostatusResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPronostatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pronostatusListModification',
            (response) => this.load(this.pronostatus.id)
        );
    }
}
