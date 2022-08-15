import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from 'primeng/api';
import { PrimengModule } from '../../shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import {PublicComponent} from './public.component';

const routes: Routes = [{
  path: '',
  component: PublicComponent,
  children: [
    {
      path: 'home',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },

  ],
}];

@NgModule({
  declarations: [
    PublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
  ],
})
export class PublicModule { }
