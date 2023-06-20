import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserRegistrationRequest } from '../entities/request/user-registration-request';
import { Constants } from '../constants';
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../entities/user';
import { AifaDrugResponse } from '../entities/response/aifa-drug-response';
import { AifaDrugSearchReponse } from '../entities/response/aifa-drug-search-response';
import { NewAifaDrugRequest } from '../entities/request/new-drug-request';
import { AifaDrug } from '../entities/aifa-drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private http: HttpClient) { }

  public getAllDrugs(size: number, page: number): Observable<AifaDrugResponse> {
    const params = { params: new HttpParams().set('size', size).set('page', page) }
    return this.http.get<AifaDrugResponse>(Constants.API_DRUG_ALL, params);
  }

  public getSearchDrugs(activeSubstance: string, size: number, page: number): Observable<AifaDrugSearchReponse> {
    const params = { params: new HttpParams().set('size', size).set('page', page).set('activeSubstance', activeSubstance) }
    return this.http.get<AifaDrugSearchReponse>(Constants.API_DRUG_SEARCH, params);
  }

  public putNewDrug(newDrug: NewAifaDrugRequest): Observable<any> {
    return this.http.post(Constants.API_DRUG_NEW, newDrug);
  }

  public putUpdatedDrug(updateDrug: AifaDrug): Observable<any> {
    var updateDrugReq = new NewAifaDrugRequest();
    return this.http.put(Constants.API_DRUG_UPD+updateDrug.id, updateDrug);
  }
}
