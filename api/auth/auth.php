<?php
session_start();
if (!isset($_SESSION['nombre'])) {
    echo json_encode(array("status" => "error", "mensaje" => "No autorizado"));
    exit();
}else {
    echo json_encode(array("nombre" => $_SESSION['nombre'], "correo" => $_SESSION['correo'], "mensaje" => "Autorizado"));
}
?>