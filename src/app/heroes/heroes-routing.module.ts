import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';


//localhost:4200/heroes -> ruta pai, agora definimos as rutas fillas
//este componhente pai esta metido en app-routing.module
//estas rutas fdillas carganse en app-routing.module, dentro da ruta pai, con loadChildren(lazyLoad)
const routes: Routes = [
  {
  path:'',
  component: LayoutPageComponent,
  children: [
    { path:'new-hero', component: NewPageComponent },
    { path:'search', component: SearchPageComponent },
    { path:'edit/:id', component: NewPageComponent },
    { path:'list', component: ListPageComponent },
    //comodin, debe estar de ultima, senon entrarian todas as rutas eiqui
    { path:':id', component: HeroPageComponent },
    //localhost:4200/heroes/id
    //calquera ruta ,al escrita que me redirixa eiqui->
    { path:'**', redirectTo:'list' },
]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
