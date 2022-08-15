import { Component, OnInit } from '@angular/core';
import {Job} from '../../../../@core/models/job';
import {JobService} from '../../../../@core/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../../../@core/services/session.service';
import {Toaster} from 'ngx-toast-notifications';
import {MatDialog} from '@angular/material/dialog';
import {JobUpdateComponent} from "./job-update/job-update.component";
import dialog = CKEDITOR.dialog;

@Component({
  selector: 'ngx-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {

  job: any;
  role: string;
  user: any;

  constructor(private jobService: JobService,
              private sessionService: SessionService,
              private router: ActivatedRoute,
              private router2: Router,
              private toast: Toaster,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getJob();
    this.getCurrentUserRole();
  }

  getJob() {
    this.jobService.getJobById(this.router.snapshot.params['id']).
    subscribe(data => {
      this.job = data;
      console.log(this.job);
    });
  }

  getCurrentUserRole() {
    this.user = this.sessionService.getItem('user');
    this.role = this.user.auth;
    console.log('role log in: ' + this.role);
  }

  showToaster(message: string,typea: any) {
    const type = typea;
    this.toast.open({
      text: message,
      caption: 'Thành công',
      type,
      duration: 3000,
    });
  }

  onPreview(id: number) {
    // this.router.navigate(['home/job/detail', id]);
    const url = this.router2.serializeUrl(
      this.router2.createUrlTree(['public/itsol_recruitment/job',id])
    );
    window.open(url, '_blank');
  }

  updateJob() {
    this.jobService.updateJob(this.job.id, this.job).subscribe(data => {
      console.log('data = ');
      console.log(data);
    }, error => console.log(error));
  }

  onApprove() {
    this.job.status.id = 4;
    console.log(this.job);
    this.updateJob();
    this.showToaster('Đã xét duyệt', 'success');
  }

  onRefuse() {
    this.job.status.id = 2;
    console.log(this.job);
    this.updateJob();
    this.showToaster('Đã từ chối ', 'success');

  }

  onPublish() {
    this.job.status.id = 3;
    console.log(this.job);
    this.updateJob();
    this.showToaster('Đã xét duyệt', 'success');

  }

  onStopHiring() {
    this.job.status.id = 6;
    console.log(this.job);
    this.updateJob();
    this.showToaster('Đã dừng tuyển', 'success');
  }

  onClose() {
    this.job.status.id = 5;
    console.log(this.job);
    this.updateJob();
    this.showToaster('Đã đóng', 'success');

  }

  onDelete() {
    this.jobService.deleteJobById(this.job.id).subscribe(data => {
      console.log(data);
    });
    this.showToaster('Đã xóa', 'success');
    this.gotoJobList();
  }

  gotoJobList() {
    this.router2.navigate(['home/job']);
  }

  openDialog(id): void {
    const  dialogRef = this.dialog.open(JobUpdateComponent, {
      data:({idJob:id}),
      width: '100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getJob();
    });
  }
}
