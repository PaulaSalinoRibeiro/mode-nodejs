const { Router } = require('express');
const User = require('../model/User');
const { validateUser } = require('../middleware/validateuser');

const userRouter = Router();

userRouter.post('/', validateUser, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const [{ affectedRows }] = await User.createUser(firstName, lastName, email, password);
  
  if (affectedRows === 1) {
    res.status(201).json({firstName, lastName, email, password});
  }
  
});

userRouter.get('/', async (_req, res) => {
  const users = await User.getAllUsers();

  res.status(200).json(users);
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.getUserById(id);

  if (!user.length) return res.status(404).json({
    "error": true,
    "message": "Usuário não encontrado"
  })

  res.status(200).json(user);
});

userRouter.put('/:id', validateUser, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  const user = await User.getUserById(id);

  if (!user.length) return res.status(404).json({
    "error": true,
    "message": "Usuário não encontrado"
  });

  await User.updateUser(id, firstName, lastName, email, password);

  res.status(200).json({firstName, lastName, email});
})

module.exports = userRouter;