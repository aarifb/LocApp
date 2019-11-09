import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "LocationApp.db";
const database_version = "1.0";
const database_displayname = "LocationApp Offline Database";
const database_size = 200000;

export default class Database {

  initDB() {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              // db.executeSql('drop table Settings');
              db.executeSql('SELECT 1 FROM Settings LIMIT 1').then(() => {
                console.log("Database is ready ... executing query ...");
                // db.transaction((tx) => {
                //   tx.executeSql('INSERT INTO DailyTimeLog VALUES (?,?,?,?,?)', [1, 1,'17-Oct-2019','18-Oct-2019','19-Oct-2019']);
                // })
                

              }).catch((error) => {
                console.log("Received error: ", error);
                console.log("Database not yet ready ... populating data");
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS Settings (Id, OfficeLocation,StartTime,EndTime,StartBreakTime,StopBreakTime)');
                }).then(() => {
                  console.log("Table Settings created successfully");
                  db.transaction((tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS DailyTimeLog (Id, EmpId,LogDate,CheckInDateTime,CheckOutDateTime)');
                  }).then(() => {
                    console.log("Table DailyTimeLog created successfully");
                  }).catch(error => {
                    console.log(error);
                  });
                }).catch(error => {
                  console.log(error);
                });
              });



              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
    });
  };

  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  };

  listSettings() {
    return new Promise((resolve) => {
      const settings = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT p.Id, p.OfficeLocation,p.StartTime,p.EndTime,p.StartBreakTime,p.StopBreakTime FROM Settings p', []).then(([tx, results]) => {
            console.log("Query completed");
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(`Id: ${row.Id}, Office Location: ${row.OfficeLocation}, StartTime: ${row.StartTime}, EndTime: ${row.EndTime}, StartBreakTime: ${row.StartBreakTime}, StopBreakTime: ${row.StopBreakTime}`)
              const { Id, OfficeLocation, StartTime, EndTime, StartBreakTime, StopBreakTime } = row;
              settings.push({
                Id,
                OfficeLocation,
                StartTime,
                EndTime,
                StartBreakTime,
                StopBreakTime
              });
            }
            console.log(settings);
            resolve(settings);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  settingsById(id) {
    console.log(id);
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Settings LIMIT 1').then(([tx, results]) => {
            console.log('results : ' + results);
            console.log('results length : ' + results.rows.length);
            if (results.rows.length > 0) {
              let row = results.rows.item(0);
              resolve(row);
            }
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log("error : " + err);
        });
      }).catch((err) => {
        console.log("error1 : " + err);
      });
    });
  }

  addSettings(prod) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Settings VALUES (?, ?,?,?,?,?)', [prod.Id, prod.OfficeLocation, prod.StartTime, prod.EndTime, prod.StartBreakTime, prod.StopBreakTime]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  updateSettings(id, prod) {
    this.isExist = 0;
    return new Promise((resolve) => {
      this.initDB().then((db) => {

        db.transaction((tx) => {
          tx.executeSql('UPDATE Settings SET OfficeLocation = ?,StartTime = ?,EndTime = ?,StartBreakTime = ?,StopBreakTime = ? WHERE Id = ?', [prod.OfficeLocation, prod.StartTime, prod.EndTime, prod.StartBreakTime, prod.StopBreakTime, id]).then(([tx, results]) => {
            resolve(results);
            console.log('****** UPDATED : ' + results);
          });

        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log("error : " + err);
        });


      }).catch((err) => {
        console.log(err);
      });



    });
  }

  deleteSettings(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Settings WHERE Id = ?', [id]).then(([tx, results]) => {
            console.log('*************** DELETED : ' + results);
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  hasSetting(id) {
    console.log(id);
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Settings WHERE Id = ?', [id]).then(([tx, results]) => {
            console.log('results : ' + results);
            console.log('results length : ' + results.rows.length);
            if (results.rows.length > 0) {
              resolve(true);
            }
            else {
              resolve(false);
            }
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log("error : " + err);
        });
      }).catch((err) => {
        console.log("error1 : " + err);
      });
    });
  }

  listDailyLogs() {
    return new Promise((resolve) => {
      const logs = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('select p.Id, p.EmpId,p.LogDate,p.CheckInDateTime,p.CheckOutDateTime from DailyTimeLog p', []).then(([tx, results]) => {
            console.log("==================================================Query completed");
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(`Id: ${row.Id}, EmpId: ${row.EmpId}, LogDate: ${row.LogDate}, CheckInDateTime: ${row.CheckInDateTime}, CheckOutDateTime: ${row.CheckOutDateTime}`)
              const { Id, EmpId, LogDate, CheckInDateTime, CheckOutDateTime} = row;
              logs.push({
                Id,
                EmpId,
                LogDate,
                CheckInDateTime,
                CheckOutDateTime
              });
            }
            console.log(logs);
            resolve(logs);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

}
