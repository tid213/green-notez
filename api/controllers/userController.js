

exports.index = function(req, res) {
    var message = "Welcome to Green Notez";
    res.json(message);
};

exports.login = function(req, res) {
    var message = "Sign up from Green Notez";
    res.json(message);
};