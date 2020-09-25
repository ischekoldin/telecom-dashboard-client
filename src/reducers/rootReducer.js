
const initialState = {
    endpoint: '',
    tokenRefreshRequired: false,
    records: {},
    activeNote: {},
    email: '',
    logout: false,
    location: true,
    editProfileData: {"edit": false, "fieldsToEdit": []}
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'backend/endpoint':
            return { ...state, endpoint: action.payload };
        case 'auth/setEmail':
            return { ...state, email: action.payload };
        case 'auth/tokenRefreshRequired':
            return { ...state, tokenRefreshRequired: action.payload };
        case 'records/fetch':
            return { ...state, records: action.payload };
        case 'notes/updateRequired':
            return { ...state, updateRequired: action.payload };
        case 'notes/setActive':
            return { ...state, activeNote: action.payload };
        case 'auth/editProfile':
            return { ...state, editProfileData: action.payload };
        case 'auth/logout':
            return { ...state, logout: action.payload };
        default:
            return state;
    }
}

export default rootReducer;