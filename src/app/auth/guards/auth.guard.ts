import { Injectable } from '@angular/core';
//se importa esta libreria para poder inyectar dependencias sin constructor de clase
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

/**SEGUNDO */
//se inyectan el AuthService y el Router
const checkAuthStatus = (): boolean | Observable<boolean> => {
  //inxectamos o service auth.service.ts
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  //senon esta autenticado que o leve ao login, que non salga o 404
  //esto comprobamolo co metodo checkAuthentication do auth.service.ts
  return authService.checkAuthentication()
  .pipe(
    tap( isAuthenticated => console.log('Authenticated', isAuthenticated) ),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {router.navigate(['/auth/login'])}
    }),

  );
};
/**regresan un booleano, ou un observable/promesa que regresa un booleano.
 * guardias de seguridad, para que non se poda entrar a certas rutas senon se cumple con certas condicions
 * (estar autenticado por exemplo)
 * PRIMEIRO: canMatchGuard:return true(se esta a false cortanos o paso(404) / canActgivatedGuard:return false
 * SEGUNDO: return checkAuthStatus();
 */

/*No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos
utilizar sus funcionalidades de guard en el app-routing*/
  //Tipado CanMatchFN!!
  /*route+segments para velo cando se dispare o guard*/
  export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    //console.log('Can Match');//console.log({ route, segments });
    return checkAuthStatus();
  };

//Hay que tener en cuenta el tipado CanActiveFn!!
/*route, state, estado/fotografia do roter*/
export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => {
 // console.log('Can Activate');// console.log({ route, state });
  return checkAuthStatus();
};


@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor() { }


}
