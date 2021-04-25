import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  sucesso: Boolean = false;
  erros: String[];

  constructor(private clienteService: ClientesService) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.clienteService.salvar(this.cliente).subscribe(
      response => {
        this.sucesso = true;
        this.erros = null;
        this.cliente = response;
      }, errorResponse => {
        this.sucesso = false;
        this.erros = errorResponse.error.errors;
      }
    )
    
  }
}
