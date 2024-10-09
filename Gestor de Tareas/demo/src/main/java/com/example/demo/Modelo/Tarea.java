package com.example.demo.Modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Tarea")
@Getter
@Setter
public class Tarea {


    @Id
    @GeneratedValue(strategy=  GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Titulo", nullable = false, length = 50)
    private String titulo;

    @Column(name = "Actividad", nullable = false, length = 800)
    private String actividad;

    @Column(name = "Finalizada")
    private boolean finalizada;

    public Tarea() {
    }

    public Tarea(String titulo, String actividad, boolean finalizada) {
        this.titulo = titulo;
        this.actividad = actividad;
        this.finalizada = finalizada;
    }

    @Override
    public String toString() {
        return "Tarea [id=" + id + ", titulo=" + titulo + ", actividad=" + actividad + ", finalizada=" + finalizada
                + "]";
    }

    

}
