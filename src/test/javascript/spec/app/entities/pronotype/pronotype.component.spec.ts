/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BetcoingatewayTestModule } from '../../../test.module';
import { PronotypeComponent } from '../../../../../../main/webapp/app/entities/pronotype/pronotype.component';
import { PronotypeService } from '../../../../../../main/webapp/app/entities/pronotype/pronotype.service';
import { Pronotype } from '../../../../../../main/webapp/app/entities/pronotype/pronotype.model';

describe('Component Tests', () => {

    describe('Pronotype Management Component', () => {
        let comp: PronotypeComponent;
        let fixture: ComponentFixture<PronotypeComponent>;
        let service: PronotypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [PronotypeComponent],
                providers: [
                    PronotypeService
                ]
            })
            .overrideTemplate(PronotypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PronotypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PronotypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Pronotype(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pronotypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
