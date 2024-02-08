// INSERT INTO `stage_site`.`tbl_owner` (`fname`, `email`, `mobile1`, `status`, `created_at`, `isdeleted`, `propertyholdertype`, `phkey`, `username`, `pass`) VALUES ('abc', 'abc@gmail.com', '123', 'InActive', '2019-02-02 17:12:00', '1', 'owner', 'PH-123', 'abc@gmail.com', 'abc@123');
const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const {
      fname,
      email,
      mobile1,
      status,
      
      isdeleted,
      propertyholdertype,
      phkey,
      username,
      pass,
    } = req.body;

    const sql = `INSERT INTO tbl_owner (fname, email, mobile1, status, isdeleted, propertyholdertype, phkey, username, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [
        fname,
        email,
        mobile1,
        status,
        
        isdeleted,
        propertyholdertype,
        phkey,
        username,
        pass,
      ],
      (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        } else {
          console.log('Data inserted successfully');
          res.status(200).json({ status: 'success', message: 'Data inserted successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


router.post('/login', (request, response) => {
  const { email, password } = request.body;

  // Check if email and password are defined
  if (typeof email === 'undefined' || typeof password === 'undefined') {
    response.status(400).json({ status: 'error', message: 'Email and password are required' });
    return;
  }

  // Trim the email and password
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const statement = "SELECT * FROM tbl_owner WHERE email = ? AND pass = ?;";

  db.query(statement, [trimmedEmail, trimmedPassword], (error, results) => {
    if (error) {
      // Handle the database query error
      console.error('Error during login query:', error);
      response.status(500).json({ status: 'error', message: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      // If user does not exist, results array will be empty
      response.json(utils.createResult('User does not exist'));
    } else {
      // If user exists, the results will be an array with one user entry
      const user = results[0];
      response.json(
        utils.createResult(null, {
          name: `${user['fname']}`,
          propertyholdertype: `${user['propertyholdertype']}`,
          id: user['owner_id'],
        })
      );
    }
  });
});




  module.exports = router






  //  const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // Clear the error state
  //   setError('');

  //   // Basic form validation
  //   if (!fullName || !email || !password || !propertyHolderType) {
  //     setError('Please fill in all fields.');
  //     notify('Please fill in all fields.', 'error');
  //     return;
  //   }

  //   // Your signup logic goes here
  //   const formData = {
  //     fullName,
  //     contact,
  //     email,
  //     password,
  //     propertyHolderType,
  //     status,
      
  //     isDeleted,
  //     phKey,
  //     username: email
  //   };

  //   try {
  //     // API call to signup user
  //     const data = await signupUser(formData);

  //     // Log the data received from the server (you can customize this part)
  //     console.log('Data received from the server:', data);

  //     // Display a success message
  //     notify('Signup successful!', 'success');
  //   } catch (error) {
  //     // Handle any errors that occurred during the signup process
  //     console.error('Error during signup:', error.message);
  //     // Optionally, set an error state or show an error message to the user
  //     setError('An error occurred during signup. Please try again.');
  //     notify('An error occurred during signup. Please try again.', 'error');
  //     return;
  //   }

  //   // Reset form state after successful signup
  //   setFullName('');
  //   setContact('');
  //   setEmail('');
  //   setPassword('');
  //   setPropertyHolderType('');
  // };