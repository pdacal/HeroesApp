import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{

  public heroes: Hero[] = [];

  //cargamos esto no ngOnInit
  //en calquer peticion http, cando se monta o componente, montamolo no ngOnInit
  constructor(private heroesService: HeroesService){
  }
  ngOnInit(): void {
    //para que se dispare debemos facer o susbcribe, recollemos os heroes que regresa o
    //servicio e gardamolos na nosa propiedad //*heroes*/
    this.heroesService.getHeroes()
    .subscribe( heroes => this.heroes = heroes);
  }
}
