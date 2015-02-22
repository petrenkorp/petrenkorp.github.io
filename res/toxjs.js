/**
 * Created by Rafik on 2015-02-21.
 */


var resultOfTest = generateChemLink("benzene", function(url){ console.log('url:' + url)});

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
}

