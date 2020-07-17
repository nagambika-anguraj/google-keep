import React,{Component} from "react";
import classes from "./NoteEntry.module.css";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'
//Change this component to Stateful

class NoteEntry extends Component{

    state={
        textAreaValue: ''
    }
    textAreaChanged = (event) => {
        const value = event.target.value
       
       this.setState({
           textAreaValue: value
       })
    }
    clearTextArea = () => {
      document.getElementById('textArea').value = '';
      //Call the addNote of the reducer to dispatch action
      this.props.addNote(this.state.textAreaValue)
    }
    render(){
        return(
            <div className={classes.ParentEntry}>
            <textarea
              id="textArea"
              className={classes.Entry}
              placeholder="Please enter Note here"
              onChange={(event) => {this.textAreaChanged(event)}}
            ></textarea>
            <div className={classes.Close} onClick={this.clearTextArea}>
              <img
                alt="Save and Close"
                src="https://img.icons8.com/plasticine/100/000000/save-close.png"
              />
            </div>
          </div>
        )
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return{
        addNote: (noteValue) => dispatch(actionTypes.saveNote(noteValue))
    }
}
const mapStateToProps = (state) => {
   return{
     note: state.note
   } 
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteEntry);

