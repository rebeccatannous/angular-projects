import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { StudentListComponent } from './student-list/student-list.component';
import { AddDialogComponent } from './dialog/add-dialog/add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CrudFormService } from './shared/crud-form.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    AddDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSortModule,
    MatChipsModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }, CrudFormService],
  bootstrap: [AppComponent],
  entryComponents: [AddDialogComponent]

})
export class AppModule { }
