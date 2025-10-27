window.onload = function() {
    const form = document.querySelector('#formulario');
    ajaxRecibir('api/get/usuarios.php');
    form.onsubmit = function(event) {
        event.preventDefault(); // Evita el envío del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        validarDatos(data);
        ajaxSubmit('api/post/registro.php', data);
       
    };
};

function ajaxSubmit(url, data) {
    const xhr = new XMLHttpRequest(); // Crear una nueva instancia de XMLHttpRequest
    xhr.onreadystatechange = function() {
        
        if (xhr.readyState === 4) { // Verificar si la solicitud se ha completado
            if (xhr.status === 200) { // Verificar si la respuesta es exitosa
                respuestaServer(JSON.parse(xhr.responseText));
            } else {
                console.error('Error al enviar los datos');
            }
        }
    };
    data = JSON.stringify(data);
    console.log(data);
    /*data = data.replace(/\\'/g, "'"); // Reemplazar las comillas simples escapadas
    blankspace = /\s/g;
    data = data.replace(blankspace, "%20"); // Reemplazar espacios en blanco escapados
    */
   xhr.open('POST', url, true); // Configurar la solicitud POST
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(data); // Enviar los datos en formato JSON
}

function ajaxRecibir(url) {
    const xhr = new XMLHttpRequest(); // Crear una nueva instancia de XMLHttpRequest
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

function respuestaServer(respuesta) {
   /* console.log('Respuesta del servidor:', respuesta.message);*/
    const respuestaDiv = document.getElementById('respuesta');
    respuestaDiv.textContent = respuesta.message;
    // Aquí puedes manejar la respuesta del servidor según tus necesidades
}

function validarDatos(data) {
    // Aquí puedes agregar validaciones adicionales si es necesario
    if (!data.email || !data.email.includes('@')) {
        const respuestaDiv = document.getElementById('respuesta');
        respuestaDiv.textContent = 'Por favor, ingresa un correo electrónico válido.';
        throw new Error('Correo electrónico inválido');
    }
}

function respuestaServerData(respuesta) {
    const listaUsuarios = document.getElementById('lista-usuarios');
    listaUsuarios.innerHTML = ''; // Limpiar la lista existente
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