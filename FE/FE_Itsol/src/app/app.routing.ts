import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './@core/guards/auth.guard';
import {PublicModule} from './modules/Public/public.module';
import {RouteGuardService} from './@core/services/route.guard.service';
import {FilerecruitComponent} from './modules/home/filerecruit/filerecruit.component';
import {JobListComponent} from './modules/home/job/job-list/job-list.component';
import {JobInsertComponent} from './modules/home/job/job-insert/job-insert.component';
import {JobDetailComponent} from './modules/home/job/job-detail/job-detail.component';
import {JobExportPdfComponent} from './modules/home/job/job-export-pdf/job-export-pdf.component';
import {PublicJobDetailComponent} from './modules/home-public/public-job-detail/public-job-detail.component';
import {CompanyComponent} from './modules/home/company-edit/company.component';
import {ManagerJeComponent} from './modules/home/managerJe/managerJe.component';
import {RouteJeService} from './@core/services/routeJe.service';

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard ,RouteGuardService],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  // { path: '**',
  //   redirectTo: 'public',
  // },
  {
    path: 'public',
    // canActivate: [AuthGuard ],
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/home-public/regis/regis.module').then(m => m.RegisModule),
  },
  {
    path: 'public/active_account/:id',
    loadChildren: () => import('./modules/home-public/active/active.module').then(m => m.ActiveModule),
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // { path: '**',
  //   redirectTo: 'auth',
  // },
  {
    path: 'signup',
    loadChildren: () => import('./modules/home-public/regis/regis.module').then(m => m.RegisModule),
  },

  // {path: 'job', component: JobListComponent},
  {path: '', redirectTo: 'jobs', pathMatch: 'full'},

  {
    path: 'home/managerJe',
    canActivate: [RouteJeService],
    component: ManagerJeComponent,
  },

  {
    path:'change-password',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./modules/auth/forgot-password/change-password/change-password.module').then(m => m.ChangePasswordModule),
  },
  {
    path: 'public/itsol_recruitment',
    loadChildren: () => import('./modules/home-public/web-home-public/web-home.module').then(m => m.WebhomeModule),
  },
  {
    path: 'public/aboutus',
    loadChildren: () => import('./modules/home-public/about/about.module').then(m => m.AboutModule),
  },
  // {
  //   path: 'public/aboutus',
  //   loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
  // },
  {
    path: 'job',
    component: JobListComponent,
  },
  {
    path: 'job/exportPDF/:id',
    component: JobExportPdfComponent,
  },
  {
    path : 'file-recruit',
    component : FilerecruitComponent,
  },
  {
    path: 'public/searchJob',
    loadChildren: () => import('./modules/home-public/searchjob/searchjob.module').then(m => m.SearchjobModule),
  },
  {
    path: 'company-edit',
    component: CompanyComponent,
  },
  {
    path: 'public/itsol_recruitment/:typeJob',
    loadChildren: () => import('./modules/home-public/see-more-job/see-more-job.module').then(m => m.SeeMoreJobModule),
  },
  {
    path: 'public/itsol_recruitment/job/:id',
    component: PublicJobDetailComponent,
  },
];


const config: ExtraOptions = {
  useHash: false,
};

// @ts-ignore
// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
