import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// Auth service
import { AuthService } from "./shared/services/auth.service";
// HttpClient
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './http-interceptors/request-interceptor';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Anguar matirial
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
// Form
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddAdminUserComponent } from './components/add-admin-user/add-admin-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    UserInfoComponent,
    SearchComponent,
    AdminComponent,
    SpinnerComponent,
    AddAdminUserComponent
  ],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    // Firebase module import
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Form
    FormsModule
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
