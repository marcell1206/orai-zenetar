import express from 'express';
import pool from './data/db.js';

const app = express();

// kész
app.get('/eloadok', async (req, res) => {
    let sql = "SELECT nev FROM eloadok ORDER BY nev";
    let eredmeny = await pool.query(sql);
    res.json(eredmeny)
});

app.get('/eloadok/:orszag', async (req, res) => {
    const orszag = req.params.orszag;
    let sql = "SELECT * FROM eloadok WHERE orszag = ?";
    let eredmeny = await pool.query(sql, [orszag]);
    res.json(eredmeny);
});

app.get('eloadok/:id', async (req, res) => {
    let id = req.params.id;
    //let sql = "SELECT * FROM eloadok WHERE id = ? (SELECT id, cim, ev, mufaj, hossz from albumok INNER JOIN eloadok ON eloadok.id = albumok.eloado_id WHERE eloadok.id = ?)";
    let sql = "SELECT * FROM eloadok WHERE id = ?";
    let eredmeny = await pool.query(sql, [id]);
    res.json(eredmeny);
});

// kész
app.get('/albumok', async (req, res) => {
    let sql = "SELECT albumok.id, cim, eloadok.nev AS eloado, ev, mufaj, hossz FROM albumok INNER JOIN eloadok ON eloadok.id = albumok.eloado_id ORDER BY ev, cim"
    let eredmeny = await pool.query(sql);
    res.json(eredmeny);
});

app.get('/albumok/')

app.get('/orszagok', async (req, res) => {
    let sql = "SELECT orszag FROM eloadok GROUP BY orszag";
    let eredmeny = await pool.query(sql);
    res.json(eredmeny);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

