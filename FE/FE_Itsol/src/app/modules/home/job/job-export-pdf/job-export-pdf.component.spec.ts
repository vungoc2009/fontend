import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExportPdfComponent } from './job-export-pdf.component';

describe('JobExportPdfComponent', () => {
  let component: JobExportPdfComponent;
  let fixture: ComponentFixture<JobExportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobExportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
