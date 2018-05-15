import * as actionTypes from './actions';

const initialState = {
    queryString: '',
    imgArr: []
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
        default:
            return state;
    }    
};

export default reducer;