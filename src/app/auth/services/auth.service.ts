import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, map, of, tap, catchError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?:User;

  constructor(private http: HttpClient) { }
/*structuredClone-> deep clone do obxeto, de ser un obxeto con poucos obxetos anidados
tamen nos vale o spread: {...this.user}
se ponhemos this.user directamente, deixamos o obxeto user exposto, porque pasan por ref
e eso non o debemos facer por motivos de seguridad*/
  get currentUser():User|undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }
/*pipe para regresar algo, metemos co tap na nosa variable user, o user que ven na url
1º tap establece usuario na propiedad da nosa clase (user)
2º tap realiza a grabacion no localstorage do id desde user, co nome 'token'
  */
  login( email:string, password:string ):Observable<User>{
    //this.http.post('login',{email, password});
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => this.user=user ),
      tap( user => localStorage.setItem('token', user.id.toString()) )
    )
  }
/*true-> atutenticado, flase->0 autenticado. Comproba se hai un usuario autenticado
!! -> 1º! se o usuario ten 0 valor, 2ª! negacion da 1ªnegacion, asi aseguramonos de devolver un valor booleano, e non un obxeto/undefined
*/
  checkAuthentication():Observable<boolean> {
    if(!localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => this.user = user),
      map( user => !!user ),
      catchError( err => of(false))
    )

  }

  logout(){
    this.user=undefined;
    localStorage.clear();
  }

}



