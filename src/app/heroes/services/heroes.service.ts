import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  //URL de DESARROLLO
  private baseUrl: string = environments.baseUrl;



  constructor(private http: HttpClient) { }


  //esta funcion devolve un observable, que a vez vai estar emitindo un array de Hero[]
  getHeroes():Observable<Hero[]>{
    //debo especificar un url de onde sacar os Hero[], ese url e o que usamos en DESARROLLO
    //*ver baseUrl
    //( esta.url + /heroes para, como vimos en postman, que me saque eso en concreto)
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  // | undefined por se alguen escribe mal a url-> 404
  getHerobyId(id: string) :Observable<Hero|undefined>{
    return this.http.get<Hero>(`${this,this.baseUrl}/heroes/${id}`)
    //se ven un id que non existe vai vir un error,http interceptao, para manexalo:
    .pipe(
      /* para atrapalos: catchError(rxjs)
        coller o error, para definior o argumento, se ven, regresar un observable
        of, forma de crear observables basado no valor metido nos seus parentesis*/
      catchError( error => of(undefined) )
    )
  }

  getSuggestions(query:string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${query}&_limit=6`);
  }


}
