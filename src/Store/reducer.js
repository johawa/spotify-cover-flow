import * as actionTypes from "./actions";

const initialState = {
  connectionError: {
    is: false,
    type: ""
  },
  queryString: "Oasis",
  imgArr: [],
  starting_volume: 0,
  user_volume: 100,
  ids: null,
  device_id: null,
  playing: false,
  loadingAlbumImagesForCoverflow: true,
  selectedTracklist: [],
  selectedCoverId: null,
  current_track: null,
  current_playback_data: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUERY_STRING:
      return {
        ...state,
        queryString: action.queryString
      };
    case actionTypes.CONNECTION_ERROR:
      return {
        ...state,
        connectionError: { is: action.is, type: action.errorType }
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
    case actionTypes.SELECTED_TRACKLIST:
      return {
        ...state,
        selectedTracklist: action.selectedTracklist
      };
    case actionTypes.SELECTED_COVER_ID:
      return {
        ...state,
        selectedCoverId: action.id
      };
    case actionTypes.GET_STARTING_VOLUME:
      return {
        ...state,
        starting_volume: action.volume
      };
    case actionTypes.GET_USER_VOLUME:
      return {
        ...state,
        user_volume: action.volume
      };
    case actionTypes.LOADING_ALBUMIMAGES_FOR_COVERFLOW:
      return {
        ...state,
        loadingAlbumImagesForCoverflow: !state.loadingAlbumImagesForCoverflow
      };
    case actionTypes.SET_PLAYING_FALSE:
      return {
        ...state,
        playing: false
      };
    case actionTypes.SET_PLAYING_TRUE:
      return {
        ...state,
        playing: true
      };

    case actionTypes.SET_CURRENT_PLAYBACKDATA:
      return {
        ...state,
        current_playback_data: action.current_playback_data
      };
    case actionTypes.SET_CURRENT_TRACK:
      return {
        ...state,
        current_track: action.current_track
      };
    default:
      return state;
  }
};

export default reducer;
