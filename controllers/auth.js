const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );
const User = require( '../models/User' );
const { generateJWT } = require( '../helpers/jwt' );


const createUser = async ( req, resp = response ) => {

  const { email, password } = ( req.body );

  try {

    let user = await User.findOne( { email } );

    if ( user ) {
      return resp.status( 400 ).json( {
        ok: false,
        msg: `User already exists with that email`
      } );
    }

    user = new User( req.body );

    //* Encriptación de Contraseña

    const salt = bcrypt.genSaltSync( 10 );

    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    //* Generar JWT

    const token = await generateJWT( user._id, user.name );

    resp.status( 201 ).json( {
      ok: true,
      uid: user._id,
      name: user.name,
      token
    } );

  } catch ( error ) {

    console.log( error );
    resp.status( 500 ).json( {
      ok: false,
      msg: 'Please get in touch with your admin',
    } );

  }

};

const loginUser = async ( req, resp = response ) => {

  const { email, password } = ( req.body );

  try {

    const user = await User.findOne( { email } );

    if ( !user ) {
      return resp.status( 400 ).json( {
        ok: false,
        msg: `User does not exists with that email`
      } );
    }

    const validPassword = bcrypt.compareSync( password, user.password );

    if ( !validPassword ) {
      resp.status( 400 ).json( {
        ok: false,
        msg: 'Incorrect password'
      } );
    }

    //* Generar JWT

    const token = await generateJWT( user._id, user.name );

    resp.json( {
      ok: true,
      uid: user._id,
      name: user.name,
      token
    } );

  } catch ( error ) {

    console.log( error );
    resp.status( 500 ).json( {
      ok: false,
      msg: 'Please get in touch with your admin',
    } );

  }
};

const revalidateToken = async ( req, resp = response ) => {

  const { uid, name } = req;

  //* Generar un nuevo JWT

  const token = await generateJWT( uid, name );

  resp.json( {
    ok: true,
    token
  } );
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken
};