var jwt = require('jsonwebtoken');

var data = {usernames: 'nodemody'};

var token = jwt.sign(data, 'phamgiahuy1234567890');
console.log(token);

var check = jwt.verify(token, 'phamgiahuy1234567890');

console.log(check);