const ruta = "http://18.214.150.84:3000/usuarios";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("iniciar").addEventListener("click", login);
});

async function login(e) {
    // e.preventDefault();

    const username = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;
    const span = document.getElementById("errorlogin");

    e.preventDefault();
    fetch(ruta + "?email_like=" + username)
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0) {
                if (data[0].password === contraseña) {
                    localStorage.setItem("sesionIniciada", JSON.stringify(data[0].nombre));
                    span.innerText='';
                    window.location.href="../index.html";
                } else {
                    span.innerText='Datos incorrectos';
                }
            } else {
                span.innerText='Datos incorrectos';
            }
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
}


