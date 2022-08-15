import {Component, OnInit} from '@angular/core';
import {Filerecruit} from './filerecruit';
import {JobregisterService} from '../../../@core/services/jobregister.service';
import {PageEvent} from '@angular/material/paginator';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'ngx-filerecruit',
  templateUrl: './filerecruit.component.html',
  styleUrls: ['./filerecruit.component.scss'],
})
export class FilerecruitComponent implements OnInit {
  pageNo = 0;
  pageSize = 5;
  pageSizeOption: Number[] = [1, 2,3,4,10,20];
  sort = 'dateRegister';
  type = true;
  // @ts-ignore
  filerecruit: Filerecruit[];

  constructor(private jobregisterService: JobregisterService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.getFilerecruit();
  }


  getFilerecruit() {
    // @ts-ignore
    this.jobregisterService.getJobRegister(this.pageNo, this.pageSize).subscribe(data => {
      // console.log(data);
      this.filerecruit = data;
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onChangePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNo = event.pageIndex;
    this.getFilerecruit();
  }

  sorttable() {
    this.jobregisterService.getListSort(this.pageNo, this.pageSize, this.sort, this.type).subscribe(data => {
      this.filerecruit = data;
      if (this.type) {
        this.type = false;
      } else {
        this.type = true;
      }

      console.log(data);
    });
  }

  // @ts-ignore
  getReason(filerecruits: any) {
    alert(filerecruits.reason);
    console.log(filerecruits.reason);
  }

  getjobPosition(filerecruits) {
    this.router.navigate(['home/job']);
  }

  changeDetailJob() {
    this.router.navigate(['home/detail-job']);
  }
}
