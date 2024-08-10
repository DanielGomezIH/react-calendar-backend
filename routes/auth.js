/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { check } = require( 'express-validator' );
const { Router } = require( 'express' );
const { validateFields } = require( '../middlewares/field-validators' );
const { validateJWT } = require( '../middlewares/validate-jwt' );

const router = Router();

const { createUser, loginUser, revalidateToken } = require( '../controllers/auth' );

router.post(
  '/register',
  [
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'email', 'Email is required' ).isEmail(),
    check( 'password', 'Password must be at least 8 characters' ).isLength( { min: 8 } ),
    validateFields
  ],
  createUser );

router.post( '/', [
  check( 'email', 'Email is required' ).isEmail(),
  check( 'password', 'Password must be at least 8 characters' ).isLength( { min: 8 } ),
  validateFields
], loginUser );

router.get( '/renew', validateJWT, revalidateToken );

module.exports = router;