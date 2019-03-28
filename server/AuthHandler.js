const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'example'
// están hardcodeados los usaurios para simplificar
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticate,
};

function authenticate(req, res, next) {
    username = req.body.username
    password = req.body.password
    new Promise(function(resolve, reject) {
      const user = users.find(u => u.username === username && u.password === password)
      if (user) {
        const token = jwt.sign({ username: user.test }, secret,{ expiresIn: '12h' });
        const { password, ...userWithoutPassword } = user
        resolve ({
          ...userWithoutPassword,
          token
        })
      }else{
        reject({ message: 'Username or password is incorrect' })
      }
    })
    .then(user => {return res.json(user)} )
    .catch(error => (res.status(401).send( error )) )
}
