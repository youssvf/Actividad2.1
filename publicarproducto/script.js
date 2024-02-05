document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const marca = document.getElementById('marcas').value;
    const modelo = document.getElementById('modelos').value;
    const km = document.getElementById('KM').value;
    const año = document.getElementById('años').value;
    const motorizacion = document.getElementById('Motorización').value;

    fetch('http://18.214.150.84:3000/articulos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            marca,
            modelo,
            km,
            año,
            motorizacion,
            imageUrl, 
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Producto publicado:', data);
            obtenerYMostrarProductos();
        })
        .catch(error => console.error('Error:', error));
});

function obtenerYMostrarProductos() {
    fetch('http://18.214.150.84:3000/articulos')
        .then(response => response.json())
        .then(data => {

            const itemsContainer = document.getElementById('items-container');
            itemsContainer.innerHTML = ''; 

            data.forEach(producto => {
                const tarjetaHTML = `
                    <div class="tarjeta">
                        <div class="imagen">
                            <img src="${producto.imageUrl}" alt="${producto.marca} ${producto.modelo}" />
                        </div>
                        <h3>${producto.modelo}</h3>
                        <p>${producto.marca}</p>
                        <p>${producto.motorizacion}</p>
                    </div>
                `;
                itemsContainer.innerHTML += tarjetaHTML;
            });
        })
        .catch(error => console.error('Error:', error));
}


obtenerYMostrarProductos();
