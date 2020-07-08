document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

//llamado a Ajax e impirmir resultados
function cargarNombres(e){
    e.preventDefault();

    //leer las variables

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;


    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'https://randomuser.me/api/?'

    //si hay origen agregarlo a la URL
    if(origenSeleccionado!== ''){
        url += `nat=${origenSeleccionado}&`;
    }
    //si hay genero agregarlo a la URL
    if(generoSeleccionado!== ''){
        url += `gender=${generoSeleccionado}&`;
    }
    if(cantidad!== ''){
        url += `results=${cantidad}&`;
    }
    url += `inc=name,gender,nat&noinfo`;
    
    //conectar con ajax
    //iniciar XMLTTPRequest
    const xhr = new XMLHttpRequest();
    // abrimos la conexion
    xhr.open('GET', url, true);
    //datos e impresion del template
    xhr.onload = function(){
        if (this.status ===200) {
            const nombres = JSON.parse(this.responseText);
            //acceder al arreglo donde viene la informacion
            const info = nombres.results;
            //generar el HTML
            let htmlNombres = '<h2>Nombres Generados</h2>';
            htmlNombres += '<ul class="lista">';
            //imprimir cada nombre
            info.forEach(function (nombre) {
                htmlNombres += `
                          <li>${nombre.name.first}</li>
                      `;
              });
            
            htmlNombres += '</ul>';
            
            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    xhr.send();
}
