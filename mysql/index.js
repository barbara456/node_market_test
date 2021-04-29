var mysql = require('mysql');
var config = require('../config/default.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});



class Mysql {
    constructor() {

    }
    queryClothes() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from nodeclothes', function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results)
            });
        })

    }
    queryFurnitrue() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from nodefurnitrue ', function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results)
            });
        })

    }
    queryElectric() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from nodeelectric ', function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results)
            });
        })

    }
}

module.exports = new Mysql()