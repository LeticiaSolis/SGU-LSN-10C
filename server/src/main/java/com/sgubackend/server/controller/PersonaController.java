package com.sgubackend.server.controller;

import com.sgubackend.server.model.Persona;
import com.sgubackend.server.service.PersonaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/personas")
public class PersonaController {
    private final PersonaService service;

    public PersonaController(PersonaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Persona> listar() {
        return service.listar();
    }

    @PostMapping
    public Persona guardar(@RequestBody Persona persona) {
        return service.guardar(persona);
    }

    @PutMapping("/{id}")
    public Persona actualizar(@PathVariable Long id, @RequestBody Persona persona) {
        persona.setId(id);
        return service.guardar(persona);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
