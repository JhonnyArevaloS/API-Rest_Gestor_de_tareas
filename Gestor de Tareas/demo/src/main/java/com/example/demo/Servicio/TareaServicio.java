package com.example.demo.Servicio;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelo.Tarea;
import com.example.demo.Repositorio.TareaRepositorio;
import com.example.demo.tareaDTO.TareaEstadoDTO;

@Service
public class TareaServicio {

@Autowired
    private TareaRepositorio tareaRepositorio;
    
    public List<Tarea> mostrarTareas(){
        return tareaRepositorio.findAll();
    }

    public Tarea mostrarTareasPorId(Integer id){
        return tareaRepositorio.findById(id).get();

    }

    public Tarea crearTarea(Tarea tarea){
        return tareaRepositorio.save(tarea);
    }

    public Tarea actualizarEstadoTarea(Integer id, TareaEstadoDTO estadoDTO){
        Tarea tarea = tareaRepositorio.findById(id).get();
        tarea.setFinalizada(estadoDTO.isFinalizada());
        return tareaRepositorio.save(tarea);
        
    }
    

    public Tarea editarTarea(Integer id, Tarea datosTarea){
        Tarea tarea = tareaRepositorio.findById(id).get();
        tarea.setTitulo(datosTarea.getTitulo());
        tarea.setActividad(datosTarea.getActividad());
        return tareaRepositorio.save(tarea);
    }

    public void eliminarTarea(Integer id){
        tareaRepositorio.deleteById(id);

    }

}
