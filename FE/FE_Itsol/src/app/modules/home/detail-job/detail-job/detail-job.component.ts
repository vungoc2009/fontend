import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss'],
})

export class DetailJobComponent implements OnInit {

  selection = ['online', 'offline'];

  check = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  showDetail() {
  }
}
