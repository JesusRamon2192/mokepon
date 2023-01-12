//Function start
const botonSeleccionarMascota = document.getElementById("seleccionar")
 
const botonReiniciar = document.getElementById("botonReset")
const sectionAtaque=document.getElementById('seleccionarAtaque')
const sectionNotificacionFinal=document.getElementById('reset')
 
//Function crear mensaje
const seccionMensajes=document.getElementById("resultado")
const seccionResultado=document.getElementById("victorias")
const seccionAtaqueJugador=document.getElementById("ataqueJugador")
const seccionAtaqueEnemigo=document.getElementById("ataqueEnemigo")
const seccionDibujo=document.getElementById("dibujo")
 
//Function combate
const spanVidaJugador=document.getElementById("spanVidasJugador")
const spanVidaEnemigo=document.getElementById("spanVidasEnemigo")
 
//Seleccionar mascota
const sectionSeleccionarMascota=document.getElementById("seleccionarMascota")
const spanMascotaJugador=document.getElementById("mascotaJugador")
 
//Seleccionar mascota enemigo
const spanMascotaEnemigo=document.getElementById("mascotaEnemigo")
const contenedorTarjetas=document.getElementById("contenedorTarjetas")
const contenedorAtaques=document.getElementById("contenedorAtaques")
 
//Canvas
const sectionVerMapa=document.getElementById("verMapa")
const mapa=document.getElementById("mapa")
let lienzo=mapa.getContext("2d")
const controls=document.querySelectorAll(".botonControl")
 
let mokepones = []
let ataqueJugador =[]
let ataqueVarEnemigo = []
let mascotaJugador
let opcionDeMokepones
let opcionDeAtaques
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataquesMokeponEnemigo
let botonAtaqueFuego
let botonAtaqueAgua
let botonAtaqueTierra
let botonAtaqueVeneno
let botonAtaquePinzas
let botonAtaqueVuelo
let inputhipodoge
let inputcapipepo
let inputratigueya
let inputlangostelvis
let inputtucapalma
let inputpydos
let tipoMascotaJugador
let tipoMascotaEnemigo
let ataques 
let victoriasJugador = 0
let victoriasEnemigo = 0
let intervalo
let ataqueEnemigoObjeto=[]
let enemigoColisionObjeto = []
let mascotaJugadorObjeto = []
let mapaBackground = new Image()
mapaBackground.src = "https://drive.google.com/uc?export=view&id=1fFgiaLX8ipvhTpPNcx7L6Afy9JUHuIZ-"
let alturaDeseada 
const anchoMaximoMapa = 350
let anchoMapa = window.innerWidth - 20
 
 
class Mokepon{
    constructor (n, f, v, t, fotoMapa){
        this.nombre=n
        this.foto=f
        this.vida=v
        this.ataques=[]
        this.tipo=t
        this.ancho= 40
        this.alto= 40
        this.x= aleatorio(40, mapa.width - this.ancho)
        this.y= aleatorio(40, mapa.height + this.alto)
        this.mapaFoto= new Image()
        this.mapaFoto.src= fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
 
    pintarMokepon (){
        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y, 
            this.ancho, 
            this.alto
        )
    }
}
 
