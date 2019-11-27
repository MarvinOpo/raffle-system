const year = '2018';

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'raffle_system'
});

conn.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    let entriesTbl = `create table if not exists entries(
                            id int primary key auto_increment,
                            raffle_id int not null unique, 
                            name varchar(150) not null
                        )`;

    conn.query(entriesTbl, function (err, results, fields) {
        if (err) throw err;

        console.log("Entries Table created");

    });

    conn.end(function (err) {
        if (err) throw err;
    });
});