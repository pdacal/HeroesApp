import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit{

//recibir un hero
@Input()
public hero!:Hero;

ngOnInit(): void {
  //senon existe lanza un erro
  if(!this.hero) throw Error('Hero property is required');
}


}

