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
        'SELECT tbl_name FROM sqlite_master;',
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
    var requiredNames = ['messages'];

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
        'CREATE TABLE messages ( date INT, sender VARCHAR(255), content TEXT );' +
        'CREATE INDEX date_ind ON messages(date);',
        (error) => {
            if (error) {
                dbErrorHandler('Message table creation failed');
            } else {
                console.log('Message table created');
            }
        }
    );
}

function getMessagesSinceDate(date, callback) {
    // Query all messages sent after given date, and call optional callback function.
    // The first parameter of the callback is err.
    // The second parameter of the call back is an array of message objects.
    db.all(
        'SELECT rowid AS id, * FROM messages WHERE date >= ' + date + ' ORDER BY date ASC',
        (err, rows) => {
            if (err) {
                if (callback) {
                    callback(err);
                }
            } else if (callback) {
                callback(err, rows);
            }
        }
    );
};

function getMessagesSinceID(id, callback) {
    // Query all messages sent after given message ID, and call opetional callback function.
    // The first parameter of the callback is err.
    // The second parameter of the callback is an array of message objects.

    // Find the date of the given message ID.
    db.get(
        'SELECT date FROM messages WHERE rowid = ' + id,
        (err, row) => {
            if (err) {
                if (callback) {
                    callback(err);
                }
            } else {
                getMessagesSinceDate(row.date, callback);
            }
        }
    );
};

// Export functions.
exports.getMessagesSinceDate = getMessagesSinceDate;
exports.getMessagesSinceID = getMessagesSinceID;
