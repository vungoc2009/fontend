import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisService } from '../../../@core/services/regis.service';
import { TokenService } from '../../../@core/services/token.service';
import {User} from '../../../@core/models/user';

@Component({
  selector: 'ngx-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.scss'],
})
export class RegisComponent implements OnInit {
  user: User;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FormRegis: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;
  error = null;

  constructor(private fb: FormBuilder,
              private regisService: RegisService,
              private tokenService: TokenService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }

  }

  initForm() {
    this.FormRegis = this.fb.group({
      fullname: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      email: new FormControl( '', [Validators.required,Validators.email]),
      phonenum: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.FormRegis.controls;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering

  onSubmit() {
    this.isSubmitted = true;
    setTimeout(() => {
      this.isSubmitted = false;
    }, 3400);
    this.user = new User(
      this.FormRegis.value.fullname,
      this.FormRegis.value.email,
      this.FormRegis.value.phonenum,
      this.FormRegis.value.username,
      this.FormRegis.value.password,
    );
    if (this.FormRegis.valid) {
      this.error = null;
      console.log('ok');
      // show html truoc khi gui sang service
      this.regisService.regis(this.user)
        .then (data => {
            console.log(data);
            alert('đăng kí tài khoản thành công, mời vào email để active tài khoản');
            this.router.navigate(['/auth/']);
          })
        .catch(error => {
          this.error = error.status;
          },
    );
    }
  }

}
