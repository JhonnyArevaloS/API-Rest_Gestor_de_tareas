package com.example.demo.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.demo.Modelo.Tarea;
import com.example.demo.Servicio.TareaServicio;
import com.example.demo.tareaDTO.TareaEstadoDTO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/Inicio")
public class TareaControlador {


    @Autowired
    TareaServicio tareaServicio;

    @GetMapping
    public List<Tarea> mostrarListaDeTareas() {
        return tareaServicio.mostrarTareas();
    }

    @GetMapping("/Tarea/{id}")
    public Tarea mostrarTareasPorId(@PathVariable Integer id) {
        return tareaServicio.mostrarTareasPorId(id);
    }

    @PostMapping("/Nueva_Tarea")
    public Tarea crearTarea(@RequestBody Tarea tarea) {
        return tareaServicio.crearTarea(tarea);
    }

    @PutMapping("/Tarea/{id}/Estado")
     public Tarea actualizarEstadoTarea(@PathVariable Integer id, @RequestBody TareaEstadoDTO estadoDTO){
        return tareaServicio.actualizarEstadoTarea(id, estadoDTO);
     }
    

    @PutMapping("/Tarea/{id}")
    public Tarea actulizarTarea(@PathVariable Integer id, @RequestBody Tarea tarea) {
        return tareaServicio.editarTarea(id, tarea);
    }

    @DeleteMapping("/Tarea/{id}")
    public void eliminarTarea(@PathVariable Integer id){
        tareaServicio.eliminarTarea(id);
    }
  
}
