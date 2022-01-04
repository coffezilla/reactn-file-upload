<?php 

header('Content-Type: application/json; charset=UTF-8');

// include "../connect/bd_connect.php";

//
$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = 'uploaded!';
$errors = array();

include 'WideImage/WideImage.php';

// ========================================================
// NEW VAR
    // move_uploaded_file($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name']);

$fileUpload = $_FILES['file'];
$fileName = $fileUpload["name"];

// // $userEmail = addslashes(trim($_GET['email']));
// // $userEmail = str_replace(" ", "", $userEmail);

// // ========================================================
// // CHECKING VALIDATION

// //PREVIEW 1 FOTOS
if (!empty($fileUpload["name"])) {
    

    if($fileUpload['type']!=='image/jpeg' && $fileUpload['type']!=='image/jpg' && $fileUpload['type']!=='image/png'){
        $dataResponse["message"] = "Formato errado...";  
    } else {
        $dataResponse["message"] = "Formato Correto..."; 
        // imagem em box quadrado
        $image = WideImage::load($fileUpload["tmp_name"]);
        $image->saveToFile($fileName);
        $dataResponse["message"] = "Upload Realizado!"; 

    } 
$dataResponse["message"] = "Campo cheio ...".$fileUpload;
// $dataResponse["message"] = "Campo cheio ...".$fileUpload;
} else {
    $dataResponse["message"] = "Campo File vazioz...".$fileUpload;
}


// $validInputs = false;

// // check input
// if(
// $authUserEmail != '' && strlen($authUserEmail) >= 3 &&
// $currentTimestampClean != '' && strlen($currentTimestampClean) >= 3
// ) {
//     // pode passar
//     $validInputs = true;

// } else {
//     $dataResponse['message'] = 'Campo em branco';
//     $dataResponse['status'] = 2;
// }

// ========================================================

// JWT auth 
// include "../connect/auth.php";
// $isAuth = verifyAuth($clientToken, $JWTServerkey);

// if($isAuth) {

    // ========================================================

    $dataResponse['status'] = 1;

    // ========================================================

// } else {
//     // nao autehnticado
//     $dataResponse['status'] = 2;
// }

$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
