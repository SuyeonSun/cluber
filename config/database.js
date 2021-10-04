const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'suyeon',
    password : 'sun5821',
    database : 'grad_pro',
  });
  connection.connect((err)=>{
      if(err) throw err;
      console.log('db connected');
  });
  
  // connection.query(`SELECT * FROM board`, function(err, results){
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(results);
  // })

module.exports = connection; /* connection 객체 */