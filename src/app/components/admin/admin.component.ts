import { Component } from '@angular/core';
import { NewAifaDrugRequest } from 'src/app/shared/entities/request/new-drug-request';
import { DrugService } from 'src/app/shared/services/drug.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private drugServ: DrugService) {}

  drugReq = new NewAifaDrugRequest();

  public onSubmit() {
    this.drugServ.putNewDrug(this.drugReq).subscribe(
      data => {
        this.drugReq = new NewAifaDrugRequest();
        window.alert('Drug successfully added');
      }
    );
    // 
  }


}
