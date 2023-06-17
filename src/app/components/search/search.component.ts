import { Component, ViewChild } from '@angular/core';
import { DrugService } from 'src/app/shared/services/drug.service';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public response: any;

  public size: number = 20;

  public page: number = 0;

  constructor(public drugServ: DrugService) {}

  ngOnInit(): void { 
    this.drugServ.getAllDrugs(this.size, this.page).subscribe(
      data => {
        this.response = data;
      }
    );
  }
  
}
