import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

export interface Student {
  fullName: string;
  dateOfBirth: string;
  idCopy: File | null;
  gpa: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudFormService {
  DataFile!:File;
  message: string = 'Student Exists';
  actionButtonLabel: string = 'Confirm';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  index = -1;

  constructor(private _snackBar: MatSnackBar) { }

  ELEMENT_DATA: Student[] = [
    {
      fullName: 'John Smith',
      dateOfBirth: '1/1/2001',
      idCopy: null,
      gpa: '4.0',
    },
    {
      fullName: 'Jane Doe',
      dateOfBirth: '2/2/2002',
      idCopy: null,
      gpa: '3.5',
    },
    {
      fullName: 'Maria Stewart',
      dateOfBirth: '3/3/2003',
      idCopy: null,
      gpa: '2.76',
    },
  ];

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('[a-zA-Z0-9 ]+'),
    ]),
    dateOfBirth: new FormControl('', [
      Validators.required,
      Validators.maxLength(2),
      Validators.pattern('^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$. '),
    ]),
    idCopy: new FormControl(null, Validators.required),
    gpa: new FormControl('', Validators.pattern('/^[0-4]\.\d\d$/')),
  });

  setIndex(i: any) {
    this.index = i;
  }

  emptyForm() {
    this.form.setValue({
      student: new FormControl(''),
      abbreviation: new FormControl(''),
      dataFile: new FormControl(null),
      direction: new FormControl(''),
    });
  }
  open() {
    let config = new MatSnackBarConfig();
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this._snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  populate(student: Student) {
    this.form.setValue(student);
  }
  isDuplicate(element: Student) {
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (
        element.fullName.toLowerCase() ==
     this.ELEMENT_DATA[i].fullName.toLowerCase()
      )
        return true;
    }
    return false;
  }
  update(student: Student) {
    if (!this.isDuplicate(student)) {
      this.ELEMENT_DATA[this.index] = student;
    } else {
      this.open();
      console.log('exits');
    }
  }
}
