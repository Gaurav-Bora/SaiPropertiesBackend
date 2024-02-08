const express = require("express");
const db = require("../../db");
const utils = require("../../utils");

const router = express.Router();

router.get("/states", (req, res) => {
  const query = "SELECT state_id AS id, state_name FROM tbl_state WHERE status = 'Active' AND isdeletedstate = 1";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching states:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json(results);
  });
});

router.get("/city", (req, res) => {
    const stateId = req.query.stateId;
  
    const query = "SELECT c.city_id AS id, c.city  FROM tbl_city c  JOIN tbl_state s ON c.state_id = s.state_id  WHERE c.state_id = ?";
  
    db.query(query, [stateId], (err, results) => {
      if (err) {
        console.error("Error fetching cities:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
  
      res.json(results);
    });
  });

  // Express route for fetching locations based on city ID
router.get("/location", (req, res) => {
    const cityId = req.query.cityId; // assuming cityId is passed as a query parameter
  
    const query = "SELECT location_id AS id, location FROM tbl_location l JOIN tbl_city c on l.city_id = c.city_id  WHERE l.city_id = ?";
  
    db.query(query, [cityId], (err, results) => {
      if (err) {
        console.error("Error fetching locations:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
  
      res.json(results);
    });
  });
  
  

module.exports = router;
