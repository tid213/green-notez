var express = require('express');
var router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://lehszutacgaprmdvkcdf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaHN6dXRhY2dhcHJtZHZrY2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MTcwODEsImV4cCI6MTk4MzA5MzA4MX0.-7dOqj8q6O53GVqCcuWcGseahmFQZKT71HwMdGz_V24')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const { data, error } = await supabase
  .from('testing')
  .select()
  const message = data;
  res.send(message);
});

router.get('/login', function(req, res, next) { 
  const message = "Login or Sign up";
  res.send(message);
});
router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });
  
  if (error) {
    console.log(JSON.stringify(error));
    console.log(error.status);
    res.send(error);
  } else {
    //res.send(message);
    res.send(data);
  }
})

router.get('/signup', function(req, res, next) {
  const message = "Sign up for Green Notez";
  res.send(message);
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
    res.redirect('/login');
  }
})

router.get('/about', function(req, res, next) {
  const message = "About page";
  res.send(message);
});

router.get('/forgotpassword', function(req, res, next) {
  const message = "Forgot password";
  res.send(message);
});

router.get('/dashboard', async (req, res, next) => {
  const { data, error } = await supabase.auth.getSession();
  console.log(data);
    const message = "You are signed in"
    res.send(message);
});
router.get('/signout', async (req, res, next) => {
  const { error } = await supabase.auth.signOut()
  res.redirect('/');
})

module.exports = router;
