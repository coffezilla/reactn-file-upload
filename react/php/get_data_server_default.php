<?php 

	/* 
	
	Default PHP file for Javascript calls using REST APIs
	Created by Renato Santos - renato@bhxsites.com.br

	*/

	// optional: you need this line to allow rest calls from any host as localhost
	header('Access-Control-Allow-Origin: *');

	// default response data
	$dataResponse = array();
	$dataResponseStatus = 0;

	// setting dates
	$dataResponse['response'] = $dataResponseStatus;
	$dataResponse['users'] = [
		['nome'=>'Paulinho Souza', 'age'=>62, 'subscribe'=>'2021-01-01'],
		['nome'=>'Marcela Pereira', 'age'=>22, 'subscribe'=>'2021-01-01'],
		['nome'=>'Sabrina Costa', 'age'=>35, 'subscribe'=>'2021-01-01']
	];
	
	// setting to 1 just for testint porposes
	$dataResponseStatus = 1;

	// return response
	if($dataResponseStatus == 1) {
		$resultadosJson = json_encode($dataResponse);
		echo $_GET['jsoncallback'] . $resultadosJson;
	} else {
		exit();
	}

?>