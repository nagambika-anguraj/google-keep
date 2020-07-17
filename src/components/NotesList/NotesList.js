import React from 'react'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'
import classes from './NotesList.module.css'

const notesList = (props) => {
   
    let notes = props.notes.map( note => {
        return (
            <div className={classes.Note} 
                 key={note.id} 
                 onClick={() => props.deleteNote(note.id)}>
                {note.value}
            </div>
        )
    })
    return(
       <div className={classes.ParentList}> {notes} </div>
    )
}
  
const mapStateToProps = (state) => {
    return{
        notes: state.note
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        deleteNote: (id) => dispatch(actionTypes.removeNote(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(notesList)