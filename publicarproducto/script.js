const URL_SERVER = "http://18.214.150.84:3000/coches";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formulario").addEventListener("submit", postCoches);
  document.getElementById('cerrarsesion').addEventListener('click',(e)=>{
    sessionStorage.clear();
  })
});

// document.getElementById('formulario').addEventListener('submit', function (event) {

//     event.preventDefault();

//     const marca = document.getElementById('marcas').value;
//     const modelo = document.getElementById('modelos').value;
//     const km = document.getElementById('KM').value;
//     const año = document.getElementById('años').value;
//     const motorizacion = document.getElementById('Motorización').value;
//     const precio = document.getElementById('precio').value;

//     fetch('http://18.214.150.84:3000/articulos', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             marca,
//             modelo,
//             km,
//             año,
//             precio,
//             motorizacion,
//             imageUrl,
//         }),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Producto publicado:', data);
//             obtenerYMostrarProductos();
//         })
//         .catch(error => console.error('Error:', error));
// });

function postProducto(e) {
  e.preventDefault();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const km = document.getElementById("km").value;
  const año = document.getElementById("años").value;
  const motorizacion = document.getElementById("Motorización").value;
  const precio = document.getElementById("precio").value;
  const imageUrl = "https://s3.amazonaws.com/bucketactividad2.1/mercedes.jpeg";

  fetch("http://18.214.150.84:3000/coches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      marca: marca,
      modelo: modelo,
      km: km,
      año: año,
      precio: precio,
      motorizacion: motorizacion,
      imageUrl: imageUrl,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Producto publicado:", data);
      // obtenerYMostrarProductos();
    })
    .catch((error) => console.error("Error:", error));
}

async function postCoches(e) {
  e.preventDefault();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const km = document.getElementById("km").value;
  const año = document.getElementById("años").value;
  const motorizacion = document.getElementById("Motorización").value;
  const precio = document.getElementById("precio").value;
  const imageUrl = "https://s3.amazonaws.com/bucketactividad2.1/mercedes.jpeg";

  const coche = {
    marca: marca,
    modelo: modelo,
    km: km,
    año: año,
    precio: precio,
    motorizacion: motorizacion,
    imageUrl: imageUrl,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(coche),
  };

  try {
    let response = await fetch(URL_SERVER, options);
    if (response.ok) {
      try {
        let data = response.json();
        console.log(data);
      } catch (error) {
        console.error("error de parseo");
      }
    } else {
      console.error("error código: ", response.status);
    }
  } catch (error) {
    console.error("error de petición");
  }
}

// function obtenerYMostrarProductos() {
//     fetch(URL_SERVER)
//         .then(response => response.json())
//         .then(data => {

//             const itemsContainer = document.getElementById('items-container');
//             itemsContainer.innerHTML = '';

//             data.forEach(producto => {
//                 const tarjetaHTML = `
//                     <div class="tarjeta">
//                         <div class="imagen">
//                             <img src="${producto.imageUrl}" alt="${producto.marca} ${producto.modelo}" />
//                         </div>
//                         <h3>${producto.modelo}</h3>
//                         <p>${producto.marca}</p>
//                         <p>${producto.motorizacion}</p>
//                     </div>
//                 `;
//                 itemsContainer.innerHTML += tarjetaHTML;
//             });
//         })
//         .catch(error => console.error('Error:', error));
// }

// obtenerYMostrarProductos();
