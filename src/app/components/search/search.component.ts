import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DrugService } from 'src/app/shared/services/drug.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AifaDrugResponse } from 'src/app/shared/entities/response/aifa-drug-response';
import { AifaDrug } from 'src/app/shared/entities/aifa-drug';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDrugComponent } from '../update-drug/update-drug.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  public displayedColumns: string[] = ['principio_attivo', 'farmaco', 'confezione', 'confezione_di_riferimento', 'ditta', 'prezzo_pubblico'];

  constructor(public drugServ: DrugService, public authServ: AuthService, public dialog: MatDialog, private snackbarServ: SnackbarService) {
    if(authServ.isUserAdmin()){
      this.displayedColumns = this.displayedColumns.concat('edit', 'delete');
    }
   }

  // page state
  private searchState: boolean = false;

  public activeSubstance: string = "";

  public averagePrice: number | null = null;

  public drugs: Array<AifaDrug> = [];

  public size: number = 15;

  public page: number = 0;

  public totalElement: number = 0;

  public dataSource: MatTableDataSource<AifaDrug> = new MatTableDataSource<AifaDrug>(this.drugs);

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  ngOnInit(): void {
    this.drugServ.getAllDrugs(this.size, this.page).subscribe(
      data => {
        this.loadData(data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  private reloadInt() {
    this.drugServ.getAllDrugs(this.size, this.page).subscribe(
      data => {
        this.loadData(data);
      }
    );
  }

  // reload page after paginator event
  public reloadPage(event: PageEvent) {
    if (this.searchState) {
      this.loadNextPageSearch(event);
    } else {
      this.size = event.pageSize;
      this.page = event.pageIndex;
      this.drugServ.getAllDrugs(this.size, this.page).subscribe(
        data => {
          this.loadData(data);
        }
      );
    }
  }

  private loadData(data: AifaDrugResponse) {
    this.drugs = data.drugs;
    this.totalElement = data.totalElement;
    this.dataSource = new MatTableDataSource<AifaDrug>(this.drugs!);
  }

  public loadSearch() {
    this.searchState = true;
    this.size = 15;
    this.page = 0;
    this.drugServ.getSearchDrugs(this.activeSubstance, this.size, this.page).subscribe(
      data => {
        this.loadData(data);
        this.averagePrice = data.avgPrice;
        if(this.drugs.length == 0) {
          this.activeSubstance = "";
        }
      }
    )
  }

  private loadNextPageSearch(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.drugServ.getSearchDrugs(this.activeSubstance, this.size, this.page).subscribe(
      data => {
        this.loadData(data);
        this.averagePrice = data.avgPrice;
      }
    )
  }

  public deleteSearch() {
    this.searchState = false;
    this.activeSubstance = "";
    this.averagePrice = null;
    this.size = 15;
    this.page = 0;
    this.reloadInt();
  }

  public updateDrug(drug: AifaDrug) {
    const oldDrug = Object.assign({}, drug);
    const dialogRef = this.dialog.open(UpdateDrugComponent, {data: oldDrug});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.drugServ.putUpdatedDrug(result).subscribe(
          _ => {
            this.deleteSearch();
            this.snackbarServ.success("Drug updated");
          }
        );
      }
    });
  }

  public deleteDrug(drug: AifaDrug) {
    this.drugServ.deleteDrug(drug).subscribe(
      _ => {
        this.deleteSearch();
        this.snackbarServ.success("Drug updated");
      }
    )
  }
}
