import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Pronotype } from './pronotype.model';
import { PronotypeService } from './pronotype.service';

@Injectable()
export class PronotypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pronotypeService: PronotypeService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.pronotypeService.find(id)
                    .subscribe((pronotypeResponse: HttpResponse<Pronotype>) => {
                        const pronotype: Pronotype = pronotypeResponse.body;
                        pronotype.expirationDate = this.datePipe
                            .transform(pronotype.expirationDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.pronotypeModalRef(component, pronotype);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pronotypeModalRef(component, new Pronotype());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pronotypeModalRef(component: Component, pronotype: Pronotype): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pronotype = pronotype;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
