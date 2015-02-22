<?php

include('./httpful.phar');

$chemName = 'Catechol';

//$uri = 'http://toxgate.nlm.nih.gov/cgi-bin/sis/search2/x?dbs+hsdb:' + $chemName;
 $uri = 'http://toxgate.nlm.nih.gov/cgi-bin/sis/search2/x?dbs+hsdb:benzene+leukemia';

//$response = \Httpful\Request::get($uri)  // Will parse based on Content-Type
//    ->expectsXml()              // from the response, but can specify
//    ->send();                   // how to parse via expectsXml too.

$x = simplexml_load_string('<QueryResult><Count>267</Count><DispMax>10</DispMax><Id>35 577 171 1436 6500 908 953 181 133 2554 </Id><TemporaryFile>./temp/~GzwKI3</TemporaryFile><Translation> (  benzene  leukemia  ) Records containing  any of the words <strong>benzene leukemia  </strong><br>Singular and plural forms were searched.</Translation></QueryResult>');
var_dump($x);

//var_dump($response);


/*var resultOfTest = generateChemLink("benzene", function(url){ console.log('url:' + url)});

function generateChemLink(chemicalName, callBack)
{
    var link;

    $.ajax({
        type: "POST",
        url: "http://toxgate.nlm.nih.gov/cgi-bin/sis/search2",
        data: "queryxxx=" + chemicalName + "&database=hsdb&Stemming=1&" + "and=1&second_search=1&gateway=1&chemsyn=1",
        crossDomain: true,
        success: secondQuery,
        dataType: "xml"
    });


    function secondQuery(data)
    {
        var xmlDoc = $.parseXML(data);
        var tempRecord =  xmlDoc.find("TemporaryFile");
        $.ajax({
            url:"http://toxgate.nlm.nih.gov/cgi-bin/sis/search2/g?"+tempRecord +":20",
            crossDomain: true,
            success:returnLink
        })

    }

    function returnLink(data)
    {
        var xmlDoc = $.parseXML(data);
        var docno=  xmlDoc.find("DOCNO");
        callBack("http://toxgate.nlm.nih.gov/cgi-bin/sis/search2/r?dbs+hsdb:@term+@DOCNO+" + docno);
    } 
}*/

?>