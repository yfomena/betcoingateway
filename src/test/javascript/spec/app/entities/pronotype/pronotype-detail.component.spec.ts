/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BetcoingatewayTestModule } from '../../../test.module';
import { PronotypeDetailComponent } from '../../../../../../main/webapp/app/entities/pronotype/pronotype-detail.component';
import { PronotypeService } from '../../../../../../main/webapp/app/entities/pronotype/pronotype.service';
import { Pronotype } from '../../../../../../main/webapp/app/entities/pronotype/pronotype.model';

describe('Component Tests', () => {

    describe('Pronotype Management Detail Component', () => {
        let comp: PronotypeDetailComponent;
        let fixture: ComponentFixture<PronotypeDetailComponent>;
        let service: PronotypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [PronotypeDetailComponent],
                providers: [
                    PronotypeService
                ]
            })
            .overrideTemplate(PronotypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PronotypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PronotypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Pronotype(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pronotype).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
