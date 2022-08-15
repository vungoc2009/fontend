import { Component, OnInit } from '@angular/core';
import {Job} from '../../../../@core/models/job';
import {JobPosition} from '../../../../@core/models/job-position';
import {JobService} from '../../../../@core/services/job.service';
import {Router} from '@angular/router';
import {JobPositionService} from '../../../../@core/services/job-position.service';
import {WorkingForm} from '../../../../@core/models/working-form';
import {AcademicLevel} from '../../../../@core/models/academic-level';
// @ts-ignore
import {Rank} from '../../../../@core/models/rank';
import {StatusJob} from '../../../../@core/models/status-job';
import {WorkingFormService} from '../../../../@core/services/working-form.service';
import {AcademicLevelService} from '../../../../@core/services/academic-level.service';
import {RankService} from '../../../../@core/services/rank.service';
import {StatusJobService} from '../../../../@core/services/status-job.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Je} from '../../managerJe/managerJe.model';
import {ManagerJeService} from '../../managerJe/managerJe.service';
import {SessionService} from '../../../../@core/services/session.service';
import {NgbDate, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import {Toaster} from 'ngx-toast-notifications';

@Component({
  selector: 'ngx-job-insert',
  templateUrl: './job-insert.component.html',
  styleUrls: ['./job-insert.component.scss'],
})
export class JobInsertComponent implements OnInit {

  job: Job = new Job();
  jobPositions: JobPosition[];
  workingForms: WorkingForm[];
  academicLevels: AcademicLevel[];
  ranks: Rank[];
  contactJE: Je[];
  currentUser: string;
  idCurrentUser: number;
  isSubmitted = false;

  insertJobForm: FormGroup;

  constructor(private jobService: JobService,
              private jobPositionService: JobPositionService,
              private workingFormService: WorkingFormService,
              private academicLevelService: AcademicLevelService,
              private rankService: RankService,
              private statusJobService: StatusJobService,
              private managerJeService: ManagerJeService,
              private sessionService: SessionService,
              private router: Router,
              private toast: Toaster) { }

  ngOnInit(): void {
    this.getJobPosition();
    this.getWorkingForm();
    this.getAcademicLevel();
    this.getRank();
    this.getContactJE();
    this.getCurrentUserId();

    this.insertJobForm = new FormGroup({
      name : new FormControl('',
        [Validators.required, Validators.maxLength(150)]),
      'job-position': new FormControl('',
        [Validators.required]),
      'working-form': new FormControl('',
        [Validators.required]),
      'salaryMin' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'salaryMax' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'address-work' : new FormControl('',
        [Validators.required, Validators.maxLength(300)]),
      description : new FormControl('',
        [Validators.required, Validators.maxLength(2000)]),
      'number-experience' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'qty-person' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'academic-level': new FormControl('',
        [Validators.required]),
      rank: new FormControl('',
        [Validators.required]),
      skills : new FormControl('',
        [Validators.required]),
      'due-date' : new FormControl('',
        [Validators.required]),
      contact : new FormControl('',
        [Validators.required]),
      interest : new FormControl('',
        [Validators.required, Validators.maxLength(2000)]),
      'job-requirement' : new FormControl('',
        [Validators.required, Validators.maxLength(2000)]),
      });
  }


  getJobPosition() {
    this.jobPositionService.getJobPositionList().subscribe(data => {
      this.jobPositions = data;
      console.log(this.jobPositions);
    });
  }
  selectJobPositionOption(id: number) {
    console.log(id);
    this.job.jobPositionId = id;
    console.log(this.job.jobPositionId);
  }

  getWorkingForm() {
    this.workingFormService.getWorkingFormList().subscribe(data => {
      this.workingForms = data;
    });
  }
  selectWorkingFormOption(id: number) {
    this.job.workingFormId = id;
  }

  getAcademicLevel() {
    this.academicLevelService.getAcademicLevelList().subscribe(data => {
      this.academicLevels = data;
    });
  }
  selectAcademicLevelOption(id: number) {
    this.job.academicLevelId = id;
  }

  getRank() {
    this.rankService.getRankList().subscribe(data => {
      this.ranks = data;
    });
  }
  selectRankOption(id: number) {
    this.job.rankId = id;
  }
  getContactJE() {
    this.managerJeService.getContactJE().subscribe(data => {
      this.contactJE = data;
    });
  }
  selectContactJE(id: number) {
    this.job.contactId = id;
  }

  getCurrentUserId() {
    this.currentUser=this.sessionService.getItem('auth-user');
    this.jobService.getProfile(this.currentUser.sub).subscribe(
      (res)=>{
        console.log('id current log in: ' + res.id);
        this.idCurrentUser = res.id;
      },
    );
  }

  inputJob() {
    const today = new Date();
    this.job.startRecruitmentDate = today;
    this.job.updateId = this.idCurrentUser;
    this.job.createId = this.idCurrentUser;
    this.job.updateDate = today;
    this.job.createDate = today;
    this.job.statusId = 1;
    this.job.views = 0;
    this.job.isDelete = false;
  }

  saveJob() {
    this.inputJob();

    this.jobService.createJob(this.job).subscribe( data => {
      console.log('data = ' + data);
      this.gotoJobList();
    }, error => console.log(error));
  }

  gotoJobList() {
    this.router.navigate(['home/job']);
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

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.job);
    console.log('idCurrentUser = ' + this.idCurrentUser);
    this.showToaster('Thêm mới thành công','success');
    this.saveJob();
  }
}


