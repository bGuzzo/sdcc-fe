import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  public success(message: string) {
    this.snackBar.open("Succes! " + message, "Dismiss");
  }

  public error(message: string) {
    this.snackBar.open("Error! " + message, "Dismiss");
  }
}
