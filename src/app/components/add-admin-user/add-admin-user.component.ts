import { Component } from '@angular/core';
import { UserRegistrationRequest } from 'src/app/shared/entities/request/user-registration-request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.component.html',
  styleUrls: ['./add-admin-user.component.scss']
})
export class AddAdminUserComponent {

  constructor(private userServ: UserService) {}

  newAdmin = new UserRegistrationRequest();

  public onSubmit() {
    this.userServ.registerNewAdmin(this.newAdmin).subscribe(
      _ => {
        this.newAdmin = new UserRegistrationRequest();
        window.alert('Admin user successfully registered');
      }
    );
  }

}
