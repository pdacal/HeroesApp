import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';



@NgModule({
  declarations: [
    Error404PageComponent
  ],

  //ruta por defecto no app-routing module
  exports:[
    Error404PageComponent
  ]
})
export class SharedModule { }
