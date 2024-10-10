//Creamos las variables que almacenaran la url y el cuerpo de la tabla que mostrara las tareas

const url = "/Inicio";
const tablaDeTareas = document.getElementById("bodyTable");
let resultado='';

//Creamos la funcion que traera las tareas y creara la tabla
const mostrarTareas = (data) =>{
    let resultado = '';

    data.forEach(tarea => {

        const claseFinalizada = tarea.finalizada ? 'finalizada' : 'No-finalizada';

        resultado += `<tr>
                    <td class="${claseFinalizada}">${tarea.id}</td>
                    <td class="${claseFinalizada}">${tarea.titulo}</td>
                    <td class="${claseFinalizada}">${tarea.actividad}</td>
                    <td class="columnaCheck">
                        <div class="form-check form-switch" style="display: grid; justify-items: center;">
                            <input class="tareaInterruptor form-check-input" type="checkbox" ${tarea.finalizada ? 'checked' : ''}>
                        </div>
                    </td>
                    <td>
                        <button type="button"  class="btn-editar btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
                        <button type="button"  class="btn-eliminar btn btn-danger ">Eliminar</button>
                    </td>
                </tr>`
    });

    tablaDeTareas.innerHTML = resultado
}

//llamamos la url con fech y utilizamos la funcion que creamos arriba ^
   
    fetch(url)
    .then(response => response.json())
    .then(data => mostrarTareas(data))
    .catch(error => document.write(error))

//Creamos una funcion para determinar que estamos tocando en el front y para guiarnos al momento de presionar los botones

const on = (element, Event, selector, handler)=>{
    element.addEventListener(Event, e =>{
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}



//Interruptor actualizar estado al momento de presionarlo
on(document, 'click', '.tareaInterruptor', e=> {
    const fila = e.target.parentNode.parentNode.parentNode;
    let id = fila.children[0].innerHTML;
    const titulo= fila.children[1];
    const actividad= fila.children[2];
    const checkbox = e.target;
    const estadoTarea= checkbox.checked;
    
    fetch(`${url}/Tarea/${id}/Estado`,
        {
            method: 'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({finalizada: estadoTarea})
        })
        .then(response=> response)
        .then(()=>console.log("Todo salio muy bien :)"))
        .catch(error=> console.error('Error:', error))

    id = fila.children[0];

        if (estadoTarea) {
            id.style.textDecoration = 'line-through';
            titulo.style.textDecoration = 'line-through';
            actividad.style.textDecoration = 'line-through';
            id.style.fontStyle = 'italic';
            titulo.style.fontStyle = 'italic';
            actividad.style.fontStyle = 'italic';

        } else{
            id.style.textDecoration = 'none';
            titulo.style.textDecoration = 'none';
            actividad.style.textDecoration = 'none';
            id.style.fontStyle = 'normal';
            titulo.style.fontStyle = 'normal';
            actividad.style.fontStyle = 'normal';

        }
        
})

  
    
//Le damos funcion al boton crear Tarea

const crearTarea=()=>{
    const titulo = document.getElementById('titulo').value
    const actividad = document.getElementById('actividad').value
    const tarea = {
            titulo: titulo,
            actividad: actividad
        }   
   fetch(`${url}/Nueva_Tarea`,
    {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(tarea)
    }
   )
   .then(response => response)
    .then(()=>location.reload())

}





//Utilizamos la funcion y le pasamoslos parametros como el documento en el que estamos, el evento que utilizaremos eñl selector del objeto html y el handler que es lo que se hara despues de eso

on(document, 'click', '.btn-eliminar', e =>{
    

    Swal.fire({
        title: "Deseas eliminar esta tarea!?",
        text: "Ya no podras recuperarla!!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, deseo eliminarla!"
        
      })
      .then((result) => {
        if (result.isConfirmed) {
            const fila = e.target.parentNode.parentNode;
            const id = fila.firstElementChild.innerHTML
             fetch(`${url}/Tarea/${id}`, 
                {
                    method: 'DELETE'
                })
                .then(response => response)
                .then(()=>location.reload())
            }
        
      });
})

// boton editar

on(document, 'click', '.btn-editar', e =>{
    const fila = e.target.parentNode.parentNode;
    const id = fila.children[0].innerHTML
    const tituloViejo = document.getElementById('tituloViejo')
    const actividadVieja = document.getElementById('actividadVieja')

    const rellenarCampos =(data) =>{
        const titulo = data.titulo;
        const actividad = data.actividad;
        tituloViejo.value= titulo;
        actividadVieja.innerHTML = actividad;
    }
    
    fetch(`${url}/Tarea/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => rellenarCampos(data))

    const btnActualizar = document.getElementById("btn-Actualizar")
    btnActualizar.addEventListener('click', function(){
        const datosActualizados ={
            titulo: tituloViejo.value,
            actividad: actividadVieja.value
        }
        fetch(`${url}/Tarea/${id}`, 
                {
                    method: "PUT",
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(datosActualizados)
                }
            )
        .then(response => response)
        .then(()=> location.reload())
    })

})






