const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})

router.get('/hello/:name', (req, res) => {
    res.send('hello '+req.params.name);
})
router.post('/users', (req, res) => {
    res.send(req.body);
})

module.exports = router;