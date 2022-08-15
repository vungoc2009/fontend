import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import html2canvas from 'html2canvas';
// @ts-ignore
import {jsPDF} from 'jspdf';
import {Job} from "../../../../@core/models/job";
import {JobService} from "../../../../@core/services/job.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ngx-job-export-pdf',
  templateUrl: './job-export-pdf.component.html',
  styleUrls: ['./job-export-pdf.component.scss'],
})
export class JobExportPdfComponent implements OnInit {

  job: any;

  constructor(private jobService: JobService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.jobService.getJobById(this.router.snapshot.params['id']).
    subscribe(data => {
      this.job = data;
      console.log(this.job);
    });
  }

  @ViewChild('htmlData') htmlData!: ElementRef;
  public openPDF(name: string): void {
    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(name + '.pdf');
    });
  }
}
