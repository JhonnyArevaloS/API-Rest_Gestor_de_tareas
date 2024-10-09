package com.example.demo.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelo.Tarea;

@Repository
public interface TareaRepositorio extends JpaRepository <Tarea, Integer> {}
