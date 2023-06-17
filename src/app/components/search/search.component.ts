import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DrugService } from 'src/app/shared/services/drug.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AifaDrugResponse } from 'src/app/shared/entities/response/aifaDrugResponse';
import { AifaDrug } from 'src/app/shared/entities/aifaDrug';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(public drugServ: DrugService, private cdr: ChangeDetectorRef) { }

  public response: AifaDrugResponse | null = null;

  public drugs: Array<AifaDrug> = [];

  public size: number = 15;

  public page: number = 0;

  public totalPage: number = 0;

  public displayedColumns: string[] = ['principio_attivo', 'farmaco', 'confezione', 'ditta', 'prezzo_pubblico'];

  public dataSource: MatTableDataSource<AifaDrug> = new MatTableDataSource<AifaDrug>(this.drugs);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit(): void {
    // set paginator
    this.dataSource.paginator = this.paginator;
    // load all drugs
    this.drugServ.getAllDrugs(this.size, this.page).subscribe(
      data => {
        this.response = data;
        this.drugs = data.drugs;
        this.totalPage = this.response.totalPage;
        this.dataSource = new MatTableDataSource<AifaDrug>(this.drugs!);
        // this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  // reload page after paginator event
  public reloadPage() {
    let page: number = this.paginator?.pageIndex!;
    let size: number = this.paginator?.pageSize!;
    this.size = size;
    this.page = page;
    this.drugServ.getAllDrugs(this.size, this.page).subscribe(
      data => {
        this.response = data;
        this.drugs = data.drugs;
        this.totalPage = this.response.totalPage;
        this.dataSource = new MatTableDataSource<AifaDrug>(this.drugs!);
        this.cdr.detectChanges();
      }
    );
  }


}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
