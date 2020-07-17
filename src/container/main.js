import React, {Component} from 'react';
import Note from '../components/TakeANote/TakeAnote';
import NoteEntry from '../components/NoteEntry/NoteEntry'
import NotesList from '../components/NotesList/NotesList'
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions'
import axios from 'axios'

class Main extends Component {
    state={
        showNote: true,
        noteList: []
    }

    componentDidMount() {
         axios.get('https://notes-797ad.firebaseio.com/notes.json')
          .then(response => {
              const data = Object.keys(response.data)

              data.forEach( key => {
                  this.props.addNote(response.data[key].value, response.data[key].id)
              })
          })
          .catch(error => console.log(error)) 
    }

    noteClickHandler = () => {
        var stateToggle = !this.state.showNote;
        //This toggles the state
        this.setState({
          showNote: stateToggle,
        });
        //Here we need to be able to add the notes to the state as well.
        console.log(stateToggle);
    }

    render() {
        let note = this.state.showNote ? 
                 <Note clicked={this.noteClickHandler}/> : 
                 <NoteEntry clicked={this.noteClickHandler}/>
        return(
            <div>
                 {note}
                 <NotesList/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        note: state.note
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addNote: (value, id) => dispatch (actionTypes.addNote(value, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)