const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.get("/properties", (req, res) => {
  const sql = `
  SELECT 
  p.property_key,
  p.main_type,
  p.typeresidential,
  p.typecommercial,
  p.price,
  p.title,
  p.purpose,
  p.area,
  
  s.name AS society_name,
  s.amenities,
  GROUP_CONCAT(pp.photo) AS photos,
  l.location,
  c.city,
  st.state_name
FROM 
  stage_site.tbl_property p
JOIN
  stage_site.tbl_society s ON p.society_id = s.society_id
LEFT JOIN
  stage_site.tbl_property_photo pp ON p.property_id = pp.property_id
LEFT JOIN
  stage_site.tbl_location l ON s.location_id = l.location_id
LEFT JOIN
  stage_site.tbl_city c ON s.city_id = c.city_id
LEFT JOIN
  stage_site.tbl_state st ON s.state_id = st.state_id
GROUP BY
  p.property_key, p.main_type, p.typeresidential, p.typecommercial, p.price, p.area,p.purpose,p.title , s.name, s.amenities, l.location, c.city, st.state_name;

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


//property details
router.get('/properties/:propertyKey', (req, res) => {
    const propertyKey = req.params.propertyKey;
  
    const query = `
    SELECT 
    p.property_key,
    p.main_type,
    p.typeresidential,
    p.typecommercial,
    p.price,
    p.title,
    p.purpose,
    p.area,
    p.bathroom,
    p.bedroom,
    p.furnishing,
    p.facing,
    p.floor,
    p.total_floor,
    p.coverdparking,
    p.openparking,
    p.available_from,
    p.customer_type,
    p.view,
    s.name AS society_name,
    s.amenities,
    
    s.main_type AS project_type, -- Adding the project type column
    GROUP_CONCAT(pp.photo) AS photos,
    GROUP_CONCAT(fp.photo) AS floor_plans,
    l.location,
    c.city,
    st.state_name,
    s.description,
    s.name 
FROM 
    stage_site.tbl_property p
JOIN
    stage_site.tbl_society s ON p.society_id = s.society_id
LEFT JOIN
    stage_site.tbl_property_photo pp ON p.property_id = pp.property_id
LEFT JOIN
    stage_site.tbl_property_photo fp ON p.property_id = fp.property_id
LEFT JOIN
    stage_site.tbl_location l ON s.location_id = l.location_id
LEFT JOIN
    stage_site.tbl_city c ON s.city_id = c.city_id
LEFT JOIN
    stage_site.tbl_state st ON s.state_id = st.state_id
WHERE
    p.property_key = ?
GROUP BY
    p.property_key, p.main_type, p.typeresidential, p.typecommercial, p.price, p.title, p.purpose, s.name, s.amenities, l.location, c.city, st.state_name, p.area, p.bathroom, p.bedroom, p.furnishing, p.facing, p.floor, p.total_floor, p.coverdparking, p.openparking, p.available_from, p.customer_type, p.view, s.main_type,s.description;


 `;
  
    db.query(query, [propertyKey], (err, results) => {
        const result = utils.createResult(err, results);
    
        if (err) {
          res.status(500).json(result);
        } else {
          res.json(result);
        }
    });
});

    

module.exports = router;
