import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/clientes/Service/clientes.service';
import { Cliente } from '../Model/cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  sucesso: Boolean = false;
  erros: String[];
  id: number;


  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private activatedRouter: ActivatedRoute
    ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRouter.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if ( this.id ) {
        this.clienteService.getClienteById(this.id).subscribe( response => {
          this.cliente = response;
        }, 
        errorResponse => {
          this.cliente = new Cliente();
        })
      }
    })
  }

  onSubmit() {
    if ( this.cliente.id ) {
      this.clienteService.atualizar(this.cliente).subscribe(
        response => {
          this.sucesso = true;
          this.erros = null;
        },
        errorResponse => {
          this.erros = ['Erro ao atualizar o cliente'];
        }
      )
    } else {
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

  voltarParaListagem() {
    this.router.navigate(['/clientes-list'])
  }
}
