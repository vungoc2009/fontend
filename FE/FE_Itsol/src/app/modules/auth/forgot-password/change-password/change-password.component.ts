import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ForgotPasswordService} from '../../../../@core/services/forgot-pass.service';
import {Router} from '@angular/router';


@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  formPass = new FormGroup({
    code: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });
  change = '';
  isSubmitted = false;
  isEnable = true;

  constructor(private forgotPasswordService: ForgotPasswordService,
              private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    setTimeout(() => {
    }, 4200);
    this.formPass = this.fb.group({
      // eslint-disable-next-line max-len
      code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]{6}')]),
      repeatPassword: [''],
      // eslint-disable-next-line max-len
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
    });

  }

  onSubmit() {
    this.isSubmitted = true;
    setTimeout(() => {
      this.isSubmitted = false;
    }, 3000);
    this.isEnable = false;
    const data = {
      code: this.formPass.controls.code.value, email: this.forgotPasswordService.email,
      password: this.formPass.controls.password.value,
    };
    console.log(data);
    this.formPass.reset();
    this.forgotPasswordService.changePassword(data).subscribe(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data => {

        console.log(this.forgotPasswordService.email);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.change = data.change,
          console.log(this.change);
        if (this.change === 'success') {
          alert('Đổi mật khẩu thành công');
          this.router.navigate(['/auth']);
        } else if (this.change === 'exprired') {
          alert('Mã OTP hết thời gian sử dụng');
          this.isEnable = true;
        } else if (this.change === 'fail') {
          alert('Mã OTP sai');
          this.isEnable = true;
        } else {
          alert('Đổi mật khẩu không thành công');
          this.isEnable = true;
        }

      },
    );
  }

}
