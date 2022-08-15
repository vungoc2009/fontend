import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CompanyService} from '../../../@core/services/company.service';
import {Company} from '../../../@core/models/company';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Toaster } from 'ngx-toast-notifications';
@Component({
  selector: 'ngx-company-edit',
  templateUrl: './company.component.html',
  styleUrls: ['./company.scss'],
})
export class CompanyComponent implements OnInit {
  formUpdate: FormGroup;
  company?: Company;
  id =1;
  dbImage: any;
  [x: string]: any;
  isChange=false;
  fileToUpload: any;
  @ViewChild('labelImport')
  labelImport: ElementRef;
  constructor( private fb: FormBuilder, private companyService: CompanyService,private httpClient: HttpClient,
              private router: Router,private toaster: Toaster) { }

  ngOnInit(): void {
    this.initForm();
    this.getCompany();
    this.getAvatar();
  }
  public initForm() {
    this.formUpdate = this.fb.group({
      id: new FormControl(this.id, [Validators.required]),
      avatar: new FormControl('abc'),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      hotline: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
      date_incoporation: new FormControl('', [Validators.required]),
      tax_code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      tax_date: new FormControl('', [Validators.required]),
      tax_place: new FormControl('', [Validators.required]),
      head_office: new FormControl('', [Validators.required]),
      number_staff: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      link_web: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      backdrop_img: new FormControl('abc', [Validators.required]),
    });
  }
update(){
  this.companyService.updateCompany(this.formUpdate.value).subscribe(
    (data)=>{
      console.log(this.formUpdate.value);
      console.log(data);
      if(data!=null){
        this.showToaster('Cập nhật thành công','success');
      }
    },
  );
  if(this.isChange){
    this.formUpdate.patchValue({
      avatar:this.filea.name,
    });
    if(this.isChange) {
      this.imageUploadAction();
    }
  }
}
getCompany(){
    this.companyService.getCompanyById(this.id).subscribe(
      (data)=> {
        this.company = data;

      },
      (error)=>{
        console.log('error');
      },
    );
}
  getAvatar() {
      this.companyService.viewImage(1).subscribe(data=>{
        this.postResponse = data;
        console.log(data);
        this.dbImage= 'data:image/jpeg;base64,' + this.postResponse.image;
      });

  }
  onSelect(file: File) {
    this.isChange=true;
    this.labelImport.nativeElement.innerText = file[0].name;
    this.fileToUpload = file[0];
    this.filea=file[0];
    console.log(this.file);
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event) => {
      this.dbImage = event.target.result;
      console.log(this.dbImage);
    };

  }
  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.fileToUpload, this.fileToUpload.name);
    console.log(imageFormData);
    this.httpClient
      .put('http://localhost:9090/api/public/upload/image/', imageFormData, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
          this.getByUserName();
          this.profileService.tranferData(this.postResponse.image);
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      });

  }
  showToaster(message: string,typea: any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Thành công',
      type,
      duration: 3000,
    });
  }

}
