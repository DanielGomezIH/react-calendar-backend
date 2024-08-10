/*
  Rutas de Eventos / Events
  host + /api/events
*/

const { getEvents, createEvent, deleteEvent, updateEvent } = require( '../controllers/events' );
const { isDate } = require( '../helpers/isDate' );
const { validateFields } = require( '../middlewares/field-validators' );
const { validateJWT } = require( '../middlewares/validate-jwt' );
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const router = Router();

router.use( validateJWT );

router.get( '/', [
  check,
  validateFields
],
  getEvents );

router.post( '/', [
  check( 'title', 'Title is required' ).not().isEmpty(),
  check( 'start', 'Start date is required' ).custom( isDate ),
  check( 'end', 'End date is required' ).custom( isDate ),
  validateFields
],
  createEvent );

router.put( '/:id', [
  check,
  validateFields
],
  updateEvent );

router.delete( '/:id', [
  check,
  validateFields
],
  deleteEvent );

module.exports = router;