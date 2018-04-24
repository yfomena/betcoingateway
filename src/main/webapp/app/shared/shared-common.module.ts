import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    BetcoingatewaySharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        BetcoingatewaySharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        BetcoingatewaySharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class BetcoingatewaySharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
