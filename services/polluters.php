<?php
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Selection of points within specified radius of given lat/lon      (c) Chris Veness 2008-2014  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    // appends pollutant substance to location's pollutant array
    function appendSubstance(&$arr, &$sub) { 
       end($arr); 
       //var_dump($array[key($arr)]['Pollutants']);
       $arr[key($arr)]['Pollutants'][] = $sub; 
    } 

    // comparator to sort pollutants list by total volume
    function compare($a, $b) {
        return $b['Total'] - $a['Total'];
    }

    // declare vars
    /*$db_host = "localhost";
    $db_name = "code";
    $db_user = "root";
    $db_pass = "";*/
    $db_host = "localhost";
    $db_name = "manyscie_code";
    $db_user = "manyscie_codeusr";
    $db_pass = "password2455";
    $db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    $data = array();
    $i = -1;

    /*$lat = 43.6502840;
    $lon = -79.3843010;
    $rad = 10;
    $max = 50;*/

    $lat = $_GET['lat']; // latitude of centre of bounding circle in degrees
    $lon = $_GET['lng']; // longitude of centre of bounding circle in degrees
    $rad = $_GET['rad']; // radius of bounding circle in kilometers
    $max = $_GET['maxItems']; // maximum number of items that can be returned
    

    $R = 6371;  // earth's mean radius, km

    // first-cut bounding box (in degrees)
    $maxLat = $lat + rad2deg($rad/$R);
    $minLat = $lat - rad2deg($rad/$R);
    // compensate for degrees longitude getting smaller with increasing latitude
    $maxLon = $lon + rad2deg($rad/$R/cos(deg2rad($lat)));
    $minLon = $lon - rad2deg($rad/$R/cos(deg2rad($lat)));

    // database call
    $sql = "Select
                Year,
                Id,
                Company_Name,
                Facility_Name,
                City,
                Province,
                Postal_Code,
                Latitude,
                Longitude,
                CAS_Number,
                Substance_Name_En,
                Units,
                Air_Emissions_Tot,
                Water_Releases_Tot,
                Land_Releases_Tot,
                acos(sin(:lat)*sin(radians(Latitude)) + cos(:lat)*cos(radians(Latitude))*cos(radians(Longitude)-:lon)) * :R As D
            From (
                Select
                    Year,
                    Id,
                    Company_Name,
                    Facility_Name,
                    City,
                    Province,
                    Postal_Code,
                    Latitude,
                    Longitude,
                    CAS_Number,
                    Substance_Name_En,
                    Units,
                    Air_Emissions_Tot,
                    Water_Releases_Tot,
                    Land_Releases_Tot
                From `table 2`
                Where Latitude Between :minLat And :maxLat
                  And Longitude Between :minLon And :maxLon
            ) As FirstCut
            Where acos(sin(:lat)*sin(radians(Latitude)) + cos(:lat)*cos(radians(Latitude))*cos(radians(Longitude)-:lon)) * :R < :rad
            Order by D ASC";
    $params = array(
        'lat'    => deg2rad($lat),
        'lon'    => deg2rad($lon),
        'minLat' => $minLat,
        'minLon' => $minLon,
        'maxLat' => $maxLat,
        'maxLon' => $maxLon,
        'rad'    => $rad,
        'R'      => $R,
    );

    $points = $db->prepare($sql);
    $points->execute($params);
    $polluters = $points->fetchAll();
    
    // parse data into array
    foreach ($polluters as $item) {
        //echo "yo"; 
        //var_dump($item->Id);
        //var_dump($arr);
        //echo $i;
        if ($i == -1 || $item->Id != $data[$i]['Id']) {
            //echo "hi";
            //var_dump($item->Company_Name);
            // create location listing
            $location = array();
            $location['Id'] = $item->Id;
            $location['Year'] = $item->Year;
            $location['Company_Name'] = $item->Company_Name;
            $location['Facility_Name'] = $item->Facility_Name;
            $location['City'] = $item->City;
            $location['Province'] = $item->Province;
            $location['Postal_Code'] = $item->Postal_Code;
            $location['Latitude'] = $item->Latitude;
            $location['Longitude'] = $item->Longitude;
            $location['Distance'] = $item->D;
            $location['Pollutants'] = array();

            // append to results array
            $data[] = $location;
            $i++;
        }

        // create substance listing
        $substance = array();
        $substance['CAS_Number'] = $item->CAS_Number;
        $substance['Substance_Name_En'] = $item->Substance_Name_En;
        $substance['Units'] = $item->Units;
        $substance['Air_Emissions_Tot'] = $item->Air_Emissions_Tot;
        $substance['Water_Releases_Tot'] = $item->Water_Releases_Tot;
        $substance['Land_Releases_Tot'] = $item->Land_Releases_Tot;
        $substance['Total'] = floatval($item->Air_Emissions_Tot) + floatval($item->Water_Releases_Tot) + floatval($item->Land_Releases_Tot);
        //var_dump($substance);
        // append to latest location object if substance has actually been released into the air / water / land
        if ($substance['Total'] > 0) {
            appendSubstance($data, $substance);
        }
    }

    // order pollutants by quantity
    foreach ($data as $key => $item) {
        usort($data[$key]['Pollutants'], "compare");
    }

    // filter out locations which have no measurable pollutants set
    foreach ($data as $key => $item) {
        //echo count($data[$key]['Pollutants']);
        if (count($data[$key]['Pollutants']) <= 0) {
           unset($data[$key]);
        } 
    }

    // only return maxItems number of items
    if (count($data) > $max) {
        $data = array_slice($data, 0, $max);
    }


    // output JSON or JSONP callback
    if (array_key_exists('callback', $_GET)){
        header('Content-Type: text/javascript; charset=utf8');
        header('Access-Control-Allow-Origin: http://www.example.com/');
        header('Access-Control-Max-Age: 3628800');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        $callback = $_GET['callback'];
        echo $callback.'('.json_encode($data).');';
    }
    else {
        header('Content-Type: application/json; charset=utf8');
        echo json_encode($data);
    }
?>