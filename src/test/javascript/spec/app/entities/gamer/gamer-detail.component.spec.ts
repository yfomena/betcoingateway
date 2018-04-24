/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BetcoingatewayTestModule } from '../../../test.module';
import { GamerDetailComponent } from '../../../../../../main/webapp/app/entities/gamer/gamer-detail.component';
import { GamerService } from '../../../../../../main/webapp/app/entities/gamer/gamer.service';
import { Gamer } from '../../../../../../main/webapp/app/entities/gamer/gamer.model';

describe('Component Tests', () => {

    describe('Gamer Management Detail Component', () => {
        let comp: GamerDetailComponent;
        let fixture: ComponentFixture<GamerDetailComponent>;
        let service: GamerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [GamerDetailComponent],
                providers: [
                    GamerService
                ]
            })
            .overrideTemplate(GamerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GamerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GamerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Gamer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gamer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
