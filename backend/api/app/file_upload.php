<?php 

header('Content-Type: application/json; charset=UTF-8');

//
$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = 'uploaded!';
$errors = array();

include 'WideImage/WideImage.php';

// ========================================================
// NEW VAR
$fileUpload = $_FILES['file'];
$fileName = 'upload/';

// //PREVIEW 1 FOTOS
if (!empty($fileUpload["name"])) {
    

    if($fileUpload['type'] !== 'image/jpeg' && $fileUpload['type'] !== 'image/jpg' && $fileUpload['type'] !== 'image/png'){
        $dataResponse["message"] = "Formato errado...".$fileUpload['type'];  
    } else {
        $image = WideImage::load($fileUpload["tmp_name"]);
        $image->saveToFile($fileName.$fileUpload["name"]);
        $dataResponse["message"] = "Upload Realizado!".$fileUpload['type']; 
        $dataResponse['status'] = 1;
    }

} else {
    $dataResponse["message"] = "Campo File vazioz...";
}


$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
