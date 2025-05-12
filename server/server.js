//Imports!
const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

//Establishing a conection to the database and implementing express server.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'reptiremind'
})
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());


//Show users
connection.connect()
app.get('/get-users', (req, res) => {
    connection.query(`SELECT users.Id AS userId, users.Username AS userName, users.Password AS userPass, users.Email AS userMail FROM users;`,
        //New names for tables
        /*userId, userName, userPass, userMail */
        (err, rows, fields) => {
            if (err) throw err;
            return res.json(rows);

        }
    )
})

/* REMINDER SECTION */

//adding Reminders
app.post('/add-Reminder', (req, res) => {
    const newReminder = {
        remiPetId: req.body.petsId,
        remiDesc: req.body.description,
        remiDnT: req.body.dateAndTime
    };
    connection.query(
        `INSERT INTO reminder (PetsId, Description, DateAndTime) VALUES (?,?,?)`,
        [newReminder.remiPetId, newReminder.remiDesc, newReminder.remiDnT],
        (err, result) => {
            if (err) throw err;
            res.json({ success: true, id: result.insertId });
        }
    );
});
//Geting Reminders
app.get('/get-Reminder', (req, res) => {
    connection.query(`SELECT 
            reminder.Id AS remiId, 
            reminder.PetsId AS remiPetId,
            pets.Name AS petName, 
            reminder.Description AS remiDesc, 
            reminder.DateAndTime AS RemiDnT 
        FROM reminder
        JOIN pets ON reminder.PetsId = pets.Id;`,
        //New names for tables
        /*remiId, remiPetId, remiDesc, RemiDnT */
        (err, rows, fields) => {
            if (err) throw err;
            return res.json(rows);

        }
    )
})
//Editing reminders based on Id
app.put('/put-Reminder/:Id', (req, res) => {
    const reminderId = req.params.Id;
    const editReminder = {
        remiPetId: req.body.petId,
        remiDesc: req.body.description,
        remiDnT: req.body.dateAndTime
    };
    connection.query(
        `UPDATE reminder SET PetsId = ?, Description = ?, DateAndTime = ? WHERE Id = ?`,
        [editReminder.remiPetId, editReminder.remiDesc, editReminder.remiDnT, reminderId],
        (err, result) => {
            if (err) throw err;
            res.json({ success: true });
        }
    );
});
//Deleting Reminder Based on Id
app.delete('/delete-Reminder/:Id', (req, res) => {
    const reminderId = req.params.Id
    connection.query(
        `DELETE FROM reminder WHERE Id = ?`,
        [reminderId],
        (err, result) => {
            if (err) throw err;
            res.json({ success: true });
        }
    );
});


/* PET SECTION */

//Adding a new pet
app.post('/add-Pet', (req, res) => {
    const newPet = {
        petName: req.body.name,
        petSpec: req.body.species,
        petBday: req.body.birthDay,
        petTime: req.body.feedingTime,
        petHumi: req.body.humidity,
        petTemp: req.body.temperature
    };
    connection.query(
        `INSERT INTO pets (Name, Species, Birthday, FeedTime, Humidity, Temp) VALUES (?,?,?,?,?,?)`,
        [newPet.petName, newPet.petSpec, newPet.petBday, newPet.petTime, newPet.petHumi, newPet.petTemp],
        (err, result) => {
            if (err) throw err;
            res.json({ success: true, id: result.insertId });
        }
    );
});
//geting Pets
app.get('/get-Pets', (req, res) => {
    connection.query(`SELECT pets.Id AS petId, pets.Name AS petName, pets.Species AS petSpec, pets.Birthday AS petBday, pets.FeedTime AS petTime, pets.Humidity AS petHumi, pets.Temp AS petTemp FROM pets;`,
        //New names for tables
        /*petName, petSpec, petBday, petTime, petHumi, petTemp */
        (err, rows, fields) => {
            if (err) throw err;
            return res.json(rows);

        }
    );
});
//Editing pets based on Id
app.put('/put-Pet/:Id', (req, res) => {
    const petId = req.params.Id;
    const editPet = {
        petName: req.body.name,
        petSpec: req.body.species,
        petBday: req.body.birthDay,
        petTime: req.body.feedingTime,
        petHumi: req.body.humidity,
        petTemp: req.body.temperature
    };
    connection.query(
        `UPDATE pets SET Name = ?, Species = ?, Birthday = ?, FeedTime = ?, Humidity = ?, Temp = ? WHERE Id = ?`,
        [editPet.petName, editPet.petSpec, editPet.petBday, editPet.petTime, editPet.petHumi, editPet.petTemp, petId],
        (err, result) => {
            if (err) throw err;
            res.json({ success: true });
        }
    );
});
//deleting pet based on Id.
app.delete('/delete-Pet/:Id', (req, res) => {
    const petsId = req.params.Id
    connection.query(
        `DELETE FROM pets WHERE Id = ?`,
        [petsId],
        (err, result) => {
            if (err) throw err;
            res.json({ success: true });
        }
    );
});



//connection to the server so it runs!
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});