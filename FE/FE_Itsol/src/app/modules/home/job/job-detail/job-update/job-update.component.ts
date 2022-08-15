import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Job} from '../../../../../@core/models/job';
import {JobPosition} from '../../../../../@core/models/job-position';
import {WorkingForm} from '../../../../../@core/models/working-form';
import {AcademicLevel} from '../../../../../@core/models/academic-level';
import {Rank} from '../../../../../@core/models/rank';
import {StatusJob} from '../../../../../@core/models/status-job';
import {JobService} from '../../../../../@core/services/job.service';
import {JobPositionService} from '../../../../../@core/services/job-position.service';
import {WorkingFormService} from '../../../../../@core/services/working-form.service';
import {AcademicLevelService} from '../../../../../@core/services/academic-level.service';
import { RankService } from '../../../../../@core/services/rank.service';
import { ActivatedRoute } from '@angular/router';
import {ManagerJeService} from '../../../managerJe/managerJe.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Je} from "../../../managerJe/managerJe.model";
import {SessionService} from "../../../../../@core/services/session.service";
import {Toaster} from "ngx-toast-notifications";

@Component({
  selector: 'ngx-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.scss']
})
export class JobUpdateComponent implements OnInit {

  job: any;
  jobPositions: JobPosition[];
  workingForms: WorkingForm[];
  academicLevels: AcademicLevel[];
  ranks: Rank[];
  contactJE: Je[];
  currentUser: string;
  idCurrentUser: number;
  id: number;
  jobUpdate: any;
  //Form
  updateJobForm: FormGroup;

  constructor(private jobService: JobService,
              private jobPositionService: JobPositionService,
              private workingFormService: WorkingFormService,
              private academicLevelService: AcademicLevelService,
              private rankService: RankService,
              private managerJeService: ManagerJeService,
              private sessionService: SessionService,
              private toast: Toaster,
              private router: ActivatedRoute,
              public dialogRef: MatDialogRef<JobUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getJob();
    this.initForm();
    //Select Option
    this.getJobPosition();
    this.getWorkingForm();
    this.getAcademicLevel();
    this.getRank();
    this.getContactJE();
    this.getCurrentUserId();

  }

  initForm() {
    this.updateJobForm = new FormGroup({
      'name' : new FormControl('',
        [Validators.required, Validators.maxLength(150)]),
      'jobPosition': new FormControl('',
        [Validators.required]),
      'workingForm': new FormControl('',
        [Validators.required]),
      'salaryMin' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'salaryMax' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'addressWork' : new FormControl('',
        [Validators.required, Validators.maxLength(300)]),
      'description' : new FormControl('',
        [Validators.required, Validators.maxLength(2000)]),
      'numberExperience' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'qtyPerson' : new FormControl('',
        [Validators.required, Validators.pattern('[0-9]+')]),
      'academicLevel': new FormControl('',
        [Validators.required]),
      'rank': new FormControl('',
        [Validators.required]),
      'skills' : new FormControl('',
        [Validators.required]),
      'dueDate' : new FormControl('',
        [Validators.required]),
      'contact' : new FormControl('',
        [Validators.required]),
      'interest' : new FormControl('',
        [Validators.required, Validators.maxLength(2000)]),
      'jobRequirement' : new FormControl('',
        [Validators.required, Validators.maxLength(2000)]),
    });
  }
  getJob() {
    this.id = this.data.idJob;
    this.jobService.getJobById(this.id).
    subscribe(data => {
      this.job = data;
      console.log(this.job);
      this.displayForm(data);
    });
  }

  displayForm(job: Job): void{
    this.updateJobForm.patchValue({
      name: job.name,
    });
  }

  getJobPosition() {
    this.jobPositionService.getJobPositionList().subscribe(data => {
      this.jobPositions = data;
      console.log(this.jobPositions);
    });
  }
  selectJobPostionOption(id: number) {
    this.jobUpdate.jobPosition.id = id;
    console.log(id);
  }
  getWorkingForm() {
    this.workingFormService.getWorkingFormList().subscribe(data => {
      this.workingForms = data;
    });
  }
  selectWorkingFormOption(id: number) {
    this.jobUpdate.workingForm.id = id;
  }

  getAcademicLevel() {
    this.academicLevelService.getAcademicLevelList().subscribe(data => {
      this.academicLevels = data;
    });
  }
  selectAcademicLevelOption(id: number) {
    this.jobUpdate.academicLevel.id = id;
  }

  getRank() {
    this.rankService.getRankList().subscribe(data => {
      this.ranks = data;
    });
  }
  selectRankOption(id: number) {
    this.jobUpdate.rank.id = id;
    console.log(id);
  }

  getContactJE() {
    this.managerJeService.getContactJE().subscribe(data => {
      this.contactJE = data;
    });
  }
  selectContactJE(id: number) {
    this.jobUpdate.contact.id = id;
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
    this.jobUpdate = this.job;
    this.jobUpdate.name = this.updateJobForm.value.name;
    this.jobUpdate.numberExperience = this.updateJobForm.value.numberExperience;
    this.jobUpdate.addressWork = this.updateJobForm.value.addressWork;
    this.jobUpdate.qtyPerson = this.updateJobForm.value.qtyPerson;
    this.jobUpdate.dueDate = this.updateJobForm.value.dueDate;
    this.jobUpdate.skills = this.updateJobForm.value.skills;
    this.jobUpdate.description = this.updateJobForm.value.description;
    this.jobUpdate.interest = this.updateJobForm.value.interest;
    this.jobUpdate.jobRequirement = this.updateJobForm.value.jobRequirement;
    this.jobUpdate.salaryMax = this.updateJobForm.value.salaryMax;
    this.jobUpdate.salaryMin = this.updateJobForm.value.salaryMin;
    this.jobUpdate.update.id = this.idCurrentUser;
    this.jobUpdate.updateDate = today;
  }

  onSubmit() {
    this.inputJob();
    console.log("job update");
    console.log(this.jobUpdate);
    this.jobService.updateJob(this.job.id, this.jobUpdate).subscribe(data => {
      console.log("data = ");
      console.log(data);
      this.showToaster('Đã cập nhật', 'success');
    }, error => console.log(error));
    this.dialogRef.close();
  }

  showToaster(message: string,typea: any) {
    const type = typea;
    this.toast.open({
      text: message,
      caption: 'Thành công',
      type: type,
      duration: 3000
    });
  }
}
