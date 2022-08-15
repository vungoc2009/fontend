import {Component, Inject,  OnInit} from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EditJeService} from './editJe.service';
import {Je} from './editJe.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Toaster} from 'ngx-toast-notifications';
import {formatDate} from "@angular/common";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-editJe',
  templateUrl: './editJe.component.html',
  styleUrls: ['./editJe.component.scss'],
}) export class EditJeComponent implements OnInit{
  currentDate= new Date();
  id: number;
  formUserJe: FormGroup;
  // eslint-disable-next-line max-len
  birthDay: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private editJeService: EditJeService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditJeComponent>,
              private toaster: Toaster,

             ) {}
  ngOnInit(): void {
    this.getByUserId();
    this.initForm();
  }
  initForm() {
    this.formUserJe = this.fb.group({
      userName: new FormControl('',[ Validators.required, Validators.minLength(5),Validators.maxLength(20)]),
      email: new FormControl('',[ Validators.required, Validators.email]) ,
      // eslint-disable-next-line max-len
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      birthDay: new FormControl('',[ Validators.required]) ,
      homeTown: new FormControl('',[ Validators.required]) ,
      gender: new FormControl('',[ Validators.required]) ,
    });
  }

  getByUserId(){
    this.id = this.data.id1;
    this.editJeService.getJe(this.id).subscribe(
      (res)=>{
        this.updateForm(res);
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.formUserJe.controls;
  }
  updateForm(userJe: Je): void{
    this.formUserJe.patchValue({
      userName:userJe.name,
      email:userJe.email,
      phoneNumber:userJe.phoneNumber,
      birthDay:userJe.birthDay,
      homeTown:userJe.homeTown,
      gender: userJe.gender,
    });
  }

  updateUser() {
      const userJe ={
      userName: this.formUserJe.value.userName,
      email: this.formUserJe.value.email,
      phoneNumber: this.formUserJe.value.phoneNumber,
      birthDay: formatDate(this.formUserJe.value.birthDay,'dd-MM-YYYY', 'en'),
      homeTown: this.formUserJe.value.homeTown,
      gender: this.formUserJe.value.gender,
    };
    this.id = this.data.id1;
    console.log(this.id);
    this.editJeService.updateUser(this.id, userJe).subscribe();
    this.showToater('thành công','success');
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
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
    console.log(this.formUserJe.value.gender);
  }
}
