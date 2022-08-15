import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {WebHomeService} from '../../../@core/services/web-home.service';
import {Job} from '../../../@core/models/job';
import {SearchjobService} from '../../../@core/services/searchjob.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-webhome',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.css'],
})

export class WebHomeComponent implements OnInit {
  skills = ['Tất cả','PHP','Python','Java'];
  salarys = ['Tất cả','dưới 10m','10m-20m','20m-25m','25-30m','trên 30m'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  working_forms = ['Tất cả','FullTime','PartTime','Intern','Remote'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  number_experiences = ['Tất cả','1 năm','2 năm','3 năm'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  academic_levels = ['Tất cả','Đại học', 'Cao đẳng','Trung cấp'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  address_works = ['Tất cả','Hà Nội','Đà Nẵng','TP Hồ Chí Minh'];
  select_address_work = 'Tất cả';

  select_academic_level = 'Tất cả';

  select_number_experience = 'Tất cả';

  select_working_form = 'Tất cả';

  select_salary = 'Tất cả';

  select_skill = 'Tất cả';
  jobs: Job[];
  searchValue: any = {};
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FormSearch!: FormGroup;
  // eslint-disable-next-line max-len
  newJob: Job[];
  urgentJob: Job[];
  highPJob: Job[];
  constructor(private router: Router,private webHomeService: WebHomeService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
  this.initForm();
  }
  initForm() {
    this.FormSearch = this.formBuilder.group({
      skills: new FormControl(),
      salary: new FormControl(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      address_work: new FormControl(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      academic_level: new FormControl(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      number_experience: new FormControl(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      working_form: new FormControl(),
    });
    this.webHomeService.getAllJob(1).subscribe(
      (data)=>{
        console.log(data);
          this.newJob = data['newJob'];
          this.urgentJob  = data['urgentJob'];
          this.highPJob = data['highPJob'];
      },
    (error) => {

    },
    );
  }

  gotoPublicJobDetail(idJob: number) {
    this.router.navigate(['public/itsol_recruitment/job', idJob]);
  }

  seach(){
    console.log(this.FormSearch.value);
    this.searchValue = Object.assign(this.searchValue,this.FormSearch.value);
    localStorage.setItem('searchValue',JSON.stringify(this.searchValue));
    this.router.navigate(['/public/searchJob/']);
  }
}
