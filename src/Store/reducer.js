import * as actionTypes from './actions';

const initialState = {
    queryString: '',
    imgArr: [],
    ids: null
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
        default:
            return state;
    }    
};

export default reducer;