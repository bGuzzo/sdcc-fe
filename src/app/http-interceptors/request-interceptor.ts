import { AuthService } from "../shared/services/auth.service";
import { HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getUserToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authReq).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Network error
      window.alert('Network error')
    } else {
      // Backend error
      window.alert(`Backend returned code ${error.status}, body was: ` + error.error);
    }
    // Throw error on console
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}