let hipodoge=new Mokepon("Hipodoge", "https://drive.google.com/uc?export=view&id=1pXKP0Az541sw2Nxk-BoDg-cSddIRkyVF&rl", 5, "AGUA", "https://drive.google.com/uc?export=view&id=1PwQIJsF6gkDkODBVgyRQB-KgXiY0imfX")
let capipepo=new Mokepon("Capipepo", "https://drive.google.com/uc?export=view&id=1_783SjjS2vBj1whiapCFhVs3EfXFyh7M&rl", 5, "TIERRA", "https://drive.google.com/uc?export=view&id=16wOL3nZDVb1E-Vd4fv7YOrJzHa0hSsFq")
let ratigueya=new Mokepon("Ratigueya", "https://drive.google.com/uc?export=view&id=1WlZ11Sko7wxJYs0R7h0PTK4u9QmEsMVB&rl", 5, "FUEGO", "https://drive.google.com/uc?export=view&id=1rFye6Avv8oAcN73TAUu3JSuotzjakqKJ")
let langostelvis= new Mokepon("Langostelvis", "https://drive.google.com/uc?export=view&id=1UZHT-DVx1cR_WwR2HEx6XO7VKMdlwuGp", 5, "AGUA", "https://drive.google.com/uc?export=view&id=1UZHT-DVx1cR_WwR2HEx6XO7VKMdlwuGp" )
let tucapalma=new Mokepon("Tucapalma", "https://drive.google.com/uc?export=view&id=1nlbdZ5G4mL0oHbEtPKN19EaDfpMY85sR", 5, "AIRE", "https://drive.google.com/uc?export=view&id=1nlbdZ5G4mL0oHbEtPKN19EaDfpMY85sR")
let pydos=new Mokepon("Pydos", "https://drive.google.com/uc?export=view&id=1-O5jY7NCmaJ4PufLp2esFgNV_6lQjZ0g", 5, "VENENO", "https://drive.google.com/uc?export=view&id=1-O5jY7NCmaJ4PufLp2esFgNV_6lQjZ0g")
 
let hipodogeEnemigo=new Mokepon("Hipodoge", "https://drive.google.com/uc?export=view&id=1pXKP0Az541sw2Nxk-BoDg-cSddIRkyVF&rl", 5, "AGUA", "https://drive.google.com/uc?export=view&id=1PwQIJsF6gkDkODBVgyRQB-KgXiY0imfX", aleatorio(20, 710), aleatorio(20, 500))
let capipepoEnemigo=new Mokepon("Capipepo", "https://drive.google.com/uc?export=view&id=1_783SjjS2vBj1whiapCFhVs3EfXFyh7M&rl", 5, "TIERRA", "https://drive.google.com/uc?export=view&id=16wOL3nZDVb1E-Vd4fv7YOrJzHa0hSsFq", aleatorio(20, 710), aleatorio(20, 500))
let ratigueyaEnemigo=new Mokepon("Ratigueya", "https://drive.google.com/uc?export=view&id=1WlZ11Sko7wxJYs0R7h0PTK4u9QmEsMVB&rl", 5, "FUEGO", "https://drive.google.com/uc?export=view&id=1rFye6Avv8oAcN73TAUu3JSuotzjakqKJ", aleatorio(20, 710), aleatorio(20, 500))
let langostelvisEnemigo= new Mokepon("Langostelvis", "https://drive.google.com/uc?export=view&id=1UZHT-DVx1cR_WwR2HEx6XO7VKMdlwuGp", 5, "AGUA", "https://drive.google.com/uc?export=view&id=1UZHT-DVx1cR_WwR2HEx6XO7VKMdlwuGp", aleatorio(20, 710), aleatorio(20, 500) )
let tucapalmaEnemigo=new Mokepon("Tucapalma", "https://drive.google.com/uc?export=view&id=1nlbdZ5G4mL0oHbEtPKN19EaDfpMY85sR", 5, "AIRE", "https://drive.google.com/uc?export=view&id=1nlbdZ5G4mL0oHbEtPKN19EaDfpMY85sR", aleatorio(20, 710), aleatorio(20, 500))
let pydosEnemigo=new Mokepon("Pydos", "https://drive.google.com/uc?export=view&id=1-O5jY7NCmaJ4PufLp2esFgNV_6lQjZ0g", 5, "VENENO", "https://drive.google.com/uc?export=view&id=1-O5jY7NCmaJ4PufLp2esFgNV_6lQjZ0g", aleatorio(20, 710), aleatorio(20, 500))
 
 
hipodoge.ataques.push(
    {nombre:"💧", id:"botonAgua"},
    {nombre:"💧", id:"botonAgua"},
    {nombre:"💧", id:"botonAgua"},
    {nombre:"🔥", id:"botonFuego"},
    {nombre:"🌱", id:"botonTierra"},
)
 
capipepo.ataques.push(
    {nombre:"🌱", id:"botonTierra"},
    {nombre:"🌱", id:"botonTierra"},
    {nombre:"🌱", id:"botonTierra"},
    {nombre:"💧", id:"botonAgua"},
    {nombre:"🔥", id:"botonFuego"},
)
 
