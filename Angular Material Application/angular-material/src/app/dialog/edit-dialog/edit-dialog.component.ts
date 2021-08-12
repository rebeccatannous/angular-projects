import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudFormService } from 'src/app/shared/crud-form.service';
import { StudentListComponent } from 'src/app/student-list/student-list.component';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private service: CrudFormService
  ) {}
form!: FormGroup;
fileType!:boolean;

  ngOnInit(): void {
    this.form=this.service.form;
  }

  onSubmit() {

    this.service.update(this.service.form.value);
    this.service.form.reset();
    this.service.emptyForm();
    console.log(this.service.ELEMENT_DATA);
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

}
