import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { TokenService } from '../../@core/services/token.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
hide: boolean;
  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;
  private message: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }
  }

  initForm() {
      this.formLogin = this.fb.group({
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
        password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$')]),
      });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.formLogin.controls;
  }


  onSubmit() {

    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          console.log(data);
          this.isLoggedIn = true;
          // save token sisson
          this.tokenService.saveToken(data.token);
          this.tokenService.saveUser(jwt_decode(data.token));
          // save user localstorage
          const user = JSON.stringify(jwt_decode(data.token));
          localStorage.setItem('user', user);
          // router
          if(localStorage.getItem('user')!=null){
            const userinfo = JSON.parse(localStorage.getItem('user'));
            // lấy ra auth để router
            const role = userinfo.auth;
            console.log(role);
            if(role === 'ROLE_ADMIN' || role === 'ROLE_JE'){
              console.log('aaa');
              this.router.navigate(['/home']);
            } else if(role === 'ROLE_USER'){
              this.router.navigate(['/public/']);
            }
          }
        },
        (error) => {
          console.log(error);

          if (error.status === '400') {
            this.message = 'Tài khoản hoặc mật khẩu sai.';
          }
          if (error.status === '401') {
            this.message = 'Tài khoản hoặc mật khẩu sai.';
          }
        },
      );
    }
  }
}