ratigueya.ataques.push(
    {nombre:"🔥", id:"botonFuego"},
    {nombre:"🔥", id:"botonFuego"},
    {nombre:"🔥", id:"botonFuego"},
    {nombre:"🌱", id:"botonTierra"},
    {nombre:"💧", id:"botonAgua"},
)
pydos.ataques.push(
    {nombre:"🦂", id:"botonVeneno"},
    {nombre:"🦂", id:"botonVeneno"},
    {nombre:"🦂", id:"botonVeneno"},
    {nombre:"💧", id:"botonAgua"},
    {nombre:"🌱", id:"botonTierra"},
)
 
tucapalma.ataques.push(
    {nombre:"🦅", id:"botonGolpeVolador"},
    {nombre:"🦅", id:"botonGolpeVolador"},
    {nombre:"🦅", id:"botonGolpeVolador"},
    {nombre:"💧", id:"botonAgua"},
    {nombre:"🌱", id:"botonTierra"},
)
 
langostelvis.ataques.push(
    {nombre:"🦞", id:"botonPinzas"},
    {nombre:"🦞", id:"botonPinzas"},
    {nombre:"🦞", id:"botonPinzas"},
    {nombre:"🔥", id:"botonFuego"},
    {nombre:"💧", id:"botonAgua"},
)
mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)
 
window.addEventListener("load", start)
 
