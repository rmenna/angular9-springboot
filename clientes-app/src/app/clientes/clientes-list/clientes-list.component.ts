import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    private http: HttpClient,
    private clienteService: ClientesService
    ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe( response => {
      this.clientes = response;
    })
  }

}
