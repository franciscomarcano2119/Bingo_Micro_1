

function startGame() {
    const tamano = document.getElementById('selectTamanoBingo').value;
    const p1 = document.getElementById('player1').value;
    const p2 = document.getElementById('player2').value;
    const p3 = document.getElementById('player3').value;
    const p4 = document.getElementById('player4').value;
    window.location.href = 'jugador_1.html?tamano='+ tamano + '&p1='+ p1+ '&p2='+ p2 +'&p3='+ p3 +'&p4='+ p4;

    jugarBingo()
}

function SalirJuego(){
    
    if(confirm("Estar seguro que quieres salirte del juego?")== true)
        window.location.href  = 'index.html';
    else{
        startGame()
    }
}


const dimensiones = [3, 4, 5];
var carton1 = [];
var carton2 = [];
var carton3 = []
var carton4= []

var numerosUsados = [];
var numerosSorteo = [];

var puntajejugador1 = 0;
var puntajejugador2 = 0;
var puntajejugador3 = 0;
var puntajejugador4 = 0;

var totalcontador = 25;
var totalcontadorlimite = 50;

var cartonlleno = false;

var contador = 0
//var tamano = 0;

function crearBingo(tamano, idBingo, carton) {
  // Obtener el tamaño seleccionado
 
  // Crear la tabla HTML
  let bingoHTML = "<table class='bingo'>";
  for (let i = 0; i < tamano; i++) {
    bingoHTML += "<tr>";
    for (let j = 0; j < tamano; j++) {
        if (carton[i][j][1] == 1) {
            bingoHTML += `<td><div class="selected">${carton[i][j][0]}</div></td>`;
        }
        else{
            bingoHTML += `<td><div class="unselected">${carton[i][j][0]}</div></td>`;
        }
      
    }
    bingoHTML += "</tr>";
  }
  bingoHTML += "</table>";

  // Insertar la tabla en el elemento "div"
  document.getElementById(idBingo).innerHTML = bingoHTML;
}

function Agregarjugadores(){
    const p1 = params.get("p1");
    const p2 = params.get("p2");
    const p3 = params.get("p3");
    const p4 = params.get("p4");

    var select = document.getElementById("players");
    //select.options[1].text = p1;

    const nuevaOpcion1 = document.createElement("option");
    nuevaOpcion1.value = 1;
    nuevaOpcion1.text = p1;
    select.append(nuevaOpcion1);
    document.getElementById("playername1").value = p1;
    

    const nuevaOpcion2 = document.createElement("option");
    nuevaOpcion2.value = 2;
    nuevaOpcion2.text = p2;
    select.append(nuevaOpcion2);
    document.getElementById("playername2").value = p2;

    const nuevaOpcion3 = document.createElement("option");
    nuevaOpcion3.value = 3;
    nuevaOpcion3.text = p3;
    select.append(nuevaOpcion3);
    document.getElementById("playername3").value = p3;

    const nuevaOpcion4 = document.createElement("option");
    nuevaOpcion4.value = 4;
    nuevaOpcion4.text = p4;
    select.append(nuevaOpcion4);
    document.getElementById("playername4").value = p4;
}

function crearcartones(){
    const tamano = document.getElementById('htamano').value;
    carton1 = crearcarton(tamano);
    carton2 = crearcarton(tamano);
    carton3 = crearcarton(tamano);
    carton4 = crearcarton(tamano);
}


function crearcarton(tamano){
    let carton = [];
    for (let i = 0; i < tamano; i++) {
        let columns = [];
        for (let j = 0; j < tamano; j++) {

            columns.push([generarNumeroAleatorio(), 0]);
        }
        carton.push(columns)
    }

    return carton;
}

function mostrarcarton() {
    const player = document.getElementById('players').value;
    const tamano = document.getElementById('htamano').value;
    let carton = []
    if (player == 1)
        carton = carton1;

    if (player == 2)
        carton = carton2;

    if (player == 3)
        carton = carton3;
    
    if(player == 4)
        carton = carton4;


    //obtener carton
    crearBingo(tamano , "bingo", carton); 

}

function mostrarInfoPlayer(){
    MostrarPuntaje();
    mostrarcarton();
}

function generarNumeroAleatorio() {
  // Generar un número aleatorio entre 1 y el tamaño del bingo
  let numero = Math.floor(Math.random() * 50) + 1;

  // Asegurar que el número no se repita
  while (numerosUsados.includes(numero)) {
    numero = Math.floor(Math.random() * 50) + 1;
  }
  // Agregar el número a la lista de números usados
  numerosUsados.push(numero);

  return numero;
}
// Lista para almacenar los números usados

function SacarnumeroAleatorio(){

    contador++ 
    Mostrarturnos();
    if (contador > totalcontador && contador < totalcontadorlimite){
        if (confirm("Desea continuar jugando") == true){
            totalcontador +=25;
        } else {
            finalizarJuego();
        }
        
    }

    let ultimonumero = generarnumeroSorteo();
    MostrarNumeroSorteo(ultimonumero);
    RevisarCarton(ultimonumero)
}


function generarnumeroSorteo(){
    let numero = Math.floor(Math.random() * 50) + 1;

  // Asegurar que el número no se repita
  while (numerosSorteo.includes(numero)) {
    numero = Math.floor(Math.random() * 50) + 1;
  }
  // Agregar el número a la lista de números usados
  numerosSorteo.push(numero);

  return numero;
    
};

