const URL_SERVER = "http://18.214.150.84:3000/coches";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formulario").addEventListener("submit", postCoches);
  document.getElementById('cerrarsesion').addEventListener('click',(e)=>{
    localStorage.clear();
  })
});

async function postCoches(e) {
  e.preventDefault();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const km = document.getElementById("km").value;
  const año = document.getElementById("años").value;
  const motorizacion = document.getElementById("Motorización").value;
  const precio = document.getElementById("precio").value;
  const imagen = "https://s3.amazonaws.com/bucketactividad2.1/mercedes.jpeg";

  const coche = {
    marca: marca,
    modelo: modelo,
    km: km,
    año: año,
    precio: precio,
    motorizacion: motorizacion,
    imagen: imagen,
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
        alert('Coche publicado!');
        window.location.href="../index.html";
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

