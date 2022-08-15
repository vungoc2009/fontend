import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeactiveService} from './deactive.service';
import {ManagerJeService} from '../managerJe.service';
import {Router} from '@angular/router';
import {Je} from '../managerJe.model';


@Component({
  selector: 'ngx-deactive',
  templateUrl: './deactive.component.html',
  styleUrls: ['./deactive.component.scss'],
}) export class DeactiveComponent implements OnInit{

  sort: String;
  id: number;
  check = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private managerJeService: ManagerJeService,
              private dialogRef: MatDialogRef<DeactiveComponent>) {}

  ngOnInit(): void {
  }

  deactive() {
    this.id = this.data.id2;
    this.managerJeService.deactive(this.id).subscribe(()=>{
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();
  }

}

