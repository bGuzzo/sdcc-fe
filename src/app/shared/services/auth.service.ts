import { Injectable, NgZone } from '@angular/core';
import { User } from '../entities/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserRole } from '../enums/user-role';
import { UserService } from './user.service';
import { UserRegistrationRequest } from '../entities/request/user-registration-request';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Save logged in user data
  userData: User | null = null;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public userService: UserService,
    private snackbarServ: SnackbarService
  ) {
    // Using local storage to stage usuer and token data
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        user.getIdToken().then(
          idToken => {
            localStorage.setItem('token', idToken);
            this.userService.getUserInfo(idToken).subscribe({
              next: (user) => {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);
                this.router.navigate(['dashboard']);
              },
              error: () => {
                this.afAuth.signOut().then(
                  _ => {
                    this.snackbarServ.error("Wrong credentials or Server error");
                    this.cleanLocalStorage();
                    this.router.navigate(['sign-in']);
                  }
                );
              }
            });
          }
        )
      }
    });
  }

  private cleanLocalStorage() {
    localStorage.setItem('token', 'null');
    localStorage.setItem('user', 'null');
  }

  public isUserAdmin(): boolean {
    return this.userData?.role == UserRole.ADMIN;
  }

  // Read user token from localStorage
  public getUserToken(): string {
    return localStorage.getItem('token')!;
  }

  // Sign in with email/password
  public signIn(email: string, password: string) {
    this.cleanLocalStorage();
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        this.snackbarServ.error("Wrong credentials or Server error");
      });
  }

  // User registation
  public signUp(email: string, password: string, name: string, surname: string) {
    var newUser = new UserRegistrationRequest();
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;
    newUser.surname = surname;
    console.log('here');
    this.userService.registerNewUser(newUser).subscribe(
      _ => {
        this.router.navigate(['sign-in']);
      }
    );
  }

  // Reset Forggot password
  public forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.snackbarServ.success("Password reset email sent");
      })
      .catch((error) => {
        this.snackbarServ.error("Try again");
      });
  }

  // Sign out
  public signOut() {
    return this.afAuth.signOut().then(() => {
      this.cleanLocalStorage();
      this.router.navigate(['sign-in']);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}