import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RegisService} from '../../../@core/services/regis.service';
import {TokenService} from '../../../@core/services/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActiveService} from '../../../@core/services/active.service';
import {JobSeeMoreService} from '../../../@core/services/jobSeeMore.service';
import {Job} from '../../../@core/models/job';

@Component({
  selector: 'ngx-see-more-job',
  templateUrl: './see-more-job.component.html',
  styleUrls: ['./see-more-job.component.scss'],
})
export class SeeMoreJobComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private jobSeeMoreService: JobSeeMoreService,
              private router: Router,
              private at: ActivatedRoute,
             ) { }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  typeJob: string;
  jobs: Job [];
  pages: number [];
  ngOnInit(): void {
    this.typeJob = this.at.snapshot.params['typeJob'];
    this.jobSeeMoreService.getMoreJob(this.typeJob,1).subscribe(
      (data) => {
        console.log(data);
        this.jobs = data['jobList'];
        this.pages = data['listPage'];
    },
    (error) => {

    },
    );
  }
  setPage(p: number){
    this.jobSeeMoreService.getMoreJob(this.typeJob,p).subscribe(
      (data)=> {
        console.log(data);
        this.jobs = data['jobList'];
        this.pages = data['listPage'];
      },
    (error)=>{
        console.log(error.status);
    },
    );
  }
}