function Mostrarturnos(){
    const turnos = document.getElementById('turnos');
    turnos.innerHTML = contador;
}

function MostrarNumeroSorteo(ultimonumero){
    const shownumero = document.getElementById('Sorteo');
    shownumero.innerHTML = ultimonumero;
}

function RevisarCarton(ultimonumero){
 

    MarcarCasilla(carton1,ultimonumero);
    MarcarCasilla(carton2,ultimonumero);
    MarcarCasilla(carton3,ultimonumero);
    MarcarCasilla(carton4,ultimonumero);

    puntajejugador1 = calcularpuntaje(carton1);
    puntajejugador2 = calcularpuntaje(carton2);
    puntajejugador3 = calcularpuntaje(carton3);
    puntajejugador4 = calcularpuntaje(carton4);

    mostrarInfoPlayer();

    if (cartonlleno) {
        finalizarJuego();
    }
}

function MostrarPuntaje(){
    const puntajeob= document.getElementById('puntajejugador');
    

    const player = document.getElementById('players').value;
    let puntaje = 0;

    if (player == 1)
        puntaje = puntajejugador1;

    if (player == 2)
    puntaje = puntajejugador2;

    if (player == 3)
    puntaje = puntajejugador3;
    
    if(player == 4)
    puntaje = puntajejugador4;

    puntajeob.innerHTML = puntaje;
}

function calcularpuntaje(carton) {
    const tamano = document.getElementById('htamano').value;
    let total = 0;

    for (let i = 0; i < tamano; i++) { 
        if (validarHorizontal(i,carton)){
            total +=1;
        }
    }

    for (let j = 0; j < tamano; j++) { 
        if (validarVertical(j, carton)){
            total +=1;
        }
    }
    

    if (validardiagonalIsquierda(carton)){
        total +=3;
    }

    if (validardiagonalDerecha(carton)){
        total +=3;
    }

    if (validarcartonlleno(carton)){
        total +=5;
        cartonlleno = true;
    }

    return total;
}

function MarcarCasilla(carton,ultimonumero){
const tamano = document.getElementById('htamano').value;
  for (let i = 0; i < tamano; i++) { 
    for (let j = 0; j < tamano; j++) {

        if (carton[i][j][0] === ultimonumero) {
            carton[i][j][1] = 1;
            break;
        }}}}


function validarHorizontal(i,carton){
    const tamano = document.getElementById('htamano').value;
    for (let j = 0; j < tamano; j++){
        if (carton[i][j][1] === 0)
            return false;

    } 
    return true;       
}

function validarVertical(j,carton){
    const tamano = document.getElementById('htamano').value;
    for (let i = 0; i < tamano; i++){
        if (carton[i][j][1] === 0)
            return false;
    } 
    return true;      
}

function validarcartonlleno(carton){
    const tamano = document.getElementById('htamano').value;
    for (let i = 0; i < tamano; i++) { 
        for (let j = 0; j < tamano; j++) {
            if (carton[i][j][1] != 1)
            return false;
        }
    }
    return true;
}

function validardiagonalIsquierda(carton){
    const tamano = document.getElementById('htamano').value;
    let j = 0
    for (let i = 0; i < tamano; i++) { 

        if (carton[i][j][1] != 1){
            return false;
        }
        j++;
    }
    return true;

}

function validardiagonalDerecha(carton){
    const tamano = document.getElementById('htamano').value;
    let j = tamano-1;
    for (let i = 0; i < tamano; i++) { 

        if (carton[i][j][1] != 1){
            return false;
        }
        j--;
    }
    return true;
}

function finalizarJuego() {

    const parteSuperior = document.getElementById("ParteSuperior")
    const parteFinal = document.getElementById("ParteFinal")
    
    actualizarTabla();

    parteSuperior.style.display = "none";
    parteFinal.style.display = "block";
}

function actualizarTabla() {
    

    const playername1 = document.getElementById("playername1").value;
    const playername2 = document.getElementById("playername2").value;
    const playername3 = document.getElementById("playername3").value;
    const playername4 = document.getElementById("playername4").value;


    let bingoHTML = "<table class=''>";

    bingoHTML += "<tr><th>Nombre</th><th>Puntaje</th></tr>";
  
    bingoHTML += "<tr>";
    bingoHTML += "<td>" + playername1 + "</td><td>" + puntajejugador1 + "</td>"
    bingoHTML += "</tr>";
    bingoHTML += "<tr>";
    bingoHTML += "<td>" + playername2 + "</td><td>" + puntajejugador2 + "</td>"
    bingoHTML += "</tr>";
    bingoHTML += "<tr>";
    bingoHTML += "<td>" + playername3 + "</td><td>" + puntajejugador3 + "</td>"
    bingoHTML += "</tr>";
    bingoHTML += "<tr>";
    bingoHTML += "<td>" + playername4 + "</td><td>" + puntajejugador4 + "</td>"
    bingoHTML += "</tr>";
  
    bingoHTML += "</table>";

    //const table = document.getElementById("tablaVictorias");

    document.getElementById("tablaVictorias").innerHTML = bingoHTML;

}

  