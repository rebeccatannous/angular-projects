import { Component, OnInit,Inject } from '@angular/core';
import { CrudFormService, Student } from 'src/app/shared/crud-form.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
fileType!:boolean;
  lang!: Student;
  edit!: boolean;
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Student,
    public dialogRef: MatDialogRef<AddDialogComponent>,  private formBuilder: FormBuilder,public service: CrudFormService
    ){}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9 ]+'),
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),

      ]),
      idCopy: new FormControl(null, Validators.required),
      gpa: new FormControl('', Validators.required), })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateFile(){
    // application/json
  }
  submit() {
    this.dialogRef.close(this.form.value);
  }

  public onChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;

  //   if (!input.files?.length) {
  //       return;
  //   }

  //   const file = input.files[0];
  //   console.log(file);
  //   if(file.type === "application/json"){
  //   this.fileType=false;
  // this.service.DataFile=file;
  // }
  //   else
  //   this.fileType=true;
}
}
