document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("nombreusuario").innerText = cleanedSesionIniciada;
  document.getElementById("cerrarsesion").addEventListener("click", () => {
    localStorage.clear();
  });
  document.getElementById("order").addEventListener("change", (e) => {
    obtenerCoches(e.target.value); 
  });
  await obtenerCoches("desc");
  const sesionyaIniciada = localStorage.getItem("sesionIniciada");
  const publicarProductoLink = document.getElementById("publicarproducto");
  const iniciarSesion = document.getElementById('cerrarsesion');

  if (sesionyaIniciada) {
    publicarProductoLink.style.display = "inline-block";
  } else {
    publicarProductoLink.style.display = "none";
    iniciarSesion.innerText='Iniciar Sesión'
  }
});

const sesionIniciada = localStorage.getItem("sesionIniciada");
const cleanedSesionIniciada = sesionIniciada
  ? sesionIniciada.trim().replace(/^"(.*)"$/, "$1")
  : "";

async function crearElementoCoche(coche) {
  const carDiv = document.createElement("div");
  carDiv.className = "tarjeta";

  carDiv.innerHTML = `
        <div class="imagen">
            <img
              src="${coche.imagen}"
              alt="${coche.modelo}" />  
          </div>
          <h3>${coche.modelo}</h3>
          <p>${coche.marca}</p>
          <p>${coche.motorizacion}</p>
          <h4>${coche.precio} €</h4>
          <button class="eliminarBtn" data-coche-id="${coche.id}">Eliminar</button>          
          `;

  const eliminarBtn = carDiv.querySelector(".eliminarBtn");
  eliminarBtn.addEventListener("click", () => eliminarCoche(coche.id));

  return carDiv;
}

async function obtenerCoches(orden) {
  let URL;
  if (orden === "asc") {
    URL = "http://18.214.150.84:3000/coches?_sort=precio&_order=asc";
  } else {
    URL = "http://18.214.150.84:3000/coches?_sort=precio&_order=desc";
  }
  try {
    const vehiculos = await fetch(URL)
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(`Error fetching data: ${error}`);
      });

    const bloque = document.getElementById("items");
    bloque.innerHTML = "";

    for (const coche of vehiculos) {
      const elemento = await crearElementoCoche(coche);
      bloque.appendChild(elemento);
    }

    console.log(vehiculos);
  } catch (error) {
    console.error(error);
  }
}

async function eliminarCoche(cocheId) {
  const URL = `http://18.214.150.84:3000/coches/${cocheId}`;

  const options = {
    method: "DELETE",
  };

  try {
    const response = await fetch(URL, options);
    if (response.ok) {
      await obtenerCoches("desc");
      console.log(`Coche con ID ${cocheId} eliminado correctamente`);
    } else {
      console.error(
        `Error al intentar eliminar el coche. Código: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error en la petición DELETE:", error);
  }
}
