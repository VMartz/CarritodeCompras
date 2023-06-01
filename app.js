const stockProductos = [
  {
    id: 1,
    nombre: "Nier Replicant",
    cantidad: 1,
    desc: "Combates, Armas, Magia, Combates Automaticos",
    precio: 1349,
    img: "img/repli.jpeg",
  },
  {
    id: 2,
    nombre: "Nier: Automata",
    cantidad: 1,
    desc: "Videojuego de rol de acción, Armas, Combates, Combates Automaticos ",
    precio: 761,
    img: "img/nier.jpg",
  },
  {
    id: 3,
    nombre: "Code Vein",
    cantidad: 1,
    desc: " Videojuego de rol de acción, Pelea, Disparos, Aventura",
    precio: 1853,
    img: "img/code.jpg",
  },
  {
    id: 4,
    nombre: "Resident Evil 2",
    cantidad: 1,
    desc: "videojuego de terror y supervivencia de disparos en tercera persona desarrollado",
    precio: 444,
    img: "img/resi.jpg",
  },
  {
    id: 7,
    nombre: "League of Legends",
    cantidad: 1,
    desc: "No compres esto por tu bien",
    precio: 1400,
    img: "img/league.jpg",
  },
  {
    id: 5,
    nombre: "Dead by Daylight",
    cantidad: 1,
    desc: "Juego de horror en modo multijugador de 1 vs 4 ",
    precio: 230,
    img: "img/dead.jpg",
  },
  {
    id: 6,
    nombre: "Metro  Exodus",
    cantidad: 1,
    desc: "Combate letal y el subterfugio con la exploración, el horror y la supervivencia",
    precio:554,
    img: "img/metro.jpg",
  },
  {
    id: 8,
    nombre: "Final Fantasy XIII",
    cantidad: 1,
    desc: "Rol desarrollado, Magia, Armas, Combates",
    precio: 297,
    img: "img/final.jpg",
  },
  {
    id: 9,
    nombre: "Halo",
    cantidad: 1,
    desc: "No se necesita descripcion para este juegazo",
    precio: 767,
    img: "img/halo.jpg",
  },
  {
    id: 10,
    nombre: "Destiny 2",
    cantidad: 1,
    desc: "Disparos, Magia, Rol multiplayer en linea",
    precio: 694,
    img: "img/des.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0

  );

}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.querySelectorAll('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

  btn.forEach(boton1 => {
  boton1.addEventListener("click", ()=>{
      descuento(boton1.value)})
});
   function descuento(op){
    
                    let numero3 = parseInt(precioTotal.value); 
                    let numero4 = parseInt(procesarCompra.value);
                    let numero5 = parseInt(totalProceso.value);
                    let numero6 = parseInt(formulario.value);
            
                  var a=(numero3+numero4+numero5+numero6);
                  resultado1.innerHTML=`El subtotal que usted deberia de pagar es de: Q.${a} ` 
                if (a>=1000){
                     
                    resultado3.innerHTML=`El monto de descuesto para usted es de: Q.${a*0.10}` 
                    resultado2.innerHTML=`"Excelente" usted es acreedor de nuestro descuento <br/>Su monto a pagar es de: Q.${(a-(a*0.10)) }` 
                    }
                    else{
                        resultado1.innerHTML=`Monto a pagar final es de:: Q.${a} ` 
                        resultado2.innerHTML=`Usted lamentablemente no tiene descuento.`
                } 

   }

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     alert("Compra realizada correctamente")
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }