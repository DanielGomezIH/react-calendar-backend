const { response } = require( 'express' );
const Event = require( '../models/Event' );

const getEvents = async ( req, resp = response ) => {

  try {

    const events = await Event.find().populate( 'user', 'name' );

    resp.json( {
      ok: true,
      events
    } );

  } catch ( error ) {
    console.log( error );
    resp.status( 500 ).json( {
      ok: false,
      msg: 'Please get in touch with your admin',
    } );
  }
};

const createEvent = async ( req, resp = response ) => {

  const event = new Event( req.body );

  try {

    event.user = req.uid;

    const eventSaved = await event.save();

    resp.status( 201 ).json( {
      ok: true,
      event: eventSaved
    } );

  } catch ( error ) {
    console.log( error );
    resp.status( 500 ).json( {
      ok: false,
      msg: 'Please get in touch with your admin',
    } );
  }
};

const updateEvent = async ( req, resp = response ) => {

  const uid = req.uid;
  const eventId = req.params.id;

  try {

    const event = await Event.findById( eventId );

    if ( !event ) {
      return resp.status( 404 ).json( {
        ok: false,
        msg: 'Event does not exists with that id'
      } );
    }


    if ( event.user.toString() !== uid ) {
      return resp.status( 401 ).json( {
        ok: false,
        msg: 'You do not have permissions to edit the event'
      } );
    }

    const newEvent = {
      ...req.body,
      user: uid
    };

    const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

    resp.json( {
      ok: true,
      event: eventUpdated
    } );

  } catch ( error ) {
    console.log( error );
    resp.status( 500 ).json( {
      ok: false,
      msg: 'Please get in touch with your admin',
    } );
  }
};

const deleteEvent = async ( req, resp = response ) => {

  const uid = req.uid;
  const eventId = req.params.id;

  try {

    const event = await Event.findById( eventId );

    if ( !event ) {
      return resp.status( 404 ).json( {
        ok: false,
        msg: 'Event does not exists with that id'
      } );
    }

    if ( event.user.toString() !== uid ) {
      return resp.status( 401 ).json( {
        ok: false,
        msg: 'You do not have permissions to delete the event'
      } );
    }

    await Event.findByIdAndDelete( eventId );

    resp.json( { ok: true } );
  } catch ( error ) {
    console.log( error );
    resp.status( 500 ).json( {
      ok: false,
      msg: 'Please get in touch with your admin',
    } );
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};