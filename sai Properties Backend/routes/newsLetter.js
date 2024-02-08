const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()


router.post('/newsLetter', (req, res) => {
    const { email, status } = req.body;
    const subscribe_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const sql = `
      INSERT INTO tbl_newsletter_subscribers (email, status, subscribe_date) 
      VALUES (?, ?, ?)
    `;
  
    db.query(sql, [email, status, subscribe_date], (err, results) => {
      const result = utils.createResult(err, results);
  
      if (err) {
        res.status(500).json(result);
      } else {
        res.json(result);
      }
    });
  });

  module.exports = router