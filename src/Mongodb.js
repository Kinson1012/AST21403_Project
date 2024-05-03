const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const nodemailer = require('nodemailer');
const session = require('express-session');
const path = require('path');
const router = express.Router();
const app = express();
app.use(express.json());
const server = http.createServer(app);
app.use(express.static('public'));

router.get('/logout', (req, res) => {
  performLogout(req, res);
});
module.exports = router;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNum: String,
  password: String,
  authCode: String,
  resetCode: String,
  birthday: Date
});

const driverSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNum: String,
  password: String,
});

const orderSchema = new mongoose.Schema({
  location: String,
  destination: String,
  UserName: String,
  Fee:Number
})

const User = mongoose.model('User', userSchema);
const Driver = mongoose.model('Driver', driverSchema);
const Order = mongoose.model('Order', orderSchema);

const port = 3001;

app.use(session({
  secret: 'yourSecretKey', // This should be a long, random and secure string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

mongoose.connect('////', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


app.get('/api/session', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    const userRole = req.session.role || 'defaultRole';
    res.json({ isLoggedIn: true, role: userRole });
  } else {
    res.json({ isLoggedIn: false, role: null });
  }
});

function performLogout(req, res) {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error("Failed to destroy the session during logout.", err);
        res.status(500).send("Could not log out.");
      } else {
        res.send("Logged out successfully.");
      }
    });
  } else {
    res.status(400).send("No session to log out.");
  }
}

app.post('/api/send-reset-code', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send('User not found');
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
  user.resetCode = resetCode; // Save the code to the user's document
  await user.save(); // Make sure to save the user document

  // Setup Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ast21403noreply@gmail.com',
      pass: './/////',
    },
  });

  const mailOptions = {
    from: 'ast21403noreply@gmail.com', // Replace with your "From" email address
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${resetCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent:', info.response);
      res.send({ message: 'Reset code sent to your email.' });
    }
  });
});

app.post('/api/validate-password', async (req, res) => {
  req.session.isAuthenticated = true;
  if (!req.session) {
    return res.status(401).send('No user logged in');
  }

  const { password } = req.body;
  const userId = req.session.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const userPassword = user.password;
    if (password === userPassword) {
      res.status(200).json({ isValid: true });
    } else {
      res.status(403).send('Invalid password');
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.resetCode !== code) {
      return res.status(400).send({ message: 'Invalid code' });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).send({ message: 'Password has been successfully updated.' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred' });
  }
});

app.post('/api/session-reset-password', async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'No user logged in.' });
  }

  const { newPassword } = req.body;
  const userId = req.session.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Failed to reset password due to server error.' });
  }
});

app.get('/api/user/profile', async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNum: user.phoneNum,
      birthday: user.birthday
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.put('/api/user/editprofile', async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(403).send('Not authenticated');
  }

  const { firstName, lastName, birthday } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        firstName: firstName,
        lastName: lastName,
        birthday: new Date(birthday)
      }
    }, { new: true });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send('Error updating user profile');
  }
});

app.put('/api/user/editcontectnumber', async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(403).send('Not authenticated');
  }

  const { phoneNum } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        phoneNum: phoneNum,
      }
    }, { new: true });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        phoneNum: user.phoneNum,
      }
    });
  } catch (error) {
    console.error('Error updating user phone number:', error);
    res.status(500).send('Error updating user phone number');
  }
});


app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNum, password } = req.body;

    // Generate a 6-digit random number
    const authCode = Math.floor(100000 + Math.random() * 900000);

    // Send the auth code to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Set to true if using a secure connection (e.g., SMTP over TLS/SSL)
      auth: {
        user: 'ast21403noreply@gmail.com',
        pass: '///////',
      },
    });

    const mailOptions = {
      from: 'ast21403noreply@gmail.com',
      to: email,
      subject: 'Account Verification Code',
      text: `Your verification code is: ${authCode}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Email sent:', info.response);

        // Save the user's data and auth code to the database
        const user = new User({
          firstName,
          lastName,
          email,
          phoneNum,
          password,
          authCode,
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
      }
    });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/drivers', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNum, password } = req.body;

    const driver = new Driver({
      firstName,
      lastName,
      email,
      phoneNum,
      password
    });

    await driver.save();

    res.status(201).json({ message: 'Driver created successfully' });
  } catch (error) {
    console.error('Error saving driver:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
      const { locationAddress, destinationAddress, price } = req.body;
      const userId = req.session.userId;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send('User not found');
      }
      const UserName = user.lastName + user.firstName;
      const newOrder = new Order({
          location: locationAddress,
          destination: destinationAddress,
          UserName,
          Fee: price
      });

      await newOrder.save();
      res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
      console.error('Failed to save order:', error);
      res.status(500).json({ message: 'Error saving order' });
  }
});

function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
}


app.get('/api/protected', (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ message: 'You are authorized to see this content' });
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const driver = await Driver.findOne({ email });

    if (user && user.password === password) {
      req.session.userId = user._id;
      req.session.isAuthenticated = true;
      req.session.role = 'user';
      res.status(200).json({ message: 'Logged in successfully', role: 'user' });
      console.log('Session ID:', req.sessionID);
      console.log('Session:', req.session);
    } else if (driver && driver.password === password) {
      req.session.driverID = driver._id;
      req.session.isAuthenticated = true;
      req.session.role = 'driver';
      res.status(200).json({ message: 'Logged in successfully', role: 'driver' });
      console.log('Session ID:', req.sessionID);
      console.log('Session:', req.session);
    }
    else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out, please try again' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
});

app.use(express.json());

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
