const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');
const {authentication} = require('../middlewares/authentication')
const {adminAuthorization} = require('../middlewares/authorization')

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'server connected'
    })
});
router.post('/login', controller.login);
router.post('/create_class', authentication, adminAuthorization, controller.create_class);
// router.post('/check_in', controller.check_in);
// router.post('/check_out', controller.check_out);
// router.get('/get_class_list', controller.get_class_list);
// router.get('/get_class_by_id', controller.get_class_by_id);


module.exports = router;
