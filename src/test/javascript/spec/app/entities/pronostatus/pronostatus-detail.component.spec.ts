/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BetcoingatewayTestModule } from '../../../test.module';
import { PronostatusDetailComponent } from '../../../../../../main/webapp/app/entities/pronostatus/pronostatus-detail.component';
import { PronostatusService } from '../../../../../../main/webapp/app/entities/pronostatus/pronostatus.service';
import { Pronostatus } from '../../../../../../main/webapp/app/entities/pronostatus/pronostatus.model';

describe('Component Tests', () => {

    describe('Pronostatus Management Detail Component', () => {
        let comp: PronostatusDetailComponent;
        let fixture: ComponentFixture<PronostatusDetailComponent>;
        let service: PronostatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [PronostatusDetailComponent],
                providers: [
                    PronostatusService
                ]
            })
            .overrideTemplate(PronostatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PronostatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PronostatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Pronostatus(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pronostatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
