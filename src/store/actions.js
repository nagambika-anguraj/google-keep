import axios from 'axios'
//import FIREBASE's config.js file
import "../config"
import * as firebase from 'firebase'
import shortid from 'shortid'

export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

//Synchronous Action Creators
export const addNote = (value, id) => {
    return{
        type: ADD_NOTE,
        noteValue: value,
        id: id
    }
}

//Synchronous Action Creators
export const deleteNote = (id) => {
    return{
        type: DELETE_NOTE,
        id: id
    }
}

//Asynchronous Action Creators
//Do FIREBASE call here to POST a NOTE
export const saveNote = (value) => {
    return dispatch => {
          const Id = shortid.generate()
            firebase.database().ref("notes")
            .push({
                value: value,
                id: Id
            })   
        dispatch(addNote(value, Id))
    }
}

//Asynchronous Action Creators
//Do FIREBASE call here to DELETE a Note
export const removeNote = (id) => {
    return dispatch =>{
        const result = []
        //using axios instead of Firebase to fetch the appropriate Key of selected Note to delete
        axios.get('https://notes-797ad.firebaseio.com/notes.json')
        .then(response =>{
            var encryptedKey = '';

            const data = Object.keys(response.data);
            //iterating through the Firebase's Notes node to fetch the encrypted key associated with the clicked note ID
            data.forEach(function (key) {
             result.push(response.data[key]);
               if(response.data[key].id === id) encryptedKey = key     
            });
     
            firebase.database()
            .ref('notes')
            .child(encryptedKey)
            .remove() 

            dispatch(deleteNote(id))
        })
        .catch(error => console.log(error))
    }
}