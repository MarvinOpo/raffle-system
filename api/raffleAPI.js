const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    timezone: 'utc',
    database: 'raffle_system'
});

exports.insert = function (body) {
    return new Promise(function (resolve, reject) {
        let sql = `INSERT INTO entries values `;

        let values = [];

        for (let i = 0; i < body.length; i++) {
            let entry = body[i];

            sql += `('0', ?, ?)`

            values.push(entry.ID);
            values.push(entry.Name);

            if(i < body.length - 1) sql += `, `;
        }

        conn.query(sql, values, function (err, result) {
            if (err) reject(new Error("Insert entry failed"));
            resolve();
        });
    });
}

exports.count = function () {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT COUNT(*) as count FROM entries `;

        conn.query(sql, function (err, result) {
            if (err) reject(new Error("Count entry failed"));
            resolve(result);
        });
    });
}

exports.get_winner = function (offset) {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT * FROM entries LIMIT 1 OFFSET ? `;

        let values = [parseInt(offset)];

        conn.query(sql, values, function (err, result) {
            if (err) reject(new Error("Get winner failed"));
            resolve(result);
        });
    });
}

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        let sql = `DELETE FROM entries WHERE raffle_id = ? `;

        let values = [parseInt(id)];

        conn.query(sql, values, function (err, result) {
            console.log(err);
            if (err) reject(new Error("Delete winner failed"));
            resolve();
        });
    });
}
