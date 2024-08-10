const { response } = require( 'express' );
const Event = require( '../models/Event' );

const getEvents = ( req, resp = response ) => {

  resp.json(
    {
      ok: true,
      msg: 'Get events',
    }
  );

};

const createEvent = async ( req, resp = response ) => {

  const event = new Event( req.body );

  try {

    event.user = req.uid;

    const eventSaved = await event.save();

    resp.status( 201 ).json( {
      ok: true,
      event: eventSaved
    }
    );

  } catch ( error ) {
    console.log( error );
    resp.status( 500 ).json( {
      ok: false,
      msg: 'Please get in touch with your admin',
    } );
  }



};

const updateEvent = ( req, resp = response ) => {

  resp.json(
    {
      ok: true,
      msg: 'Update event',
    }
  );

};

const deleteEvent = ( req, resp = response ) => {

  resp.json(
    {
      ok: true,
      msg: 'Delete event',
    }
  );

};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};