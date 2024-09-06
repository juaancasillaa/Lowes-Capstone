//This is a way to manually hash a password using bcrypt.js. You will need to run this file to generate the hashed password for the admin user. Then you can use this hashed password in your database.

const bcrypt = require('bcryptjs');

const plainPassword = 'password_you-need_to_hash'; // The plain text password you want to hash

bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hashedPassword);
  }
});
