import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function EventListPage(props) {

  const dispatch = useDispatch();
  const gear = useSelector((store) => store.gear.gearList);
  const events = useSelector((store) => store.events);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR' });
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  return (
    <div className="gearListDOM" >
      <h1>Your Events:</h1>
      {events.map(event => {
        const details = [event.detail_1, event.detail_2, event.detail_3, event.detail_4,
                         event.detail_5, event.detail_6, event.detail_7, event.detail_8];
        const contacts = [event.contact_1, event.contact_2];
        const tools = gear.filter ((gearPiece) => { //This filters the whole gearList down to the gearPieces assigned to each event
          if (gearPiece.id === event.gear_1_id || gearPiece.id === event.gear_2_id || gearPiece.id === event.gear_3_id ||
              gearPiece.id === event.gear_4_id || gearPiece.id === event.gear_5_id || gearPiece.id === event.gear_6_id || 
              gearPiece.id === event.gear_7_id || gearPiece.id === event.gear_8_id)
            {return true}
          return false})

        return (
          <div key={event.id}>
            <Grid container spacing={2} className="gearGridList" >
              <Grid item xs={3}>
                <b>Name: </b>
                <span>{event.name}</span><br /><br />
                <b>Dates: </b> {/* THIS NEEDS SOME MUI TO MAKE THIS LOOK NICER PROBABLY?------------------------------ */}
                <span>{event.dates}</span><br /><br />
                <Button variant="contained" onClick={() => updateBtnClk()}>Update Event</Button>&nbsp;
                <Button variant="contained" onClick={() => deleteBtnClk()}>Delete Event</Button><br /><br />
              </Grid>
              <Grid item xs={3}>
                <b>Details:</b>
                {details.map((detail, index) => {return(<div key={index}><span>{detail}</span></div> )})}
              </Grid>
              <Grid item xs={3}>
                <b>Contacts:</b>
                {contacts.map((contact, index) => {return(<div key={index}><span>{contact}</span></div> )})}
              </Grid>
              <Grid item xs={3}>
                <b>Assigned Gear:</b>
                {tools.map((tool, index) => {
                    return (
                      <div key={index}>
                        <span>{tool.name}</span>
                      </div>
                    )
                })}

              </Grid>
            </Grid><br />
          </div>
        )
      })}

    </div>
  );
}

export default EventListPage;
