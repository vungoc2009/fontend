import { Component, OnInit } from '@angular/core';
import {JobService} from "../../../@core/services/job.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'ngx-public-job-detail',
  templateUrl: './public-job-detail.component.html',
  styleUrls: ['./public-job-detail.component.scss']
})
export class PublicJobDetailComponent implements OnInit {
  job: any;

  constructor(private jobService: JobService,
              private router: ActivatedRoute,
              private router2: Router) { }

  ngOnInit(): void {
    this.getJob();
  }

  getJob() {
    this.jobService.getJobById(this.router.snapshot.params['id']).
    subscribe(data => {
      this.job = data;
      console.log(this.job);
    });
  }
}
