import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard  implements CanActivate {
    constructor(private userService: UserService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot
     ): boolean |
        UrlTree |
        Promise<boolean | UrlTree> |
        Observable<boolean | UrlTree> {
        return this.userService.user.pipe(
            take(1),
            map(user => {
            debugger;
            const isAuth =  !user ? false : true;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }));
    }
}