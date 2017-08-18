const fs = require('fs');
const sqlite3 = require('sqlite3');
const config = require('./configparser.js');

const db = new sqlite3.Database(
    config.dbFileName,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (error) => {
        if (error) {
            dbErrorHandler('DB open failed');
        } else {
            console.log('DB open successful');
            initializeDB();
        }
    }
);

function dbErrorHandler(err_msg) {
    console.log(err_msg);
    // Exit gracefully.
    db.close();
    process.exit(1);
}

function initializeDB() {
    db.all(
        'SELECT TBL_NAME FROM SQLITE_MASTER;',
        (err, rows) => {
            if (err) {
                dbErrorHandler('Table name query failed');
            } else {
                checkTableNames(
                    rows.map(x => x.tbl_name),
                    null,
                    createMessageTable
                );
            }
        }
    );
}

function checkTableNames(tableNames, ifValid, ifNotValid) {
    console.log('Checking table names...');
    var requiredNames = ['MESSAGES'];

    console.log('Required table names: ' + requiredNames);
    console.log('Existing table names: ' + tableNames);
    if (requiredNames.map(x => tableNames.includes(x)).reduce((a, b) => a&&b)) {
        console.log('All required tables exist');
        if (ifValid) {
            ifValid();
        }
    } else if (ifNotValid) {
        console.log('Some required tables are missing');
        ifNotValid();
    }
}

function createMessageTable() {
    console.log('Creating message table...');
    db.exec(
        'CREATE TABLE MESSAGES ( DATE INT, SENDER VARCHAR(255), CONTENT TEXT );' +
        'CREATE INDEX DATE_IND ON MESSAGES(DATE);',
        (error) => {
            if (error) {
                dbErrorHandler('Message table creation failed');
            } else {
                console.log('Message table created');
            }
        }
    );
}

exports.getMessagesSince = function(date, callback) {
    // Query all messages sent after given date, and call optional callback function.
    // The first parameter of the callback is err.
    // The second parameter of the call back is an array of message objects.
    db.all(
        'SELECT ROWID AS ID, * FROM MESSAGES WHERE DATE > ' + date + ' ORDER BY DATE ASC',
        (err, rows) => callback ? callback(err, rows) : null
    );
};
