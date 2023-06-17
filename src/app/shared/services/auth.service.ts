import { Injectable, NgZone } from '@angular/core';
import { User } from '../entities/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserRole } from '../enums/user-role';
import { UserService } from './user.service';
import { UserRegistrationRequest } from '../entities/request/user-registration-request';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
    public userService: UserService
  ) {
    // Using local storage to stage usuer and token data
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        user.getIdToken().then(
          idToken => {
            localStorage.setItem('token', idToken);
            this.userService.getUserInfo(idToken).pipe(catchError(this.hadleAuthError)).subscribe(
              user => {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);
                this.router.navigate(['dashboard']);
              }
            );
          }
        )
      } else {
        this.cleanLocalStorage();
      }
    });
  }

  private cleanLocalStorage() {
    localStorage.setItem('token', 'null');
    localStorage.setItem('user', 'null');
    JSON.parse(localStorage.getItem('user')!);
  }

  private hadleAuthError(error: HttpErrorResponse) {
    this.cleanLocalStorage();
    return throwError(() => new Error('Auth Error; please try again later.'));
  }

  isUserAdmin(): boolean {
    return this.userData?.role == UserRole.ADMIN;
  }

  // Read user token from localStorage
  getUserToken(): string {
    return localStorage.getItem('token')!;
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // User registation
  public signUp(email: string, password: string, name: string, surname: string) {
    var newUser = new UserRegistrationRequest(email, password, name, surname);
    console.log('here');
    this.userService.registerNewUser(newUser);
    this.router.navigate(['sign-in']);
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.cleanLocalStorage();
      this.router.navigate(['sign-in']);
    });
  }


  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     this.router.navigate(['dashboard']);
  //   });
  // }
  // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.router.navigate(['dashboard']);
  //       // this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user: any) {

  // var userData;

  // TODO enable to get role and id from be service
  // this.userService.getUserInfo(localStorage.getItem('token')!).subscribe(
  //   user => {
  //     userData = user;
  //   }
  // );

  // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //   `users/${user.uid}`
  // );
  // const userData: User = {
  //   id: 'user-id-here',
  //   uid: user.uid,
  //   email: user.email,
  //   displayName: user.displayName,
  //   photoURL: user.photoURL,
  //   emailVerified: user.emailVerified,
  //   role: UserRole.END
  // };
  // return userRef.set(userData, {
  //   merge: true,
  // });
  // }
}