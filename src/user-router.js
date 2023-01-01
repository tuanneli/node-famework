const Router = require('../framework/Router');

const router = new Router();

const users = [
    {id: 1, name: "User one"},
    {id: 2, name: "User two"},
    {id: 3, name: "User three"},
]

router.get('/users', (req, res) => {
    if (req.params.id) {
        return res.send(users.find(user => user.id === parseInt(req.params.id)));
    }
    res.send(users)
})

router.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send(user);
})

module.exports = router;