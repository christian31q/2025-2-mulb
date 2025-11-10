window.onload = function() {
   /* if (sessionStorage.getItem('token')=='false') {
        window.location.href = '../acceso.html'; // Redirige a la página de inicio de sesión si no hay token
    }*/
    ajaxRecibir('../api/auth/auth.php');
    let botonCerrar = document.getElementById('logout');
    botonCerrar.onclick = function() {
        ajaxRecibir('../api/auth/logout.php');
        window.location.href = '../index.html';
    }
    
}

function ajaxRecibir(url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);
                respuestaServerData(respuesta);
            } else {
                console.error('Error al recibir los datos');
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}      
function respuestaServerData(respuesta) {
    const respuestaDiv = document.getElementById('respuesta');
    if (respuesta.status === 'error') {
        window.location.href = '../acceso.html'; // Redirige a la página de inicio de sesión si no autorizado
    } else {
        respuestaDiv.innerText = 'Bienvenido, ' + respuesta.nombre + ' (' + respuesta.correo + ')';
    }
}