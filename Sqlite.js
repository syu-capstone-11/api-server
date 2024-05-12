const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./amatdadb.sqlite3', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Database connected.');
    createTable();
  }
});

function createTables() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS User (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                gender VARCHAR(50),
                display_name VARCHAR(50)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS Post (
                post_id INTEGER PRIMARY KEY AUTOINCREMENT,
                post_title TEXT,
                post_detail TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                latitude DOUBLE,
                longitude DOUBLE,
                category_id INTEGER,
                user_id INTEGER,
                FOREIGN KEY (category_id) REFERENCES Category(category_id),
                FOREIGN KEY (user_id) REFERENCES User(user_id)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS Comment (
                comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
                comment_detail VARCHAR(50),
                user_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                post_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES User(user_id),
                FOREIGN KEY (post_id) REFERENCES Post(post_id)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS Category (
                category_id INTEGER PRIMARY KEY AUTOINCREMENT,
                category_name VARCHAR(50)
            );
        `, (err) => {
            if (err) {
                console.error('Error creating tables ' + err.message);
            } else {
                console.log('Tables created successfully');
            }
            db.close();
        });
    });
}

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
  });
