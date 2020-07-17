import * as actionTypes from './actions'

const initialState = {
    note: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_NOTE: 
            return{
                ...state,
                note: state.note.concat({
                    id: action.id,
                    value: action.noteValue
                })
            }
        case actionTypes.DELETE_NOTE:
            return{
                ...state,
                note: state.note.filter(note => {
                    return note.id !== action.id
                })
            }
        default: return state
        }
    }

export default reducer; 