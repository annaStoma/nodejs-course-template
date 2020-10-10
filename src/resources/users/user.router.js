const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = usersService.get(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = usersService.create(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = usersService.update({
    id: req.params.id,
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = usersService.del(req.params.id);
  res.json(User.toResponse(user));
});

module.exports = router;
