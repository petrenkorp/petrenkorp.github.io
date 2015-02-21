<?php
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Selection of points within specified radius of given lat/lon      (c) Chris Veness 2008-2014  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    $db_host = "localhost";
    $db_name = "code";
    $db_user = "root";
    $db_pass = "";
    $db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    $lat = 43.6502840; //$_GET['lat']; // latitude of centre of bounding circle in degrees
    $lon = -79.3843010; //$_GET['lon']; // longitude of centre of bounding circle in degrees
    $rad = 1; //$_GET['rad']; // radius of bounding circle in kilometers

    $R = 6371;  // earth's mean radius, km

    // first-cut bounding box (in degrees)
    $maxLat = $lat + rad2deg($rad/$R);
    $minLat = $lat - rad2deg($rad/$R);
    // compensate for degrees longitude getting smaller with increasing latitude
    $maxLon = $lon + rad2deg($rad/$R/cos(deg2rad($lat)));
    $minLon = $lon - rad2deg($rad/$R/cos(deg2rad($lat)));

    $sql = "Select Company_Name, Substance_Name_En, Latitude, Longitude,
                acos(sin(:lat)*sin(radians(Latitude)) + cos(:lat)*cos(radians(Latitude))*cos(radians(Longitude)-:lon)) * :R As D
            From (
                Select Company_Name, Substance_Name_En, Latitude, Longitude
                From `table 2`
                Where Latitude Between :minLat And :maxLat
                  And Longitude Between :minLon And :maxLon
            ) As FirstCut
            Where acos(sin(:lat)*sin(radians(Latitude)) + cos(:lat)*cos(radians(Latitude))*cos(radians(Longitude)-:lon)) * :R < :rad
            Order by D";
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
    $result = $points->fetchAll();
?>

<html>
<table>
    <?php foreach ($result as $point) { ?>
    <tr>
        <td><?= $point->Company_Name ?></td>
        <td><?= $point->Substance_Name_En ?></td>
        <td><?= number_format($point->D,1) ?></td>
        <td><?= number_format($point->Latitude,3) ?></td>
        <td><?= number_format($point->Longitude,3) ?></td>
    </tr>
    <?php } ?>
</table>
</html>