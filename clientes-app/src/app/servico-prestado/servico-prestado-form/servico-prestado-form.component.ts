import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/Model/cliente';
import { ClientesService } from 'src/app/clientes/Service/clientes.service';
import { ServicoPrestado } from '../model/ServicoPrestado';
import { ServicoPrestadoService } from '../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  sucesso: Boolean = false;
  erros: String[];

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
    ) {
      this.servicoPrestado = new ServicoPrestado();
    }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe( 
      response => this.clientes= response
    )
  }

  onSubmit(){
    this.servicoPrestadoService.salvar(this.servicoPrestado).subscribe(
      response => {
        this.sucesso = true;
        this.erros = null;
        this.servicoPrestado = new ServicoPrestado();
      }, errorResponse => {
        this.sucesso = false;
        this.erros = errorResponse.error.errors;
      }
    )
  }
}
