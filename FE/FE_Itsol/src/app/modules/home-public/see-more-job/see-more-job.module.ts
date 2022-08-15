import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SeeMoreJobComponent} from "./see-more-job.component";

const routes: Routes = [{
  path: '',
  component: SeeMoreJobComponent,
  children: [],
}];

@NgModule({
  declarations: [
    SeeMoreJobComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SeeMoreJobModule { }
