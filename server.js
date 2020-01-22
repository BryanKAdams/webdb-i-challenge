const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  // res.send('hit the get GET /api/posts');
  db.select("*")
    .from("accounts")
    .then(acc => {
      res.status(200).json(acc);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: `error getting all accounts!` });
    });
});

server.get("/:id", (req, res) => {
  db.select("*")
    .from("accounts")
    .where("id", "=", req.params.id)
    .then(acc => {
      res.status(200).json(acc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "error getting all accounts!"
      });
    });
});

// add middleware for required fields
server.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(newID => {
      res.status(201).json(newID);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "error adding new account"
      });
    });
});

server.delete("/:id", (req, res) => {
    console.log(req.params.id);
  db.select("*")
    .from("accounts")
    .where(req.params)
    .delete(req.params.id)
    .then(deletedAcc => {
      res.status(204).json(deletedAcc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "error deleting the account"
      });
    });
});

server.put("/:id", (req, res) => {
  db("accounts")
    .where(req.params)
    .update(req.body)
    .then(updatedAcc => {
      res.status(200).json(updatedAcc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "error editing account"
      });
    });
});
module.exports = server;
