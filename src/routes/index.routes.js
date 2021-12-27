const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
      res.send('Hola')
})

router.get('/tasks', (req, res) => {
      res.json([])
})

router.post('/tasks', (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) return res.status(400).send('Bad request')

      res.json({ id: new Date().getTime(), title, description })
})

module.exports = router