package io.github.rmenna.clientes.rest;

import io.github.rmenna.clientes.model.entity.Cliente;
import io.github.rmenna.clientes.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente salvar( @RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }
}
