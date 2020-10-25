const initialState = {
    
}

const addName = (state = [], action) => {
    switch(action.type){
        case 'ADD_NAME':
            state = state.concat('Nick');
            break;
        case 'REMOVE_NAME':
            state = state.splice(1, state.length - 1);
            break;
        default: 
            return state;
    }
    return state;
}

export default addName;