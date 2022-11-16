var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://lehszutacgaprmdvkcdf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaHN6dXRhY2dhcHJtZHZrY2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MTcwODEsImV4cCI6MTk4MzA5MzA4MX0.-7dOqj8q6O53GVqCcuWcGseahmFQZKT71HwMdGz_V24')

var session;

var accessToken;
var refreshToken;

/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log("home page loaded...");
  const { data, error } = await supabase
  .from('testing')
  .select()
  const message = data;
  res.send(message);
});

router.get('/login', async (req, res, next) => { 
  
  //console.log(data.session);
  console.log("Login page loaded...");
  const message = "Login";
  res.send(message);
});
router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });

  //console.log(session);
  
  refreshToken = data.session.refresh_token;
//  accessToken = data.session.access_token;

  if (error) {
    console.log(JSON.stringify(error));
    console.log(error.status);
    res.send(error);
  } else {
    console.log(refreshToken);
    //req.session.loggedIn = true;
    //req.session.username = email;
    res.send(data);
    console.log("Logged in loaded...");
  }
})

router.get('/signup', function(req, res, next) {
  const message = "Sign up for Green Notez";
  res.send(message);
  console.log("sign up loaded...");
});
router.post('/signup', async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  //const { data, error } = 
  const { error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  if (error) {
    console.log(JSON.stringify(error));
  } else {
    console.log("signed up loaded");
    res.redirect('/login');
  }
})

router.get('/about', function(req, res, next) {
  console.log("about page loaded...")
  const message = "About page";
  res.send(message);
});

router.get('/forgotpassword', function(req, res, next) {
  console.log("forgot password loaded...");
  const message = "Forgot password";
  res.send(message);
});

router.get('/dashboard', async (req, res, next) => {
 // const refreshToken = req.cookies['my-refresh-token']
 // const accessToken = req.cookies['my-access-token']
  // returns user information
  //const test = await supabase.auth.setSession(accessToken);
  let userEmail = '';
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN'){
      userEmail = session.user.email;
      console.log('SIGNED_IN', session)
      res.send(userEmail);
    }
  })
 
});
router.get('/signout', function(req, res, next) {
  req.session.destroy((err) => {});
  console.log("sign out loaded...");
  res.send("signed out");
})

module.exports = router;
