import {WorkingForm} from './working-form';
export class Job {
  id: number;
  name: string;
  jobPositionId: number;
  numberExperience: string;
  workingFormId: number;
  addressWork: string;
  academicLevelId: number;
  rankId: number;
  qtyPerson: string;
  startRecruitmentDate: Date;
  dueDate: Date;
  skills: string;
  workingForm: WorkingForm;
  jobRequirement: string;
  description: string;
  interest: string;
  salaryMax: number;
  salaryMin: number;
  contactId: number;
  createId: number;
  createDate: Date;
  updateId: number;
  updateDate: Date;
  statusId: number;
  views: number;
  isDelete: boolean;

  /*constructor(
  id: number,
  name: string,
  jobPositionId: number,
  numberExperience: string,
  workingFormId: number,
  addressWork: string,
  academicLevelId: number,
  rankId: number,
  qtyPerson: string,
  startRecruitmentDate: string,
  dueDate: Date,
  skills: string,
  description: string,
  interest: string,
  jobRequirement: string,
  salaryMax: number,
  salaryMin: number,
  contactId: number,
  createId: number,
  createDate: number,
  updateId: number,
  updateDate: Date,
  statusId: number,
  views: number,
  isDelete: boolean) {
    this.id =id;
    this.name = name;
    this.jobPositionId = jobPositionId;
    this.numberExperience = numberExperience;
    this.workingFormId = workingFormId;
    this.addressWork = addressWork;
    this.academicLevelId = academicLevelId;
    this.rankId = rankId;
    this.qtyPerson = qtyPerson;
    // this.startRecruitmentDate = startRecruitmentDate;
    this.dueDate = dueDate;
    this.skills = skills;
    this.description = description;
    this.interest = interest;
    this.jobRequirement = jobRequirement;
    this.salaryMax = salaryMax;
    this.salaryMin = salaryMin;
    this.contactId = contactId;
    this.createId = createId;
    this.createDate = createDate;
    this.updateId = updateId;
    this.updateDate = updateDate;
    this.statusId = statusId;
    this.views = views;
    this.isDelete = isDelete;
  }*/
}
