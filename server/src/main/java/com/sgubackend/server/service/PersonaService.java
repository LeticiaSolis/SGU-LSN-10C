package com.sgubackend.server.service;

import com.sgubackend.server.model.Persona;
import com.sgubackend.server.repository.PersonaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService {
    private final PersonaRepository repo;

    public PersonaService(PersonaRepository repo) {
        this.repo = repo;
    }

    public List<Persona> listar() {
        return repo.findAll();
    }

    public Persona guardar(Persona persona) {
        return repo.save(persona);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
