
const initialState = {
    endpoint: '',
    tokenRefreshRequired: false,
    records: {},
    updateRequired: false,
    activeNote: {},
    updateActiveNote: false,
    addNote: false,
    deleteNote: false,
    username: '',
    logout: false,
    location: true,
    isSidePanelOpen: false // if true by default, querying the screen size doesn't work properly
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'backend/endpoint':
            return { ...state, endpoint: action.payload };
        case 'auth/tokenRefreshRequired':
            return { ...state, tokenRefreshRequired: action.payload };
        case 'records/fetch':
            return { ...state, records: action.payload };
        case 'notes/updateRequired':
            return { ...state, updateRequired: action.payload };
        case 'notes/setActive':
            return { ...state, activeNote: action.payload };
        case 'notes/add':
            return { ...state, addNote: action.payload };
        case 'notes/updateActiveNote':
            return { ...state, updateActiveNote: action.payload };
        case 'notes/clearActiveNote':
            return { ...state, activeNote: {} };
        case 'notes/delete':
            return { ...state, deleteNote: action.payload };
        case 'auth/setUserName':
            return { ...state, username: action.payload };
        case 'auth/logout':
            return { ...state, logout: action.payload };
        case 'responsiveness/isNoteOpen':
            return { ...state, isNoteOpen: action.payload };
        case 'responsiveness/isSidePanelOpen':
            return { ...state, isSidePanelOpen: action.payload };
        default:
            return state;
    }
}

export default rootReducer;