import { Component, OnInit } from '@angular/core';
import {Job} from '../../../@core/models/job';
import {SearchjobService} from '../../../@core/services/searchjob.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {WebHomeService} from '../../../@core/services/web-home.service';


@Component({
  selector: 'ngx-searchjob',
  templateUrl: './searchjob.component.html',
  styleUrls: ['./searchjob.component.scss'],
})

export class SearchjobComponent implements OnInit {
  error= null;
  searchValue: any = {};
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SearchU: any = {};
  jobs: Job[];
  pages: number[];
  skills = ['Tất cả','PHP','Python','Java'];
  salarys = ['Tất cả','dưới 10m','10m-20m','20m-25m','25m-30m','trên 30m'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  working_forms = ['Tất cả','FullTime','PartTime','Intern','Remote'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  number_experiences = ['Tất cả','1 năm','2 năm','3 năm'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  academic_levels = ['Tất cả','Đại học', 'Cao đẳng','Trung cấp'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  address_works = ['Tất cả','Hà Nội','Đà Nẵng','TP Hồ Chí Minh'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  select_address_work: string = JSON.parse(localStorage.getItem('searchValue')).address_work;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  select_academic_level: string = JSON.parse(localStorage.getItem('searchValue')).academic_level;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  select_number_experience: string = JSON.parse(localStorage.getItem('searchValue')).number_experience;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  select_working_form: string = JSON.parse(localStorage.getItem('searchValue')).working_form;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  select_salary: string =JSON.parse(localStorage.getItem('searchValue')).salary;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  select_skill: string = JSON.parse(localStorage.getItem('searchValue')).skills;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FormSearch!: FormGroup;
  // eslint-disable-next-line max-len
  constructor(private router: Router,private fb: FormBuilder,private webHomeService: WebHomeService,private searchJobService: SearchjobService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.error = null;
    this.initForm();

    this.SearchU = JSON.parse(localStorage.getItem('searchValue'));
    // console.log(this.SearchU);
    this.searchJobService.searchJob(this.SearchU,1).subscribe(
      (res) => {
        console.log(res);
        this.jobs = res['jobList'];

        this.pages = res['pageNumberList'];
      },
      (err) => {
        this.error = err.status;
        this.jobs = null;
        this.pages = null;
      },
    );
  }
  initForm(){
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
  }
  search(){
    this.searchValue = Object.assign(this.searchValue,this.FormSearch.value);
    localStorage.setItem('searchValue',JSON.stringify(this.searchValue));
    this.SearchU = JSON.parse(localStorage.getItem('searchValue'));
    console.log(this.SearchU);
    this.searchJobService.searchJob(this.SearchU,1).subscribe(
      (res) => {
        console.log(res);
        this.jobs = res['jobList'];
        console.log(this.jobs);
        this.pages = res['pageNumberList'];
      },
      (err) => {
        this.error = err.status;
        this.jobs = null;
        this.pages = null;
      },

    );

  }
  setpage(i: number){
    this.searchJobService.searchJob(this.SearchU,i).subscribe(
      (res) => {
        console.log(res);
        this.jobs = res['jobList'];
        console.log(this.jobs);
        this.pages = res['pageNumberList'];
      },
      (err) => {
        console.log('error while fetching data.');
      },
    );
  }
}
