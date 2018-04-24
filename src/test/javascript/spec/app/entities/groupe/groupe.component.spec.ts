/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BetcoingatewayTestModule } from '../../../test.module';
import { GroupeComponent } from '../../../../../../main/webapp/app/entities/groupe/groupe.component';
import { GroupeService } from '../../../../../../main/webapp/app/entities/groupe/groupe.service';
import { Groupe } from '../../../../../../main/webapp/app/entities/groupe/groupe.model';

describe('Component Tests', () => {

    describe('Groupe Management Component', () => {
        let comp: GroupeComponent;
        let fixture: ComponentFixture<GroupeComponent>;
        let service: GroupeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BetcoingatewayTestModule],
                declarations: [GroupeComponent],
                providers: [
                    GroupeService
                ]
            })
            .overrideTemplate(GroupeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Groupe(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.groupes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
