import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

import './GearListPage.css';

function GearListPage(props) {

  const dispatch = useDispatch();
  const gear = useSelector((store) => store.gear.gearList);
  const events = useSelector((store) => store.events.eventList);
  const history = useHistory();
  // const [prevEventId, setPrevEventId] = useState(tool.event_id || '');


  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR' });
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  function updateBtnClk(toolId, toolName) {
    console.log('Taking piece of gear to update page:', toolName);
    history.push(`/updategear/${toolId}`)
  }

  function deleteBtnClk(toolId, toolName) {
    console.log('Deleting piece of gear:', toolName);
    dispatch({ type: 'DELETE_GEAR', payload: toolId });
  }

  const assignToEvent = (toolId, eventId) => {
    //Dispatching event assignement for piece of gear to gear_list table in DB
    //NEED TO CREATE A 'ADD TO EVENTS TABLE IN DB' DISPATCH TO GO WITH THIS
    if (eventId === '') {
      dispatch({ type: 'ASSIGN_TO_EVENT', payload: {id: toolId, eventId: null}});
    } else {
      dispatch({ type: 'ASSIGN_TO_EVENT', payload: {id: toolId, eventId: eventId}});
    }
  };

  return (
    <div className="gearListDOM" >
      <h1>Your Gear:</h1>
      {gear.map(tool => {
        const features = [tool.feature_1, tool.feature_2, tool.feature_3, tool.feature_4,
                          tool.feature_5, tool.feature_6, tool.feature_7, tool.feature_8];
        const notes = [tool.note_1, tool.note_2, tool.note_3, tool.note_4,
                       tool.note_5, tool.note_6, tool.note_7, tool.note_8];

        // const assignToEvent = (toolId, eventId) => {
        //   console.log('PREVIOUS INTERATION OF tool.event_id:', prevEventId);
        //   //Dispatching event assignement for piece of gear to gear_list table in DB
        //   //ALSO dispatching gear assignment to event_list table in DB
        //   if (eventId === '') {
        //     dispatch({ type: 'ASSIGN_TO_EVENT', payload: {id: toolId, eventId: null}});
        //     // dispatch({ type: 'ADD_TO_EVENT_GEARLIST', payload: {id: null, eventId: prevEventId}});
        //   } else {
        //     dispatch({ type: 'ASSIGN_TO_EVENT', payload: {id: toolId, eventId: eventId}});
        //   }
        //   setPrevEventId(tool.event_id || '')
        //   console.log('NEXT INTERATION OF tool.event_id:', prevEventId);
        // };

          return (
            <div key={tool.id}>
              <Grid container spacing={2} className="gearGridList">
                <Grid item xs={3}>
                  <b>Name: </b>
                  <span>{tool.name}</span><br /><br />
                  <img src={`/api/user/photo/${tool.photo}`} alt={tool.name}/><br /><br />
                </Grid>
                <Grid item xs={3}>
                  <b>Features:</b>
                  {features.map((feature, index) => {return(<div key={index}><span>{feature}</span></div> )})}
                </Grid>
                <Grid item xs={3}>
                  <b>Notes:</b>
                  {notes.map((note, index) => {return(<div key={index}><span>{note}</span></div> )})}<br />
                </Grid>
                <Grid item xs={3}>
                  <FormControl sx={{minWidth: '220px', mr:2}}>
                    <InputLabel id="assignToEventLabel" shrink>Assign To Event</InputLabel>
                    {/* <FormHelperText>Assign to Event</FormHelperText> */}
                    <Select
                      labelId="assignToEventLabel"
                      label="Assign To Event"
                      value={tool.event_id || ''}
                      displayEmpty
                      onChange={(event) => assignToEvent(tool.id, event.target.value)}
                    >
                      <MenuItem value="" >Not Assigned</MenuItem>
                      {events.map(event => {
                        return (
                          <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl><br /><br />
                  <Button variant="contained" onClick={() => updateBtnClk(tool.id, tool.name)}>Update Gear</Button>&nbsp;
                  <Button variant="contained" onClick={() => deleteBtnClk(tool.id, tool.name)}>Delete Gear</Button><br /><br />
                </Grid>
              </Grid><br />
            </div>
          );
        })}
    </div>
  );
}

export default GearListPage;
