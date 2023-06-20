import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AifaDrug } from 'src/app/shared/entities/aifa-drug';

@Component({
  selector: 'app-update-drug',
  templateUrl: './update-drug.component.html',
  styleUrls: ['./update-drug.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule]
})
export class UpdateDrugComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateDrugComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AifaDrug,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
