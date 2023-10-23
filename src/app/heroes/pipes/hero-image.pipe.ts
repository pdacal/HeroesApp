import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {


  // mais facil manter os links eiqui que nas paxinas, asi esta todo nun so lugar
  transform(hero: Hero): string {
    if(!hero.id && !hero.alt_img){
      return 'assets/no-image.png'
    }
    if(hero.alt_img) return hero.alt_img;
    return `assets/heroes/${hero.id}.jpg`;
  }

}
