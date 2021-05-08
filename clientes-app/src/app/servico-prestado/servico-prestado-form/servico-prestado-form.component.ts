import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/Model/cliente';
import { ClientesService } from 'src/app/clientes/Service/clientes.service';
import { ServicoPrestado } from '../model/ServicoPrestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;

  constructor(
    private clienteService: ClientesService,
    ) {
      this.servicoPrestado = new ServicoPrestado();
    }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe( 
      response => this.clientes= response
    )
  }

  onSubmit(){
    console.log(this.servicoPrestado);
    
  }
}
