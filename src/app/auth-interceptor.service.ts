import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorSerice implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modReq = req.clone({
      headers: req.headers.append('Auth', 'xyz'
    )});
    return next.handle(modReq);
  }
}
