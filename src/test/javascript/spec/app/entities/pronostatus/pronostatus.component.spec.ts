/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BetcoingatewayTestModule } from '../../../test.module';
import { PronostatusComponent } from '../../../../../../main/webapp/app/entities/pronostatus/pronostatus.component';
import { PronostatusService } from '../../../../../../main/webapp/app/entities/pronostatus/pronostatus.service';
import { Pronostatus } from '../../../../../../main/webapp/app/entities/pronostatus/pronostatus.model';

describe('Component Tests', () => {

    describe('Pronostatus Management Component', () => {
        let comp: PronostatusComponent;
        let fixture: ComponentFixture<PronostatusComponent>;
        let service: PronostatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [PronostatusComponent],
                providers: [
                    PronostatusService
                ]
            })
            .overrideTemplate(PronostatusComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PronostatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PronostatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Pronostatus(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pronostatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
