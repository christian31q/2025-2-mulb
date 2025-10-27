window.onload = function() {
    const form = document.querySelector('#formulario');
    ajaxRecibir('api/get/usuarios.php');

    form.onsubmit = function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const imagenInput = form.querySelector('input[type="file"][name="imagen"]');

        if (imagenInput && imagenInput.files.length > 0) {
            const file = imagenInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                // e.target.result contiene el Base64 (con encabezado data:image/...;base64,)
                const base64ImageString = e.target.result.split(',')[1]; // quitamos encabezado
                data.imagen = base64ImageString;
                ajaxSubmit('api/post/registro.php', data);
            };

            reader.readAsDataURL(file);
        } else {
            // No hay imagen, solo enviamos los datos normales
            ajaxSubmit('api/post/registro.php', data);
        }
    };
};

function ajaxSubmit(url, data) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Respuesta del servidor:', xhr.responseText);
            } else {
                console.error('Error al enviar los datos');
            }
        }
    };
    const jsonData = JSON.stringify(data);
    console.log('Enviando:', jsonData);

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(jsonData);
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
    const listaUsuarios = document.getElementById('lista-usuarios');
    listaUsuarios.innerHTML = '';

    if (respuesta.status === 'success') {
        respuesta.data.forEach(function(usuario) {
            const li = document.createElement('li');
            li.textContent = usuario.nombre + ' - ' + usuario.correo;
            listaUsuarios.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron usuarios';
        listaUsuarios.appendChild(li);
    }
}
