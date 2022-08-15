import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../../@core/services/session.service';
import { User } from './profile.model';
import { ProfileService } from './profile.service';
import {Toaster} from 'ngx-toast-notifications';
import {formatDate} from '@angular/common';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  name: string;
  user: User;
  username: string;
  id: number;
  res: any;
  currentDate= new Date();
  birthday: string;
  file: File;
  @ViewChild("labelImport")
  labelImport: ElementRef;
  isChange=false;
  fileUpLoad: any;
  filea: File;
  dbImage: any;
  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private toaster: Toaster) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getByUserName();
    this.initForm();
  }
  initForm(){
    this.formProfile = this.fb.group({
      avatar: [' '],
      fullName: new FormControl('',[ Validators.required, Validators.minLength(5),Validators.maxLength(20)]),
      email:  new FormControl('',[ Validators.required, Validators.email]) ,
      // eslint-disable-next-line max-len
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      birthDay:new FormControl('',[ Validators.required]) ,
      homeTown: new FormControl('',[ Validators.required]) ,
      gender: new FormControl('',[ Validators.required]) ,
    });
  }

  getByUserName(){
    this.username=this.sessionService.getItem('auth-user');
    console.log(this.username.sub);
    this.profileService.getProfile(this.username.sub).subscribe(
      (res)=>{
        console.log(res.id);
        this.updateForm(res);
        this.res = res;
        this.id = res.id;
        // this.profileService.viewImage(this.user.avatarName).subscribe(data => {
        //   this.postResponse = data;
        //   this.dbImage= 'data:image/jpeg;base64,' + this.postResponse.image;
        //   this.profileService.tranferData(this.postResponse.image);
        // });
      },
    );
  }

  // selectImage(file: File){
  //   this.isChange = true;
  //   this.labelImport.nativeElement.innerText = file[0].name;
  //   this.fileUpLoad = file[0];
  //   this.filea = file[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file[0]);
  //   reader.onload = (event) => {
  //     this.dbImage = event.target.result;
  //   };
  // }

  updateUser() {
    const user = {
      userName: this.formProfile.value.fullName,
      // avatarName: this.formProfile.value.avatar,
      email: this.formProfile.value.email,
      phoneNumber: this.formProfile.value.phoneNumber,
      birthDay: formatDate(this.formProfile.value.birthDay,'dd-MM-YYYY', 'en'),
      homeTown: this.formProfile.value.homeTown,
      gender: this.formProfile.value.gender,
    };
    console.log(user);
    this.profileService.updateUser(this.id, user).subscribe();
    this.showToater('thành công', 'success');
  }



  updateForm(user: User): void {
    this.formProfile.patchValue({
      fullName:user.userName,
      avatarName: user.avatarName,
      email:user.email,
      phoneNumber:user.phoneNumber,
      birthDay:user.birthDay,
      homeTown:user.homeTown,
      gender: user.gender,
    });
  }

  showToater(message: string, typea: any){
    const type = typea;
    this.toaster.open({
      text:message,
      caption: 'thành công',
      type,
      duration:3000,
    });
  }
  changeGender(event: any){
    const a = document.querySelector('.select');
    console.log(this.formProfile.value.gender);
  }

  // imageUploadAction() {
  //   const imageFormData = new FormData();
  //   imageFormData.append('image', this.fileToUpload, this.fileToUpload.name);
  //   console.log(imageFormData);
  //   this.httpClient
  //     .post('http://localhost:9090/api/auth/upload/image/', imageFormData, {
  //       observe: 'response',
  //     })
  //     .subscribe((response) => {
  //       if (response.status === 200) {
  //         this.postResponse = response;
  //         this.successResponse = this.postResponse.body.message;
  //         this.getByUserName();
  //         this.profileService.tranferData(this.postResponse.image);
  //       } else {
  //         this.successResponse = 'Image not uploaded due to some error!';
  //       }
  //     });
  //
  // }
  // onSubmit(){
  //   if(this.isChange){
  //     this.formProfile.patchValue({
  //       avatarName:this.filea.name,
  //     });
  //   }
  //   // const date=new Date(this.formProfile.controls.birthDay.value);
  //   // this.formProfile.patchValue({
  //   //   birthDay:date,
  //   // });
  //   console.log(this.formProfile.value);
  //   this.profileService.updateUser(this.id,this.user).subscribe(data=>{
  //     if(data!=null){
  //       this.showToaster('Cập nhật thành công','success');
  //       this.updateUser();
  //     }
  //   });
  //   if(this.isChange) {
  //     this.imageUploadAction();
  //   }
  //
  // }
}
