import { AuthService } from "../shared/services/auth.service";
import { HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { LoaderService } from "../shared/services/loader.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private loader: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loader.showSpinner();
    const authToken = this.auth.getUserToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authReq).pipe(catchError(this.handleError)).pipe(
      finalize(() => {
        this.loader.hideSpinner();
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Network error
      window.alert('Network error')
    } else {
      // Backend error
      window.alert(`Backend returned code ${error.status} with message: ` + error.error.message);
    }
    // Throw error on console
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}