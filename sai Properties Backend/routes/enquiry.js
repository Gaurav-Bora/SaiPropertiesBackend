const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()


//post a enquiry

// router.post("/postEnquiry", (request, response) => {
//     const {enquiry_key,name, email, mobile1, profession, remark, category,   user_type, title, purpose, enquiry_status,  source,  main_type, type,  city_id, location_id,  min_budget, max_budget, possession_date,  gender,state_id, verification_status,vharge} = request.body  
    
//     db.query(
//       " INSERT INTO tbl_enquiry (enquiry_key, name, email, mobile1, profession, remark, category, user_type, title, purpose,enquiry_status, source, main_type, type, city_id, location_id, min_budget, max_budget, possession_date, gender, state_id, verification_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?,  ?, ?, ?,?); ",
//       [enquiry_key,name, email, mobile1, profession, remark, category,   user_type, title, purpose, enquiry_status,  source,  main_type, type,  city_id, location_id,  min_budget, max_budget, possession_date,  gender,state_id, verification_status,vharge],
//       (error, result) => {
//         response.send(utils.createResult(error, result))
//       }
//     )
//   })
router.post("/postEnquiry", (request, response) => {
    const { enquiry_key, name, email, mobile1, profession, remark, category, user_type, title, purpose, enquiry_status, source, main_type, type, city_id, location_id, min_budget, max_budget, possession_date, gender, state_id, verification_status, vharge } = request.body;

    db.query(
        "INSERT INTO tbl_enquiry (enquiry_key, name, email, mobile1, profession, remark, category, user_type, title, purpose,enquiry_status, source, main_type, type, city_id, location_id, min_budget, max_budget, possession_date, gender, state_id, verification_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?,  ?, ?, ?,?);",
        [enquiry_key, name, email, mobile1, profession, remark, category, user_type, title, purpose, enquiry_status, source, main_type, type, city_id, location_id, min_budget, max_budget, possession_date, gender, state_id, verification_status, vharge],
        (error, result) => {
            if (error) {
                response.send(utils.createResult(error, null));
            } else {
                // Fetch the last inserted ID
                db.query("SELECT LAST_INSERT_ID() as lastInsertId", (err, rows) => {
                    if (err) {
                        response.send(utils.createResult(err, null));
                    } else {
                        const lastInsertId = rows[0].lastInsertId;
                        response.send(utils.createResult(null, { lastInsertId }));
                    }
                });
            }
        }
    );
});


  router.get("/id", (request, response) => {
    const id = request.params.id
    const statement = `SELECT * from tbl_annexure`
    db.query(statement, [id], (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })

  // router.post('/postEnquiry', async (req, res) => {
  //   try {
  //     const {
  //       name,
  //       email,
  //       mobile1,
  //       profession,
  //       address,
  //       remark,
  //       vharge,
  //       category,
  //       user_type,
  //       use_purpose,
  //       title,
  //       purpose,
  //       verified_by,
  //       enquiry_status,
  //       enquiry_loss_reason,
  //       enquiry_hold_reason,
  //       attended_name,
  //       source,
  //       reference,
  //       main_type,
  //       type,
  //       society_id,
  //       city_id,
  //       location_id,
  //       sublocation_id,
  //       min_budget,
  //       max_budget,
  //       possession_date,
  //       status,
  //       permanent_address,
  //       company_address,
  //       food_type,
  //       propertyamenities,
  //       gender,
  //       state_id,
  //       categories,
  //       paid,
  //       verification_status
  //     } = req.body;
  
  //     // const connection = await pool.getConnection();
  
  //     // Your SQL Query
  //     const sql = `
  //       INSERT INTO tbl_enquiry (
  //         name, email, mobile1, profession,   address, remark, vharge, category,   user_type,
  //         use_purpose, title, purpose, verified_by, enquiry_status, enquiry_loss_reason, 
  //         enquiry_hold_reason, attended_name, source, reference, main_type, type, society_id,
  //         city_id, location_id, sublocation_id, min_budget, max_budget, possession_date, 
  //         status, permanent_address, company_address, food_type, propertyamenities, gender,
  //         state_id, categories, paid, verification_status
  //       ) VALUES (?, ?, ?, ?,   NULL, ?, NULL, ?,   ?, NULL, ?, ?, NULL, ?, NULL, NULL, NULL, ?, NULL, ?, ?,NULL, ?, ?, NULL, ?, ?, ?, Active, NULL, NULL, NULL, NULL, ?, ?, NULL, NULL, ?)
  //     `;
  
  //     const [result] = await connection.execute(sql, [
  //       name, email, mobile1, profession, address, remark, vharge, category, user_type,
  //       use_purpose, title, purpose, verified_by, enquiry_status, enquiry_loss_reason, 
  //       enquiry_hold_reason, attended_name, source, reference, main_type, type, society_id,
  //       city_id, location_id, sublocation_id, min_budget, max_budget, possession_date, 
  //       status, permanent_address, company_address, food_type, propertyamenities, gender,
  //       state_id, categories, paid, verification_status
  //     ]);
  
  //     connection.release();
  
  //     res.status(200).json({ success: true, message: 'Enquiry inserted successfully', result });
  //   } catch (error) {
  //     console.error('Error inserting enquiry:', error);
  //     // res.status(500).json({ success: false, message: 'Internal Server Error' });
  //   }
  // });

  // INSERT INTO `stage_site`.`tbl_enquiry` (`enquiry_key`, `name`, `email`, `mobile1`, `profession`, `address`, `remark`, `vharge`, `category`, `user_type`, `use_purpose`, `title`, `purpose`, `verified_by`, `enquiry_status`, `enquiry_loss_reason`, `enquiry_hold_reason`, `attended_name`, `source`, `reference`, `main_type`, `type`, `society_id`, `city_id`, `location_id`, `sublocation_id`, `min_budget`, `max_budget`, `possession_date`, `status`, `permanent_address`, `company_address`, `food_type`, `propertyamenities`, `gender`, `state_id`, `categories`, `paid`, `verification_status`) VALUES ('na', 'xyz', 'xyz@gmail.com', '123', 'service', 'na', 'pqrst', 'na', 'furnished', 'family', 'na', '3BHK', 'rent', 'na', 'new', 'na', 'na', 'na', 'saiprop.com', 'na', 'comercial', 'cde', 'na', '0', 'pqr', '0', '2000', '3000', '2024-01-12', 'Active', 'na', 'na', 'na', 'na', 'male', '13', 'na', 'na', '0');










  
  module.exports = router