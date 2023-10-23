import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  //inxectar o servicio(heroes)
  constructor (
    private heroesService:HeroesService,
    //par leer o URL, usamos este servivio que xa ven co Router
    private activatedRoute: ActivatedRoute,
    private router: Router,
     ){}

  /*-para poder facer unha peticion http enc anto este listo o componente
    necesito leer o URL
  -this.activateRoute.param: acceso aso params coma un observable, params = id (nas rutas, esta paxina aparece co parametro ID)
    {path:':id', component: HeroPageComponent }, polo que o parametro e o id
  --switchMap: co id deberia facer a peticion http o servicio, esta evz faremolo cun switchMap,
    collemos os params, desestructuramalo e collemos o id, mandamolo con heroeService.getHeroById
    busca o hero por id e recolleo
  --subscribe: se NOn hai hero-> redirixe a heroes/list
               se SI hai -> devolve o heroe que recollemos co switchMap
    metodo no servicio pa traer a info, se regresa un heroe que non existe redirixe a outra pantall
    se si existe establece o heroe, devolvea, para poder construir a pantalla
  */
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      //delay(3000),
      switchMap( ({ id }) => this.heroesService.getHerobyId(id) ),
    )
    .subscribe(hero => {
      if(!hero) return this.router.navigate(['heroes/list']);
     this.hero=hero;
     return;
    })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }
}
