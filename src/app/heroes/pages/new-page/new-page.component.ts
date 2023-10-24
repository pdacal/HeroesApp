import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  constructor (private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ){};

    //para distinguir ente editar/engadir heroe
  ngOnInit(): void {
    if( !this.router.url.includes('edit'))return;
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHerobyId(id) ),
    ).subscribe(hero =>{
      if( !hero ) {return this.router.navigateByUrl('/')} //se heroe 0existe->expulsar
      this.heroForm.reset( hero );
      return;
    } )
  }

  //o que devolve non e excactamente un hero, debemos indicarlle que o trate como se o fose
  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  //campos a encher dos formularios
  public heroForm = new FormGroup({
    id: new FormControl<String>(''),
    superhero: new FormControl<String>('',{nonNullable:true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<String>(''),
    first_appearance: new FormControl<String>(''),
    characters: new FormControl<String>(''),
    alt_img: new FormControl<String>(''),}
  );

  public publishers = [
    {id: 'DC Comics', desc:'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  onSubmit():void{
    //vemos o resultado do formulario por consola
    //console.log({formIsValid: this.heroForm.valid, value: this.heroForm.value,})
    if ( this.heroForm.invalid ) return;
    //calquer Observable non se dispara senon estamos SUSCRITOS
    if ( this.currentHero.id ){
      this.heroesService.updateHero(this.currentHero)
      //mostrar snackbar
      .subscribe( hero => { this.showSnackbar(`${hero.superhero} updated!`) } );
      return;
    }
    this.heroesService.addHero( this.currentHero)
    //mostrar snackbar + navegar a /heroes/edit/+hero.id
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id ])
        this.showSnackbar(`${hero.superhero} created!`) } )
  }

  showSnackbar(message:string):void{
    this.snackbar.open(message, 'done', {
      duration:2500
    } )
  }

  onDeleteHero(){

    if( !this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });
  //se result = false -> non pasa nada
  //se result -> true (cando se da ó boton de OK): borrar+sacar da paxina
  //filter-> so deixa que pase o valor se e true, e disparamos o observable
    dialogRef.afterClosed()
    .pipe(
      filter((result:boolean) => result === true),
      switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id)),
      filter((wasDeleted:boolean) => wasDeleted),
    )
    .subscribe(result => {
      this.router.navigate(['/heroes']);
    });
    //outra fomra, pero cun subscribe dentro doutro
    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;
    //   this.heroesService.deleteHeroById(this.currentHero.id)
    //   .subscribe(
    //     wasDeleted => {
    //       if(wasDeleted){
    //         this.router.navigate(['/heroes']);
    //       }} )
    //   ;
    // })



  }
}
