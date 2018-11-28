'use strict';

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  
  password : '',
  database : 'laiterekisteri'
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = 
{
    fetchTypesRevised : function()
    {
        return new Promise((resolve, reject) => {

          connection.query('SELECT * kayttaja', function(error, results, fields){
            if ( error ){
              console.log("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
              reject("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
            }
            else
            {
              console.log("Data (rev) = " + JSON.stringify(results));
              resolve(results);
            }    
        })
      })
    },

    createUser: function(req, res){

        console.log("body (CREATE): " + JSON.stringify(req.body));
        let c = req.body;

        connection.query('INSERT INTO kayttaja (tunnus, salasana, nimi, puhnro, osoite) VALUES (?, ?, ?, ?, ?)', [c.tunnus, c.salasana, c.nimi, c.puhnro, c.osoite],
          function(error, results, fields){
          if ( error ){
            console.log("Virhe lisättäessä dataa Asiakas-tauluun, syy: " + error);
            res.send(error);
          }
          else
          {
            console.log("Data = " + JSON.stringify(results));
            res.statusCode = 201;
            
            res.send(c);
          }
      });
    },

    uusiLaite: function (req, res) {

        console.log("body (CREATE): " + JSON.stringify(req.body));
        let c = req.body;

        connection.query('INSERT INTO laite (tyyppi_id, merkki, malli, omistaja, nimi, kuvaus) VALUES (?, ?, ?, ?, ?, ?)', [c.tyyppi, c.merkki, c.malli, c.omistaja, c.nimi, c.kuvaus],
            function (error, results, fields) {
                if (error) {
                    console.log("Virhe lisättäessä dataa laite-tauluun, syy: " + error);
                    res.send(error);
                }
                else {
                    console.log("Data = " + JSON.stringify(results));
                    res.statusCode = 201;

                    res.send(c);
                }
            });
    },

    updateUser: function (req, res) {

        console.log("body (CREATE): " + JSON.stringify(req.body));
        let c = req.body;

        connection.query('UPDATE kayttaja SET nimi = ?, puhnro = ?, osoite = ? WHERE tunnus = ?', [c.nimi, c.puhnro, c.osoite, c.tunnus],
            function (error, results, fields) {
                if (error) {
                    console.log("Virhe lisättäessä dataa kayttaja-tauluun, syy: " + error);
                    res.send(error);
                }
                else {
                    console.log("Data = " + JSON.stringify(results));
                    res.statusCode = 201;

                    res.send(c);
                }
            });
    },

    updateLaite: function (req, res) {

        console.log("body (CREATE): " + JSON.stringify(req.body));
        let c = req.body;

        connection.query('UPDATE laite SET malli = ?, tyyppi_id = ?, omistaja = ?, nimi = ?, kuvaus = ? WHERE merkki = ?', [c.malli, c.tyyppi, c.omistaja, c.nimi, c.kuvaus, c.merkki],
            function (error, results, fields) {
                if (error) {
                    console.log("Virhe lisättäessä dataa laite-tauluun, syy: " + error);
                    res.send(error);
                }
                else {
                    console.log("Data = " + JSON.stringify(results));
                    res.statusCode = 201;

                    res.send(c);
                }
            });
    },

    checkUser: function (tunnus) {
        return new Promise((resolve, reject) => {

            connection.query('SELECT * FROM kayttaja WHERE tunnus =?', [tunnus], function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa käyttäjätunnusta taulusta, syy: " + error);
                    reject("Virhe haettaessa dataa kayttaja-taulusta, syy: " + error);
                }
                else {
                    console.log("Data (rev) = " + JSON.stringify(results));
                    resolve(results);
                }
            })
        })
    },

    

    haeLaitteet: function (req, res) {
        return new Promise((resolve, reject) => {

            connection.query('SELECT * FROM laite', function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa laitteita taulusta, syy: " + error);
                    reject("Virhe haettaessa dataa laite-taulusta, syy: " + error);
                }
                else {
                    console.log("Data (rev) = " + JSON.stringify(results));
                    resolve(results);
                }
            })
        })
    },

    haeMuokattava: function (laite_id) {
        return new Promise((resolve, reject) => {

            connection.query('SELECT * FROM laite WHERE laite_id =?', [laite_id], function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa laitteita taulusta, syy: " + error);
                    reject("Virhe haettaessa dataa laite-taulusta, syy: " + error);
                }
                else {
                    console.log("Data (rev) = " + JSON.stringify(results));
                    resolve(results);
                }
            })
        })
    },

    

    poistaLaite: function (laite_id) {
        return new Promise((resolve, reject) => {

            connection.query('DELETE FROM laite WHERE laite_id =?', [laite_id], function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa käyttäjätunnusta taulusta, syy: " + error);
                    reject("Virhe haettaessa dataa kayttaja-taulusta, syy: " + error);
                }
                else {
                    console.log("Data (rev) = " + JSON.stringify(results));
                    resolve(results);
                }
            })
        })
    },
}
