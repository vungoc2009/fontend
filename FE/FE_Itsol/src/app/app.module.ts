/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app.routing';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {TokenInterceptor} from './@core/services/interceptor.service';
import {RouteGuardService} from './@core/services/route.guard.service';
import {FilerecruitComponent} from './modules/home/filerecruit/filerecruit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider';
import { JobListComponent } from './modules/home/job/job-list/job-list.component';
import { JobInsertComponent } from './modules/home/job/job-insert/job-insert.component';
import {JobDetailComponent} from './modules/home/job/job-detail/job-detail.component';
// @ts-ignore
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PublicJobDetailComponent } from './modules/home-public/public-job-detail/public-job-detail.component';

const configToast: any = {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  progressBar: true,
  progressAnimation: 'increasing',
};


@NgModule({
  declarations: [AppComponent, JobInsertComponent, JobDetailComponent, PublicJobDetailComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        ToastrModule.forRoot(configToast),
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastNotificationsModule,
        NgbModule,
    ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }, RouteGuardService,
  ],
})
export class AppModule {

}
