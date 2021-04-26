import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule } from '@angular/forms';
import { ClientesService } from './Service/clientes.service';
import { ClientesListComponent } from './clientes-list/clientes-list.component';


@NgModule({
  declarations: [
    ClientesFormComponent,
    ClientesListComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule
  ],
})
export class ClientesModule { }
