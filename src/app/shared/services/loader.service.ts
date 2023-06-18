import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loading: boolean = false;

  public showSpinner() {
    console.log('show spinner');
    this.loading = true;
  }

  public hideSpinner() {
    console.log('hide spinner');
    this.loading = false;
  }

  public getSpinnerStatus() {
    return this.loading;
  }
}
