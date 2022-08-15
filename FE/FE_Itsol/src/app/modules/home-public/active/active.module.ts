import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveComponent } from './active.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

const routes: Routes = [{
  path: '',
  component: ActiveComponent,
  children: [],
}];

@NgModule({
  declarations: [
    ActiveComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
})
export class ActiveModule { }
