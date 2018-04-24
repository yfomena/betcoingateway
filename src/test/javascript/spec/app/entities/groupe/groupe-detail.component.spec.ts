/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BetcoingatewayTestModule } from '../../../test.module';
import { GroupeDetailComponent } from '../../../../../../main/webapp/app/entities/groupe/groupe-detail.component';
import { GroupeService } from '../../../../../../main/webapp/app/entities/groupe/groupe.service';
import { Groupe } from '../../../../../../main/webapp/app/entities/groupe/groupe.model';

describe('Component Tests', () => {

    describe('Groupe Management Detail Component', () => {
        let comp: GroupeDetailComponent;
        let fixture: ComponentFixture<GroupeDetailComponent>;
        let service: GroupeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [GroupeDetailComponent],
                providers: [
                    GroupeService
                ]
            })
            .overrideTemplate(GroupeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Groupe(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.groupe).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
