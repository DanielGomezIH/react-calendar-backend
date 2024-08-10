const { response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const validateJWT = ( req, resp = response, next ) => {

  const token = req.header( 'x-token' );

  if ( !token ) {
    return resp.status( 401 ).json( {
      ok: false,
      msg: 'There is no token in the request'
    } );
  }

  try {

    const payload = jwt.verify( token, process.env.SECRET_JWT_SEED );

    req.uid = payload.uid;
    req.name = payload.name;

  } catch ( error ) {
    return resp.status( 401 ).json( {
      ok: false,
      msg: 'Invalid token'
    } );
  }

  next();
};

module.exports = {
  validateJWT
};