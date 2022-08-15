import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile/profile.component';
import { ManagerJeComponent } from './managerJe/managerJe.component';
import { SharedModule } from 'primeng/api';
import { PrimengModule } from '../../shared/primeng.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FilerecruitComponent} from './filerecruit/filerecruit.component';
import {JobListComponent} from './job/job-list/job-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {JobInsertComponent} from './job/job-insert/job-insert.component';
import {JobDetailComponent} from './job/job-detail/job-detail.component';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { JobExportPdfComponent } from './job/job-export-pdf/job-export-pdf.component';
import { JobUpdateComponent } from './job/job-detail/job-update/job-update.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditJeComponent} from './managerJe/editJe/editJe.component';
import {ResJeService} from './managerJe/resJe/resJe.service';
import {ResJeComponent} from './managerJe/resJe/resJe.component';
import {PaginatorModule} from 'primeng/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanyComponent} from './company-edit/company.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      component: DashboardComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'job',
      component: JobListComponent,
    },
    {
      path: 'managerJe',
      component: ManagerJeComponent,
    },
    {
      path: 'jobregister',
      component: FilerecruitComponent,
    },
    {
      path: 'job/insert',
      component: JobInsertComponent,
    },

    {
      path: 'job/detail/:id',
      component: JobDetailComponent,
    },

    {
      path: 'job/update/:id',
      component: JobUpdateComponent,
    },
    {
      path: 'company-edit',
      component: CompanyComponent,
    },
  ],
}];

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    JobListComponent,
    ManagerJeComponent,
    FilerecruitComponent,
    JobListComponent,
    JobExportPdfComponent,
    JobUpdateComponent,
    EditJeComponent,
    ResJeComponent,
    CompanyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    MatPaginatorModule,
    NgbToastModule,
    MatDialogModule,
    FormsModule,
    PaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
})
export class HomeModule { }
