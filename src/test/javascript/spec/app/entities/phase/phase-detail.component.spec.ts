/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BetcoingatewayTestModule } from '../../../test.module';
import { PhaseDetailComponent } from '../../../../../../main/webapp/app/entities/phase/phase-detail.component';
import { PhaseService } from '../../../../../../main/webapp/app/entities/phase/phase.service';
import { Phase } from '../../../../../../main/webapp/app/entities/phase/phase.model';

describe('Component Tests', () => {

    describe('Phase Management Detail Component', () => {
        let comp: PhaseDetailComponent;
        let fixture: ComponentFixture<PhaseDetailComponent>;
        let service: PhaseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [PhaseDetailComponent],
                providers: [
                    PhaseService
                ]
            })
            .overrideTemplate(PhaseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhaseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhaseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Phase(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.phase).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
