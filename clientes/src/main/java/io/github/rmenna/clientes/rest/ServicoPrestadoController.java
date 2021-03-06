package io.github.rmenna.clientes.rest;

import io.github.rmenna.clientes.model.entity.Cliente;
import io.github.rmenna.clientes.model.entity.ServicoPrestado;
import io.github.rmenna.clientes.repository.ClienteRepository;
import io.github.rmenna.clientes.repository.Servi├žoPrestadoRepository;
import io.github.rmenna.clientes.rest.dto.ServicoPrestadoDTO;
import io.github.rmenna.clientes.util.BigDecimalConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@RequestMapping("/api/servicos-prestados")
@RequiredArgsConstructor
public class ServicoPrestadoController {

    private final ClienteRepository clienteRepository;
    private final Servi├žoPrestadoRepository servi├žoPrestadoRepository;
    private final BigDecimalConverter  bigDecimalConverter;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado salvar(@RequestBody @Valid ServicoPrestadoDTO dto) {
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyy"));
        Integer idCliente = dto.getIdCliente();
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente Inexistente"));

        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setData(data);
        servicoPrestado.setCliente(cliente);
        servicoPrestado.setValor( bigDecimalConverter.converter(dto.getPreco()) );
        return  servi├žoPrestadoRepository.save(servicoPrestado);
    }

    @GetMapping
    public List<ServicoPrestado> pequisar(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @RequestParam(value = "mes", required = false) Integer mes ) {
        return servi├žoPrestadoRepository.findByNomeClienteAndMes("%"+ nome + "%", mes);
    }
}
