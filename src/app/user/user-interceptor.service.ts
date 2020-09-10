import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class UserInterceptorService implements HttpInterceptor  {

    constructor(private userService: UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.userService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
             return next.handle(modifiedReq);
        })
      );
    }
}