function start(){
    sectionAtaque.style.display='none'
    sectionNotificacionFinal.style.display='none'
    sectionVerMapa.style.display="none"
 
    mokepones.forEach((Mokepon) => {
        opcionDeMokepones=
        `<input type="radio" name="mascota" id=${Mokepon.nombre} />
        <label class="tarjetaMascota" for=${Mokepon.nombre}>
          <p>${Mokepon.nombre}</p>
          <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>`
        contenedorTarjetas.innerHTML += opcionDeMokepones
 
        inputhipodoge=document.getElementById("Hipodoge")
        inputcapipepo=document.getElementById("Capipepo")
        inputratigueya=document.getElementById("Ratigueya")
        inputlangostelvis=document.getElementById("Langostelvis")
        inputtucapalma=document.getElementById("Tucapalma")
        inputpydos=document.getElementById("Pydos")
        
    })
   
    botonSeleccionarMascota.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
 
function seleccionarMascotaJugador(){
    //sectionAtaque.style.display='flex'
    sectionSeleccionarMascota.style.display="none"
    
    if(inputhipodoge.checked){
        spanMascotaJugador.innerHTML = inputhipodoge.id
        mascotaJugador=inputhipodoge.id
    }
    else if(inputcapipepo.checked){
        spanMascotaJugador.innerHTML = inputcapipepo.id
        mascotaJugador=inputcapipepo.id
    }
    else if(inputratigueya.checked){
        spanMascotaJugador.innerHTML = inputratigueya.id
        mascotaJugador=inputratigueya.id
    }
    else if(inputlangostelvis.checked){
        spanMascotaJugador.innerHTML = inputlangostelvis.id
        mascotaJugador=inputlangostelvis.id
    }
    else if(inputtucapalma.checked){
        spanMascotaJugador.innerHTML = inputtucapalma.id
        mascotaJugador=inputtucapalma.id
    }
    else if(inputpydos.checked){
        spanMascotaJugador.innerHTML = inputpydos.id
        mascotaJugador=inputpydos.id
    }
    else{
        alert("Selecciona un mokepon!")
        location.reload()
    }
    
    extraerJugadorObjeto()
    iniciarMapa()
    
    spanVidaEnemigo.innerHTML=victoriasEnemigo
    spanVidaJugador.innerHTML=victoriasJugador
}
 
function seleccionarMascotaEnemigo(){
    spanMascotaEnemigo.innerHTML = enemigoColisionObjeto.nombre
    ataquesMokeponEnemigo = enemigoColisionObjeto.ataques
    tipoMascotaEnemigo=enemigoColisionObjeto.tipo
    
    extraerAtaques(mascotaJugador)
    
}
 
function extraerAtaques(mascotaJugador){
    mokepones.forEach((mokepon) => {
        if (mascotaJugador == mokepon.nombre) {
            ataques = mokepon.ataques
            tipoMascotaJugador =mokepon.tipo
        }
    })
    /* for (let i=0; i < mokepones.length - 1; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    } */
    ataquesEspeciales()
    mostrarAtaques(ataques)
    mostrarDibujo(mascotaJugador)
}
 
function ataquesEspeciales(){
    mokepones.forEach((mokepon) => {
        if(mascotaJugador == mokepon.nombre){
            if(tipoMascotaJugador == "AGUA" && tipoMascotaEnemigo == "FUEGO") {
                mokepon.ataques.push(
                    {nombre:"💧", id:"botonAgua"}
                )}
            else if(tipoMascotaJugador == "FUEGO" && tipoMascotaEnemigo == "TIERRA"){
                mokepon.ataques.push(
                    {nombre:"🔥", id:"botonFuego"}
                )}
            else if(tipoMascotaJugador == "TIERRA" && tipoMascotaEnemigo == "AGUA"){
                mokepon.ataques.push(
                    {nombre:"🌱", id:"botonTierra"}
                )}
            else if(tipoMascotaJugador == "VENENO" && tipoMascotaEnemigo == "AGUA"){
                mokepon.ataques.push(
                    {nombre:"🦂", id:"botonVeneno"}
                )}
            else if(tipoMascotaJugador == "AIRE" && tipoMascotaEnemigo == "TIERRA"){
                mokepon.ataques.push(
                    {nombre:"🦅", id:"botonVeneno"}
                )}
        }
    })    
}
 
function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        opcionDeAtaques=`<button class="estiloBoton BAtaque" id=${ataque.id}>${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += opcionDeAtaques
    })
    botones = document.querySelectorAll(".BAtaque")
    secuenciaAtaque()    
}
 
function mostrarDibujo(mascotaJugador){
    let dibujoFinal
    mokepones.forEach((mokepon) => {
        if (mascotaJugador==mokepon.nombre) {
            dibujoFinal=`<img src=${mokepon.foto} class="dibujoFinal" alt=${mokepon.nombre}>`
        }
        seccionDibujo.innerHTML=dibujoFinal
    })
}
 
function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) => {
            switch (e.target.textContent) {
                case "🔥" :
                    ataqueJugador.push("FUEGO")
                break
                case "💧" :
                    ataqueJugador.push("AGUA")
                break
                case "🌱":
                    ataqueJugador.push("TIERRA")
                break
                case "🦞":
                    ataqueJugador.push("PINZAS")
                break
                case "🦅":
                    ataqueJugador.push("VUELO")
                break
                case "🦂":
                    ataqueJugador.push("VENENO")
                break
            }
            boton.style.background = "#112f58"
            boton.disabled=true
            console.log(ataqueJugador)
            ataqueEnemigo()
        }) 
    })
}
 
function ataqueEnemigo(){
    let ataqueAleatorioEnemigo=aleatorio(0, ataqueEnemigoObjeto.length - 1)
    if(ataqueEnemigoObjeto[ataqueAleatorioEnemigo].nombre == "🔥"){
        ataqueVarEnemigo.push("FUEGO")
    }
    else if(ataqueEnemigoObjeto[ataqueAleatorioEnemigo].nombre == "💧"){
        ataqueVarEnemigo.push("AGUA")
    }
    else if(ataqueEnemigoObjeto[ataqueAleatorioEnemigo].nombre == "🌱"){
        ataqueVarEnemigo.push("TIERRA")
    }
    else if(ataqueEnemigoObjeto[ataqueAleatorioEnemigo].nombre == "🦞"){
        ataqueVarEnemigo.push("PINZAS")
    }
    else if(ataqueEnemigoObjeto[ataqueAleatorioEnemigo].nombre == "🦅"){
        ataqueVarEnemigo.push("VUELO")
    }
    else if(ataqueEnemigoObjeto[ataqueAleatorioEnemigo].nombre == "🦂"){
        ataqueVarEnemigo.push("VENENO")
    }
    console.log(ataqueVarEnemigo)
    iniciarPelea()
}
 
function iniciarPelea() {
    if (ataqueJugador.length === ataques.length ) {
        combate()
    }
}
 
function combate(){
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] == ataqueVarEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje("EMPATE", mascotaJugador)
        } //Casos para AGUA
        else if (ataqueJugador[i] == "AGUA" && ataqueVarEnemigo[i] == "TIERRA") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE", mascotaJugador)
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "AGUA" && ataqueVarEnemigo[i] == "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE", mascotaJugador)
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "AGUA" && ataqueVarEnemigo[i] == "VUELO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE", mascotaJugador)
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "AGUA" && ataqueVarEnemigo[i] == "VENENO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "AGUA" && ataqueVarEnemigo[i] == "PINZAS") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        } // Casos para FUEGO
        else if (ataqueJugador[i] == "FUEGO" && ataqueVarEnemigo[i] == "AGUA") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "FUEGO" && ataqueVarEnemigo[i] == "TIERRA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "FUEGO" && ataqueVarEnemigo[i] == "VUELO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "FUEGO" && ataqueVarEnemigo[i] == "VENENO") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "FUEGO" && ataqueVarEnemigo[i] == "PINZAS") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        } // Casos para TIERRA
        else if (ataqueJugador[i] == "TIERRA" && ataqueVarEnemigo[i] == "AGUA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "TIERRA" && ataqueVarEnemigo[i] == "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "TIERRA" && ataqueVarEnemigo[i] == "VUELO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "TIERRA" && ataqueVarEnemigo[i] == "VENENO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "TIERRA" && ataqueVarEnemigo[i] == "PINZAS") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        } // Casos para Vuelo
        else if (ataqueJugador[i] == "VUELO" && ataqueVarEnemigo[i] == "AGUA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "VUELO" && ataqueVarEnemigo[i] == "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "VUELO" && ataqueVarEnemigo[i] == "TIERRA") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "VUELO" && ataqueVarEnemigo[i] == "VENENO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "VUELO" && ataqueVarEnemigo[i] == "PINZAS") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        } // Casos para VENENO
        else if (ataqueJugador[i] == "VENENO" && ataqueVarEnemigo[i] == "AGUA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "VENENO" && ataqueVarEnemigo[i] == "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "VENENO" && ataqueVarEnemigo[i] == "TIERRA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "VENENO" && ataqueVarEnemigo[i] == "VUELO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "VENENO" && ataqueVarEnemigo[i] == "PINZAS") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        } //Casos para PINZAS
        else if (ataqueJugador[i] == "PINZAS" && ataqueVarEnemigo[i] == "AGUA") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "PINZAS" && ataqueVarEnemigo[i] == "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "PINZAS" && ataqueVarEnemigo[i] == "TIERRA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] == "PINZAS" && ataqueVarEnemigo[i] == "VENENO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        else if (ataqueJugador[i] == "PINZAS" && ataqueVarEnemigo[i] == "VUELO") {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}
 
function revisarVidas(){
    if(victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate")
    }
    else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("🎉🎈🎉 GANASTE 🎉🎈🎉 <hr> Reinicia la pagina para volver a jugar")
    }
    else if(victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("🙁🙁🙁PERDISTE 😜😜😜 <hr> Reinicia la pagina para volver a jugar")
    }
}
 
function crearMensaje(resultadoCombate){
        let ataqueDelJugador = document.createElement("p")
        let ataqueDelEnemigo = document.createElement("p")
        let resultados = document.createElement("p")
 
        resultados.innerHTML=resultadoCombate
        ataqueDelJugador.innerHTML=indexAtaqueJugador
        ataqueDelEnemigo.innerHTML=indexAtaqueEnemigo
 
        seccionResultado.appendChild(resultados)
        seccionAtaqueJugador.appendChild(ataqueDelJugador)
        seccionAtaqueEnemigo.appendChild(ataqueDelEnemigo)
}
 
function crearMensajeFinal(resultadoCombateFinal){
    sectionNotificacionFinal.style.display="block"
    seccionMensajes.innerHTML=resultadoCombateFinal
}
 
function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueVarEnemigo[enemigo]
    console.log(indexAtaqueEnemigo,indexAtaqueEnemigo)
}
 
function reiniciarJuego(){
    location.reload()
}
 
function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
 
function pintarCanvas(){
    if(anchoMapa > anchoMaximoMapa) {
        anchoMapa = anchoMaximoMapa - 20
    }
    alturaDeseada = anchoMapa * 600 / 800
    mapa.width = anchoMapa
    mapa.height = alturaDeseada
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    langostelvisEnemigo.pintarMokepon()
    tucapalmaEnemigo.pintarMokepon()
    pydosEnemigo.pintarMokepon()
 
    if (mascotaJugadorObjeto.velocidadX !==0 || mascotaJugadorObjeto.velocidadY !==0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
        revisarColision(langostelvisEnemigo)
        revisarColision(tucapalmaEnemigo)
        revisarColision(pydosEnemigo)
    }
}
 
function moverMascotaJugador (direccion){
    switch (direccion) {
        case "up":
            mascotaJugadorObjeto.velocidadY -= 5
        break
        case "down":
            mascotaJugadorObjeto.velocidadY += 5
        break
        case "right":
            mascotaJugadorObjeto.velocidadX += 5
        break
        case "left":
            mascotaJugadorObjeto.velocidadX -= 5
        break
    }
}

function moverMascotaJugadorBoton (direccion){
    switch (direccion) {
        case "up":
            mascotaJugadorObjeto.velocidadY -= 5
        break
        case "down":
            mascotaJugadorObjeto.velocidadY += 5
        break
        case "right":
            mascotaJugadorObjeto.velocidadX += 5
        break
        case "left":
            mascotaJugadorObjeto.velocidadX -= 5
        break
    }
    detenerCapipepo()
}
 
function moverTeclas (teclas) {
    switch (teclas.key) {
        case "ArrowUp":
            moverMascotaJugador("up")
        break
        case "ArrowDown":
            moverMascotaJugador("down")
        break
        case "ArrowRight":
            moverMascotaJugador("right")
        break
        case "ArrowLeft":
            moverMascotaJugador("left")
        break
    }
     
}
 
function detenerCapipepo() {
    mokepones.forEach((mokepon) => {
        mokepon.velocidadY = 0
        mokepon.velocidadX = 0
    })
}
 
function iniciarMapa() {
    sectionVerMapa.style.display="flex"
   
    intervalo = setInterval(pintarCanvas, 50)
    controls.forEach((control) => {
        control.addEventListener("mousedown", () => moverMascotaJugador(control.id))
        control.addEventListener("click", () => moverMascotaJugadorBoton(control.id))
        control.addEventListener("mouseup", () => detenerCapipepo())
    }) 
    window.addEventListener("keydown", moverTeclas)
    window.addEventListener("keyup", detenerCapipepo)
}
 
function extraerJugadorObjeto () {
    mokepones.forEach((mokepon) => {
        if (mascotaJugador == mokepon.nombre) {
            mascotaJugadorObjeto = mokepon
            mascotaJugadorObjeto.x = 10
            mascotaJugadorObjeto.y = 10
        }
    })
}
 
function extraerEnemigoObjeto (enemigo) {
    mokepones.forEach((mokepon) => {
        if (enemigo == mokepon.nombre) {
            enemigoColisionObjeto = mokepon
            ataqueEnemigoObjeto = mokepon.ataques
        }
    })
    console.log(enemigoColisionObjeto, ataqueEnemigoObjeto);
}
 
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho
 
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
 
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ) {
        return 
    } else {
        enemigoColision = enemigo.nombre
        detenerCapipepo()
        clearInterval(intervalo)
        alert ("Hay una colision con " + enemigo.nombre)
        extraerEnemigoObjeto(enemigo.nombre)
        seleccionarMascotaEnemigo()
        sectionAtaque.style.display='flex'
        sectionVerMapa.style.display="none" 
    }
}