import { AuthService } from "../shared/services/auth.service";
import { HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { LoaderService } from "../shared/services/loader.service";
import { Constants } from "../shared/constants";
import { SnackbarService } from "../shared/services/snackbar.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private loader: LoaderService, public snackbarServ: SnackbarService) {}

  // No Error handling
  private noErrHadle: Array<string> = [Constants.API_USER_INFO];

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loader.showSpinner();
    const authToken = this.auth.getUserToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    if(this.noErrHadle.indexOf(req.url) != -1) {
      return next.handle(authReq).pipe(
        finalize(() => {
          this.loader.hideSpinner();
        })
      );
    }
    return next.handle(authReq).pipe(catchError(this.handleError.bind(this))).pipe(
      finalize(() => {
        this.loader.hideSpinner();
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    this.snackbarServ.error("Bad request, try again");
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}