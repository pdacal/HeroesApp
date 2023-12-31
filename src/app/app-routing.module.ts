import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesModule } from './heroes/heroes.module';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { canActivateGuardPublic, canMatchGuardPublic } from './auth/guards/public.guard';

//loadChildren carga perezosa, lazyLoad,
//asi carga as paxinas fillas desos componentes sen ter que definilas eiqui
//estas paxinas fillas deben estar cargas no heroes-routing.module
const routes: Routes = [
  {
    path: 'auth',//ruta pai
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),//rutas fillas
    canActivate: [canMatchGuardPublic],
    canMatch: [canActivateGuardPublic],
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [canActivateGuard], //Anclamos la función del canActive
    canMatch: [canMatchGuard], //Anclamos la función del canMatch
  },
  {
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'heroes',
    pathMatch: 'full' //necesario porque senon pasan todas as rutas por eiqui
  },
  {
    path:'**',
    redirectTo:'404'
  }

  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
