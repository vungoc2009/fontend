
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisComponent } from './regis.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

const routes: Routes = [{
  path: '',
  component: RegisComponent,
  children: [],
}];

@NgModule({
  declarations: [
    RegisComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
})
export class RegisModule { }
