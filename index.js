let images = ['fotos/1.jpg', 'fotos/2.jpg', 'fotos/3.jpg', 'fotos/4.jpg', 'fotos/5.jpg', 'fotos/6.jpg']
let slider= document.getElementById('slider-js') //el <div> que contiene las imagenes en trenecito
let sliderContainer = document.getElementById ('slider-container')// el <div> que contiene al  slider y al slider-navigation

//Determinemos el ancho del tren de imágenes, el cual depende del número de imágenes
slider.style.width = images.length*100+"%"

//"slider-navigation" es el <div> que contiene los botoncitos de navegación
sliderNav = document.getElementById('slider__navigation')

let active=true //Dorian llama 'active' al evento de que el slider se mueva de forma automática


//Cargar las imágenes en el trenecito y poner los botoncitos de navegación
//dentro del sliderNav 
for (let pictures in images)
    {   //Para cargar las imágenes
        slider.innerHTML += `<img src="${images[pictures]}" class='slider__img' style="width: ${100/images.length}%">`
        
        //Cargar los botoncitos de navegación. Nota si se carga el primer botón (el cual tiene el índice 0 debemos agregarle la clase "slider-nav--active")
         sliderNav.innerHTML += `<span class="${pictures == 0 ? 'slider-nav slider-nav--active': 'slider-nav'}" id="slider-nav-${pictures}">`
    }

//Evento para saber si el mouse está sobre el slider
sliderContainer.addEventListener('mouseover', ()=>{
    if (active) active=false
})

sliderContainer.addEventListener('mouseout', ()=>{
    if (!active) active=true

})

//Ahora vamos a mover las imagenes, desplazarlas 

let counter= ()=>{
    if (active)
    {
        cont++ //Iniciamos con el cont++ porque desde que se cargó la página ya está disponible la primera imagen
        if (cont>=images.length) cont = 0
        setInterval (slideImage (cont), 2000) //Para desplazar la imagen
        setInterval (setActive (cont), 2000)  //para agregar la clase "slider-nav--active" en el botón cuya imagen se está mostrando 
    }  
}

let cont=0
const startInterval = () =>{
    setInterval (counter, 2000)
}

startInterval() //Para iniciar el contador



const slideImage = (id) => {
    if (!active) //si el active es falso no necesitamos desplazar las imagenes automaticamente
      {
          cont = id
          setActive (id)
      }
    slider.style.left= "-"+id+"00%"
}

//obtenemos en un arreglo a los elementos que tienen la clase 'slider-nav', i.e. los botoncitos 
let navIcon = [...document.getElementsByClassName('slider-nav')] 

//Haremos que los botoncitos resalten cuando les toque estar activos
const setActive = (id)=> {
    for (let icon in navIcon)
        {
            if (icon < navIcon.length)
            {
                if (navIcon[icon].id === "slider-nav-"+id)
                    document.getElementById (navIcon[icon].id).classList.add('slider-nav--active')
                else document.getElementById (navIcon[icon].id).classList.remove('slider-nav--active')
            }
        }
}

//Evento al pulsar en los botones de navegación
sliderNav.addEventListener ('click', (e)=>{
    slideImage (e.target.id.slice(-1))
})