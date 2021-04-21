package io.github.rmenna.clientes.rest;

import io.github.rmenna.clientes.model.entity.Cliente;
import io.github.rmenna.clientes.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


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

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Cliente acharPorId( @PathVariable Integer id) {
        return clienteRepository.findById(id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar( @PathVariable Integer id ) {
        clienteRepository.findById(id)
                .map( cliente -> {
                    clienteRepository.delete(cliente);
                    return Void.TYPE;
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar( @PathVariable Integer id, @RequestBody Cliente clienteAtualizado) {
        clienteRepository.findById(id)
                .map( cliente -> {
                    clienteAtualizado.setId(cliente.getId());
                    return clienteRepository.save(clienteAtualizado);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
