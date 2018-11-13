﻿    
    <?php
    // Include config file
    require_once "config.php";
    ?>


<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Laiterekisteri</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
        }

        form {
            border: 3px solid #f1f1f1;
        }

        input[type=text], input[type=password] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            cursor: pointer;
            width: 100%;
        }

            button:hover {
                opacity: 0.8;
            }


        .container {
            padding: 16px;
        }
    </style>



    <script>




        $(document).ready(function () {



            $("#rekisteroidy").click(function () {
                $("#dialog").dialog("open");




                $("#tallenna").click(function () {

                    var nimi = $("#nimi").val();
                    var salasana = $("#salasana").val();
                    var oppilaitos = $("#oppilaitos").val();
                    var ika = $("#sposti").val();
                    if (nimi.length < 2) {

                        $("#nimi").css("background", "red");
                        $("#nimimerkkierror").text("Nimimerkki väärä!");
                    }
                    if (salasana.length < 2) {
                        $("#salasana").css("background", "red");
                        $("#salasanaerror").text("Salasana väärä!");
                    }

                    else {
                        $("#dialog").dialog("close");
                        alert("Rekisteröinti onnistui!");
                        $("#salasana").css("background", "white");
                        $("#nimi").css("background", "white");
                        // buttonin saa poistettua: $("#rekisteroidy").remove();

                        $("#salasana").val("");
                        $("#nimi").val("");
                        $("#sposti").val("");
                        $("#puhnro").val("");

                    }

                    $.ajax({
                        type: "POST",
                        url: "yhteydet.php",
                        data: { name: "John" }
                    }).done(function (msg) {
                        alert("Data Saved: " + msg);
                    });

                });

                $('#poxi').click(function () {

                    if ($('#poxi').prop('checked')) {
                        $("#sposti").prop("disabled", false);
                        $("#puhnro").prop("disabled", false);
                        spinneri.spinner("enable");
                    }
                    else {
                        $("#puhnro").prop("disabled", true);
                        $("#sposti").prop("disabled", true);
                        spinneri.spinner("disable");
                    }

                });




                $("#peruuta").click(function () {
                    $("#dialog").dialog("close");
                });

            });


        });
        $(function () {
            $("#dialog").dialog();
            $("#dialog").dialog("close");
        });


    </script>

</head>
<body>



    <div class="container">
        <div class="row">
            <div class="col-sm-4">

                <h2>Laiterekisteri</h2>

                <br />

                <form action="" method="post">
                <label for="kayttaja"> Käyttäjätunnus</label>
                <input type="text" id="kayttaja">
                <label for="salasana"> Salasana</label>
                <input type="text" name="salasana" required>

                <button type="submit" name="login">Kirjaudu</button>
                <button type="button" id="rekisteroidy">Rekisteröidy</button>
                </form>
            </div>
        </div>

    </div>


    <div id="dialog" title="Rekisteröityminen">
        <form>
            <fieldset>
                <label for="nimi"> Käyttäjätunnus: </label>

                <input type="text" name="nimi" id="tunnus" value="" class="text ui-widget-content ui-corner-all">

                <label for="salasana"> Salasana: </label>

                <input type="password" name="salasana" id="salasana" value="" class="text ui-widget-content ui-corner-all">

                <label for="salasana_uusi"> Salasana uudelleen: </label>

                <input type="password" name="salasana_uusi" id="salasana_uusi" value="" class="text ui-widget-content ui-corner-all">




                <label id="nimimerkkierror" value=""> </label>

                <label id="salasanaerror" value=""> </label>


                <div id="kayttajatiedot">

                    <label for="nimi"> Koko nimi: </label>

                    <input id="nimi" type="text">

                    <label for="sposti"> Sähköposti: </label>

                    <input id="sposti" type="text">

                    <label for="puhnro"> Puhelinnumero: </label>

                    <input id="puhnro" type="text" class="text ui-widget-content ui-corner-all">



                </div>


                <button type="submit" id="tallenna">Tallenna</button>

                <button type="button" id="peruuta">Peruuta</button>


            </fieldset>
        </form>
    </div>
</body>
</html>
