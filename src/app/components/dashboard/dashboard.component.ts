import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  // 0 = User Info
  // 1 = Search
  // 2 = Admin
  public selected: number = 0;
  
  constructor(public authService: AuthService) { }
  
  ngOnInit(): void { }

  selectSearch(){
    this.selected = 1;
  }

  selectAdmin(){
    this.selected = 2;
  }

}
