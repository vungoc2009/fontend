import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ForgotPasswordService} from '../../../@core/services/forgot-pass.service';
import {Router} from '@angular/router';


@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isSubmitted = false;
  message = '';
  formEmail = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(private forgotPasswordService: ForgotPasswordService, private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    });
  }

  onKeyup() {
    this.message = '';
  }

  onSubmit() {
    this.isSubmitted = true;
    setTimeout(() => {
      this.isSubmitted = false;
    }, 4000);
    if (this.formEmail.valid) {
      const email = this.formEmail.controls.email.value;
      this.forgotPasswordService.tranferMail(email);
      this.forgotPasswordService.sendOTP(email).subscribe(
        data => {
          this.message = data.message;
          console.log(this.message);
          if (this.message === 'success') {
            this.router.navigate(['/change-password/']);
            alert('Đã gửi mã OTP thành công vui lòng vào xem email ');
          }
        },
      );
    }

  }
}
