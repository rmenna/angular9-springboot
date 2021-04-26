import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../Model/cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor( 
    private router: Router,
    private clienteService: ClientesService
    ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe( response => {
      this.clientes = response;
    })
  }

  novoCadastro(){
    this.router.navigate(['/clientes-form'])
  }

}
