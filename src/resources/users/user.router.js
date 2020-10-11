const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  await res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    await res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
  await res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update({
    id: req.params.id,
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  await res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.del(req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    res.status(404).send('User not found');
  }
});

module.exports = router;
