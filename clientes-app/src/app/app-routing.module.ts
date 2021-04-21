import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesModule } from './clientes/clientes.module';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
