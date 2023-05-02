import jwt from 'jsonwebtoken';
import config from 'config';

class authController {
  async registration(req, res) {
    try {
      res.send('sign up'); // temporary code
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const isLogin = email === 'admin@gmail.com' && password === '12345';

      if (isLogin) {
        const token = jwt.sign({ email, fullname: 'nameUser' }, config.get('jwtSecret'));
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: 'Error authorization!' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getUsers(req, res) {
    try {
      res.send('users'); // temporary code
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

export default new authController();
