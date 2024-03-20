import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

function GearListPage(props) {

  const dispatch = useDispatch();
  const gear = useSelector((store) => store.gear);
  const events = useSelector((store) => store.events);
  const userId = useSelector((store) => store.user.id);

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR' });
    dispatch({ type: 'FETCH_EVENTS', payload: userId });
  }, []);

  function deleteBtnClk(toolId, toolName) {
    console.log('Deleting piece of gear:', toolName);
    dispatch({ type: 'DELETE_GEAR', payload: toolId });
  }

  return (
    <div>
      {gear.map(tool => {
          return (
            <div key={tool.id}>
              <p>{tool.photo}</p>
              <p>{tool.name}</p>
              <p>{tool.feature_1}</p>
              <p>{tool.feature_2}</p>
              <p>{tool.feature_3}</p>
              <p>{tool.feature_4}</p>
              <p>{tool.feature_5}</p>
              <p>{tool.feature_6}</p>
              <p>{tool.feature_7}</p>
              <p>{tool.feature_8}</p>
              <p>{tool.note_1}</p>
              <p>{tool.note_2}</p>
              <p>{tool.note_3}</p>
              <p>{tool.note_4}</p>
              <p>{tool.note_5}</p>
              <p>{tool.note_6}</p>
              <p>{tool.note_7}</p>
              <p>{tool.note_8}</p>
              <select name="" id="">
                <option value="">Assign to event</option>
                {events.map(event => {
                  return (
                    <option key={event.id} value={event.id}>{event.name}</option>
                  )
                })}
              </select>
              <input type="button" value="Update Gear"/>
              <input type="button" value="Delete Gear" onClick={() => deleteBtnClk(tool.id, tool.name)}/>
            </div>
          );
        })}
    </div>
  );
}

export default GearListPage;
