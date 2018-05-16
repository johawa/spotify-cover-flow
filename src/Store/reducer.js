import * as actionTypes from './actions';

const initialState = {
    queryString: '',
    imgArr: [],
    ids: null,
    device_id: null,
    playing: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_QUERY_STRING:
            return {
                ...state,
                queryString: action.queryString
            };
        case actionTypes.GET_ABLUM_IMG_URLS:            
            return {
                ...state,                
                imgArr: action.imgArr
            };
        case actionTypes.GET_ALBUM_IDS:            
            return {
                ...state,                
                ids: action.ids
            };
        case actionTypes.SET_PLAYER_ID:            
            return {
                ...state,                
                device_id: action.device_id
            };
        case actionTypes.SET_PLAYING_TRUE:            
            return {
                ...state,                
                playing: true
            };
        case actionTypes.SET_PLAYING_FALSE:            
            return {
                ...state,                
                playing: false
            };
        default:
            return state;
    }    
};

export default reducer;