import React from 'react';
import classes from './TakeAnote.module.css'

const takeanote = (props) => (
    <div className={classes.Note} onClick={props.clicked}>
       Take a note
   </div>
)

export default takeanote