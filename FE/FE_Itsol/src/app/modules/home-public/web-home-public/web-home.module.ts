import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {WebHomeComponent} from './web-home.component';
import {CardModule} from 'primeng/card';
import {MatSelectModule} from "@angular/material/select";

const routes: Routes = [{
  path: '',
  component: WebHomeComponent,
  children: [],
}];

@NgModule({
  declarations: [
    WebHomeComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule,
        CardModule,
        MatSelectModule,
    ],
})
export class WebhomeModule { }
