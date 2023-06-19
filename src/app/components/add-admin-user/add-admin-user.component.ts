import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { UserRegistrationRequest } from 'src/app/shared/entities/request/user-registration-request';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.component.html',
  styleUrls: ['./add-admin-user.component.scss']
})
export class AddAdminUserComponent {

  constructor(private userServ: UserService, private snackbarServ: SnackbarService) {}

  newAdmin = new UserRegistrationRequest();

  public onSubmit() {
    this.userServ.registerNewAdmin(this.newAdmin).subscribe(
      _ => {
        this.newAdmin = new UserRegistrationRequest();
        this.snackbarServ.success("Admin user registered");
      }
    );
  }

}
