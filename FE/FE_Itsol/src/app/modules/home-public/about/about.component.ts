import { Component, OnInit } from '@angular/core';
import {AboutService} from '../../../@core/services/about.service';
import {Company} from '../../../@core/models/company';
import {CompanyService} from '../../../@core/services/company.service';

@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  [x: string]: any;
  dbImage: any;
  constructor(private aboutService: AboutService,private companyService: CompanyService) { }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  company: Company;
  ngOnInit(): void {
    this.companyService.getCompanyById(1).subscribe(data => {
      this.company = data;
      console.log(this.company);
    });
    this.getAvatar();
  }
  getAvatar() {
    this.companyService.viewImage(1).subscribe(data=>{
      this.postResponse = data;
      console.log(data);
      this.dbImage= 'data:image/jpeg;base64,' + this.postResponse.image;
    });

  }

}
