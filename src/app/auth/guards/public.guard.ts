//so ver o login se NON se esta logeado
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication()
  .pipe(
    tap( isAuthenticated => console.log('Authenticated', isAuthenticated) ),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['./'])
      }
    }),
    map( isAuthenticated => !isAuthenticated)

  );
};
//para que funcione tiven que cambiarlle o nome e importalo a parte en app routing
  export const canMatchGuardPublic: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus();
  };

export const canActivateGuardPublic: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => {
  return checkAuthStatus();
};


@Injectable({providedIn: 'root'})
export class PublicGuard {
  constructor() { }


}
