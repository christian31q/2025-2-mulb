<?php
header('Content-Type: application/json');
include_once '../connectbd.php';
$sql = "SELECT * FROM `usuarios`;";
$result = $connect->query($sql);

if ($result->num_rows > 0) {
    $usuarios = array();
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode(
        array(
            "status" => "success",
            "data" => $usuarios
        )
    );
} else {
    echo json_encode(
        array(
            "status" => "error",
            "message" => "No se encontraron usuarios"
        )
    );
}

$connect->close();
?>