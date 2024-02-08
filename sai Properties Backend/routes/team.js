const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()


router.get('/team', (req, res) => {
    const sql = `
    SELECT admin_id, fname, lname, profile_image, designation, email FROM stage_site.tbl_admin where status = 'Active';
    `;
  
    db.query(sql, (err, results) => {
      const result = utils.createResult(err, results);
  
      if (err) {
        res.status(500).json(result);
      } else {
        res.json(result);
      }
    });
  });

  module.exports = router