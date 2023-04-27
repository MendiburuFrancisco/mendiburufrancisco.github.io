// import { new_proyect } from "card.js";
// impporto proyectos.json
// const proyects = require('./proyectos.json');
// import courses from './cursos.json' assert { type: 'json' };


const cards = {
    1: {
        title: 'Ferretería',
        description: 'Página web que permite realizar pedidos y gestionar productos',
        img: 'assets/img/proyects/ferreteria/thumbnail -browser-mockup-home.png',
        link: 'html\\proyectos\\Ferreteria.html',
        state : 'completed',
        tag : 'Web HTML CSS JS PHP MySQL Laravel'
    },
    2: {
        title: 'Consultoría médica',
        description: 'Gestión de pacientes y médicos para una consultora, utilizando POO',
        img: 'assets/img/proyects/consultorio/thumbnail-screen-consultas.png',
        link: 'html\\proyectos\\Consultora.html',
        state : 'completed',
        tag : '.NET SQL'
    },
    3: {
        title: 'Safetypet',
        description: 'Caso de estudio y diseño de una aplicación para el correcto cuidado de las mascotas',
        img: 'assets/img/proyects/safetypet/thumbnail-mobile-home-blog.png',
        link: 'https://docs.google.com/presentation/d/1s7Bbo57TgcvFjsMxGvzXWNUefv0JNVXh6oznQMccfU4/edit?usp=sharing',
        state : 'completed',
        tag : 'UX/UI'
    },
    4: {
        title: 'Autogestión alumnos',
        description: 'Programa y página web que permite gestionar de forma completa información relacionada al ámbito facultativo/universitario',
        img: 'assets/img/proyects/autogestion_alumnos/Net-framework.png',
        link: '',
        sate: 'in-progress',
        tag : 'Web .NET HTML CSS   SQL'
    } 
    

}

function agregarProyectos(){
    "Tomo el elemento con el id cartas y le inserto el html de la carta"
    var contenedor_proyectos = document.getElementById("tarjetas_proyectos");

    
    // recorro cards y los agrego al contendor_proyectos
    for (const key in cards) {
        proyect = new_proyect(cards[key])
        contenedor_proyectos.appendChild(proyect)
  
    } 

}

function agregarFiltros(){
    // Agrego los botones de filtro
    tags = []
    for (const key in cards) {
        tagsInCard = cards[key].tag.split(" ")

        tagsInCard.forEach(tag => {
            if(tags.includes(tag.trim()) == false && tag.trim() != ""){
                tags.push(tag)

            }
        });
        // tags.push()
    }
    var contenedor_filtros = document.getElementById("proyects-tags");
    tags = [...new Set(tags)]
    tags.forEach(tag => {
        contenedor_filtros.innerHTML += `<button class="btn btn-theme-outline tag" data-filter="${tag}">${tag}</button>`
        
    }
    )
}   

function agregarFiltroPorProyecto(){
    // Obtener los elementos HTML y botones necesarios
    const items = document.querySelectorAll('.card-full-link');
    const buttons = document.querySelectorAll('button.btn.btn-theme-outline.tag');
    const container = document.getElementById('tarjetas_proyectos');

    // Agregar eventos de clic a los botones
    buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtener la categoría del botón
        const category = button.dataset.filter;
        
        // Filtrar los elementos que coinciden con la categoría
        const filteredItems = Array.from(items).filter(item => 
            {
            console.log("Category",category)
        
            // Obtener las categorías del elemento
            const itemCategories = item.dataset.filter.split(' ');
            // console.log(itemCategories)
            // Verificar si la categoría del botón coincide con alguna de las categorías del elemento
            const isIncluded =  itemCategories.includes(category)

            return  isIncluded || category == '*';
            });
        
        // Limpiar el contenedor y agregar los elementos filtrados
        container.innerHTML = '';
        filteredItems.forEach(item => {
            container.appendChild(item);
        });
    });
    });
}
 
function new_proyect(card){
    // Crea el elemento <a> con clase "card-full-link" y atributo href a partir de la propiedad "link" del objeto "card"
    var cardLink = document.createElement("a");
    cardLink.classList.add("card-full-link");
    cardLink.setAttribute("href", card.link);
    cardLink.setAttribute("data-filter", card.tag);


    new_card = ` 
        <div class="card card-completed mx-3 my-2" style="width: 18rem; min-height: 24rem;">
            <img src="${card.img}" class="card-img-top" alt="...">
            <div class="card-body card-body-color">
            <h5 class="card-title" style="color: white;">${card.title}</h5>
            <p class="card-text" style="color:white;">${card.description}</p>
        </div>
 `
    cardLink.innerHTML = new_card
    

    return cardLink;
}



function new_course(course)
{
    var div = document.createElement("div");
    div.classList.add("row");
    div.classList.add("my-3");
    
    if (course.fecha_fin != "null"){
      col = `
      <div class="col-1">
        <div style="margin-top:15px; background-color:gray; border-radius: 100%; width: 20px; height: 20px;"></div>
        <div style=" margin:9px; background-color:gray; width: 2px; height:80%"><br /><br /> </div>
      </div>
      `
    } 
    else{
        col = `
        <div class="col-1">
            <div style="margin-top:15px; 
                     background-color: var(--theme-red); 
                     border-radius: 100%; 
                     width: 20px; height: 20px;">
            </div>

            <div style=" margin:9px; background-color: var(--theme-red); width: 2px; height: 87%;"></div>
          </div>
        `
    } 
    newCourse = `
    <div class="col">
        <div class="card" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">${course.curso}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${course.fecha_inicio} — ${course.fecha_fin == "null" ? '<strong style="color: var(--theme-second-red);"> en curso</strong>': course.fecha_fin}</h6>
            <p class="card-text">${course.empresa}</p>
            ${course.stack? '<p class="card-text">Stack: '+ course.stack + '</p>': ''}
        </div>
        </div>
    </div>
`   
    div.innerHTML += col;
    div.innerHTML += newCourse;

    return div;


}

function agregarCursos(){
    let courses = []
    fetch('/assets/js/cursos.json')
    .then(response => response.json())
    .then(data => {
        // aquí procesas los datos del archivo JSON
        // console.log(data);
        courses = data;
        // recorro courses y los agrego a card-courses
        for (const key in courses) {
            console.log(courses[key])
            course = new_course(courses[key])
            document.getElementById("card-courses").appendChild(course)

                }        // )
    })
    .catch(error => {
    // aquí manejas cualquier error que pueda ocurrir
    console.error(error);
    });


}


document.addEventListener("DOMContentLoaded", function(event) {
    
    agregarProyectos();
    agregarFiltros();
    agregarFiltroPorProyecto();
    agregarCursos();

  });


