import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobService} from '../../../../@core/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {Toaster} from 'ngx-toast-notifications';


@Component({
  selector: 'ngx-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {

  jobs: any;
  pageNo = 0;
  pageSize = 5;
  pageSizeOption: Number[] = [1, 2,5,10,20];
  sort: string;
  type = true;
  searchText: string;

  constructor(private jobService: JobService,
              private router: Router,
              private router2: ActivatedRoute,
              private toast: Toaster) { }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(){
    this.jobService.getJobPage(this.pageNo, this.pageSize).subscribe(data => {
      this.jobs = data;
      console.log(data);
    });
  }


  searchJob(keyword: string) {
    if(keyword !== '') {
      this.jobService.searchJob(keyword).subscribe(data => {
        this.jobs = data;
        console.log(data);
      });
    } else {
      this.getJobs();
    }
  }

  onChangePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNo = event.pageIndex;
    this.getJobs();
  }

  sorttable(sortName: string) {
    this.sort = sortName;
    this.jobService.getListSort(this.pageNo, this.pageSize, this.sort, this.type).subscribe(data => {
      this.jobs = data;
      if (this.type) {
        this.type = false;
      } else {
        this.type = true;
      }

      console.log(data);
    });
  }

  gotoInsertJob() {
    this.router.navigate(['home/job/insert']);
  }

  gotoDetailJob(id: number) {
    this.router.navigate(['home/job/detail', id]);
  }

  gotoExportPDFJob(id: number) {
    // this.router.navigate(['job/exportPDF', id]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['job/exportPDF',id]),
    );
    window.open(url, '_blank');
  }

  gotoPreviewJob(id: number) {
    // this.router.navigate(['home/job/detail', id]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['public/itsol_recruitment/job',id]),
    );
    window.open(url, '_blank');
  }

  onPublish(id: number) {
    this.jobService.updateJobStatus(id, 3).subscribe(data => {
      console.log('id = ' + id);
      console.log('data = ');
      console.log(data);
      this.showToaster('Đăng tuyển thành công', 'success');
      this.getJobs();
    }, error => console.log(error));
  }

  showToaster(message: string,typea: any) {
    const type = typea;
    this.toast.open({
      text: message,
      caption: 'Thành công',
      type: type,
      duration: 3000,
    });
  }


}
