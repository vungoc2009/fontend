import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {MatFormFieldModule} from '@angular/material/form-field';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [],
},
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class AuthModule { }
