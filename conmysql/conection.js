const mysql = require('mysql')
module.exports=()=>
mysql.createConnection({
    host:'bfwthktn1tteffsvoibv-mysql.services.clever-cloud.com',
    user:'uyd2vbu1m86esb32',
    password:'p2M5kITaqXVNTvoEyU9v',
    database:'bfwthktn1tteffsvoibv',
    port:'3306'
})