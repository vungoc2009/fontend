import { Component, OnInit} from '@angular/core';
import {Je} from './managerJe.model';
import {ManagerJeService} from './managerJe.service';
import {PageEvent} from '@angular/material/paginator';
import {EditJeComponent} from './editJe/editJe.component';
import {ResJeComponent} from './resJe/resJe.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeactiveComponent} from './deactive/deactive.component';

@Component({
  selector: 'ngx-managerJe',
  templateUrl: './managerJe.component.html',
  styleUrls: ['./managerJe.component.scss'],
}) export  class ManagerJeComponent implements OnInit{
  allJe: Je[];
  page = 0;
  size = 5;
  totalRecords: number;
  sort='name';
  jes: Je[];
  type = true;

  constructor(public dialog: MatDialog, private managerJeService: ManagerJeService ) {
  }
  ngOnInit(): void {
    this.getJe();
    this.getAllJe();
  }
  getAllJe() {
    this.managerJeService.getNumberJe().subscribe(res=> {
      this.allJe = res;
      this.totalRecords = this.allJe.length;
    });
  }


  onChangePage(event: any) {
    this.page = event.page;
    this.size = event.rows;
    this.getJe();

  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(EditJeComponent, {
      disableClose: true,
      data: ({id1: id}),
   
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getJe();
    });
  }

  openDialog1(id): void {
    const dialogRef = this.dialog.open(DeactiveComponent, {
      disableClose:true,
      data:({id2:id }),
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getJe();
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(ResJeComponent, {
      disableClose:true,
    });
    dialogRef.afterClosed().subscribe(resulr => {
      this.getJe();
    });
  }
  sorttable() {
    this.managerJeService.getJeSort(this.page, this.size, this.sort, this.type).subscribe(jes => {
      this.jes = jes;
      if (this.type) {
        this.type = false;
      } else {
        this.type = true;
      }
    });
  }
  getJe() {
    this.managerJeService.getJe(this.page, this.size).subscribe(res =>{
        this.jes = res;
      },
    );
  }
}

