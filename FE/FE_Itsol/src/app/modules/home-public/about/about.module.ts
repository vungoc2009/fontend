import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {AboutComponent} from './about.component';

const routes: Routes = [{
  path: '',
  component: AboutComponent,
  children: [],
}];

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule,
  ],
})
export class AboutModule { }
