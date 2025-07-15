const router = require('express').Router();

const {create} = require('../http/owner.http');


const authenticate = require('../middlewares/Auth/auth.middleware.js')
const handleValidation = require('../middlewares/ErrosValidation/handleValidation.js');
const {validateCreateOwner} = require('../middlewares/Owner/validatedOwner.js')


router
    .route('/register')
    .post(
        authenticate,
        validateCreateOwner,
        handleValidation,
        create
    )


exports.router = router