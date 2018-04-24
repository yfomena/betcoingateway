import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Groupe } from './groupe.model';
import { GroupeService } from './groupe.service';

@Component({
    selector: 'jhi-groupe-detail',
    templateUrl: './groupe-detail.component.html'
})
export class GroupeDetailComponent implements OnInit, OnDestroy {

    groupe: Groupe;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private groupeService: GroupeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGroupes();
    }

    load(id) {
        this.groupeService.find(id)
            .subscribe((groupeResponse: HttpResponse<Groupe>) => {
                this.groupe = groupeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGroupes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'groupeListModification',
            (response) => this.load(this.groupe.id)
        );
    }
}
