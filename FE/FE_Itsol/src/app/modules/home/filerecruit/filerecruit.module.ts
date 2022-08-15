import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FilerecruitComponent} from './filerecruit.component';
import {MatFormFieldModule} from '@angular/material/form-field';

const routes: Routes = [{
  path: '',
  component: FilerecruitComponent,
  children: [],
},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class FilerecruitModule { }
