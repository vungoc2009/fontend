import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisService } from '../../../@core/services/regis.service';
import { TokenService } from '../../../@core/services/token.service';
import {User} from '../../../@core/models/user';
import {ActivatedRoute} from '@angular/router';
import {ActiveService} from '../../../@core/services/active.service';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'ngx-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  user: User;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FormRegis: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;
  error = null;
  id: number;

  constructor(private fb: FormBuilder,
              private regisService: RegisService,
              private tokenService: TokenService,
              private router: Router,
              private at: ActivatedRoute,
              private activeService: ActiveService,
  ) {
  }

  ngOnInit(): void {
    this.id = this.at.snapshot.params['id'];
  }

  active() {
    this.activeService.updateActive(this.id).toPromise()
      .then(data => {

      console.log(data);
      alert('active tài khoản thành công, bấm OK để đăng nhập');
      this.router.navigate(['/auth/']);
    })
      .catch(error => {
          this.error = error.status;
        },
      );
  }
}

