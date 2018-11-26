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

    checkUser: function (tunnus) {
        return new Promise((resolve, reject) => {

            connection.query('SELECT * FROM kayttaja WHERE tunnus =?', [tunnus], function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa käyttäjätunnusta taulusta, syy: " + error);
                    reject("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
                }
                else {
                    console.log("Data (rev) = " + JSON.stringify(results));
                    resolve(results);
                }
            })
        })
    },

    

    delete : function (req, res) {
      console.log("body: " + JSON.stringify(req.body));
      console.log("params: " + JSON.stringify(req.params));
      let avain = req.params.id;

      connection.query('DELETE FROM Asiakas WHERE Avain=?', [avain],
        function(error, results, fields){
        if ( error ){
          console.log("Virhe poistettaessa dataa Asiakas-taulusta, syy: " + error);
          res.send(error);
        }
        else
        {
          console.log("Data (DELETE)= " + JSON.stringify(results));
          res.statusCode = 204; // No content
          res.send();
        }
    });
  }
}
