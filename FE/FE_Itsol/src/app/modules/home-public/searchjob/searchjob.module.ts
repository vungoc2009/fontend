import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchjobComponent } from './searchjob.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

const routes: Routes = [{
  path: '',
  component: SearchjobComponent,
  children: [],
}];

@NgModule({
  declarations: [
    SearchjobComponent,
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
export class SearchjobModule { }
