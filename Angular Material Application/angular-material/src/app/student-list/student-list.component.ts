import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { CrudFormService, Student } from '../shared/crud-form.service';
import { MatSort } from '@angular/material/sort';
import { AddDialogComponent } from '../dialog/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  DataFile!: File;
  clickedRows = new Set<Student>();
  listData!: MatTableDataSource<any>;
  message: string = 'Student exists.';
  actionButtonLabel: string = 'Confirm';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  addExtraClass: boolean = false;
  ngOnInit(): void {
    this.listData = new MatTableDataSource(this.service.ELEMENT_DATA);
    this.listData.sort = this.sort;
  }
  @ViewChild(MatSort) sort!: MatSort;
  searchKey!: string;
  displayedColumns: string[] = [
    'FullName',
    'DateofBirth',
    'IDCopy',
    'GPA',
    'Actions',
  ];
  constructor(
    public dialog: MatDialog,
    public dialogdelete: MatDialog,
    public service: CrudFormService,
    private _snackBar: MatSnackBar
  ) {}
  AddDialogRef!: MatDialogRef<AddDialogComponent>;
  EditDialogRef!: MatDialogRef<EditDialogComponent>;

  @ViewChild(MatTable)
  table!: MatTable<any>;
  delete(element: Student): void {
    const confirmDialog = this.dialogdelete.open(DeleteDialogComponent, {
      data: {
        message:
          'Are you sure, you want to remove this student: ' +
          element.fullName
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        var index = this.service.ELEMENT_DATA.indexOf(element);
        if (index > -1) {
          this.service.ELEMENT_DATA.splice(index, 1);
          this.table.renderRows();
        }
      }
    });
  }

  isDuplicate(element: Student) {
    for (let i = 0; i < this.service.ELEMENT_DATA.length; i++) {
      if (
        element.fullName.toLowerCase() ==
        this.service.ELEMENT_DATA[i].fullName.toLowerCase()
      )
        return true;
    }
    return false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onAdd(student: Student | null) {
    this.AddDialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
    });
    this.AddDialogRef.afterClosed().subscribe((result: Student) => {
      if (result !== undefined) {
        if (
          this.service.ELEMENT_DATA.map((p) => p.fullName).includes(
            result.fullName
          )
        ) {
          var index = this.service.ELEMENT_DATA.indexOf(result);
          this.service.ELEMENT_DATA[index] = result;

          this.table.renderRows();
        } else {
          if (!this.isDuplicate(result)) {
            this.service.ELEMENT_DATA.push(result);
            this.table.renderRows();
          } else {
            this.open();
            console.log('exits');
          }
        }
      }
    });
  }

  public getDataFile(student: Student) {
    return student.idCopy?.name;
  }

  onEdit(element: Student) {
    var index = this.service.ELEMENT_DATA.indexOf(element);
    this.service.setIndex(index);
    this.service.populate(element);
    this.EditDialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
    });
    this.EditDialogRef.afterClosed().subscribe((result) => {
      this.table.renderRows();
    });
  }

  render() {
    this.table.renderRows();
  }

  open() {
    let config = new MatSnackBarConfig();
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this._snackBar.open(
      this.message,
      this.action ? this.actionButtonLabel : undefined,
      config
    );
  }
}
