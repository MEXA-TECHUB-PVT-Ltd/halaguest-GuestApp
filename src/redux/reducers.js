import {
   ////////////////APP LOGIN STATES/////////////////////
   SET_LOGIN_USER,
   SET_PHONE_NO,

  ////////////////APP STATES/////////////////////
  SET_HOTEL_TYPE,
  SET_HOTEL_TYPE_ID,

  ////////////////////Account Data Submition////////////////
  SET_HOTEL_SUBMIT_ID,
 SET_PAYMENT_SUBMIT_ID ,

  ////////////VEHICLE////////////
  SET_CAR_CONDITION,
  SET_CAR_CONDITION_ID,
  SET_CAR_TYPE,
  SET_CAR_TYPE_ID,
  SET_CAR_MAKE,
  SET_CAR_YEAR,

  ///////////////IMAGES//////////////
  SET_USER_IMAGE,
  EDIT_USER_IMAGE,
  /////////////////NAV PLACE///////////////
  SET_NAV_PLACE,

    ////////////////Locations STATES/////////////////////
    SET_COUNTRY_NAME,
    SET_COUNTRY_ID,
    SET_STATE_NAME,
    SET_STATE_ID,
    SET_CITY_NAME,
    SET_CITY_ID,
} from './actions';

const initialState = {
  ////////////////APP LOGIN STATES/////////////////////
  login_user_id: '',
  phone_no: '',

  ////////////////APP STATES/////////////////////
  hoteltype: '',
  hoteltype_id:'',

    ////////////////////Account Data Submition////////////////
    hotel_submit_id:'',
    payment_submit_id:'',

  ////////////VEHICLE////////////
  condition: '',
  condition_id :'',
  car_type: '',
  car_type_id:'',
  car_make: '',
  car_year: '',

  ////////////////IMAGES////////////
  user_image: '',
  edit_user_image: '',

  //////////////////NAV PLACE//////////////
  nav_place: '',

    ////////////////Locations STATES/////////////////////
    country_name: '',
    country_id: '',
    state_name: '',
    state_id: '',
    city_name: '',
    city_id: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
        ////////////////APP LOGIN STATES/////////////////////
        case SET_LOGIN_USER:
          return {...state, login_user_id: action.payload};
        case SET_PHONE_NO:
          return {...state, phone_no: action.payload};

    ////////////////APP STATES/////////////////////
    case SET_HOTEL_TYPE:
      return {...state, hoteltype: action.payload};
      case SET_HOTEL_TYPE_ID:
      return {...state, hoteltype_id: action.payload};

          ////////////////////Account Data Submition////////////////
          case SET_HOTEL_SUBMIT_ID:
            return {...state, hotel_submit_id: action.payload};
            case SET_PAYMENT_SUBMIT_ID:
              return {...state, payment_submit_id: action.payload};
       
    ////////////////VEHICLE////////////////
    case SET_CAR_CONDITION:
      return {...state, condition: action.payload};
      case SET_CAR_CONDITION_ID:
        return {...state, condition_id: action.payload};
    case SET_CAR_TYPE_ID:
      return {...state, car_type_id: action.payload};
      case SET_CAR_TYPE:
        return {...state, car_type: action.payload};
    case SET_CAR_MAKE:
      return {...state, car_make: action.payload};
    case SET_CAR_YEAR:
      return {...state, car_year: action.payload};

    ////////////////IMAGES/////////////
    case SET_USER_IMAGE:
      return {...state, user_image: action.payload};
      case EDIT_USER_IMAGE:
        return {...state, edit_user_image: action.payload};

    /////////////////////NAV PLACE////////////
    case SET_NAV_PLACE:
      return {...state, nav_place: action.payload};

          ////////////////Locations STATES/////////////////////
    case SET_COUNTRY_NAME:
      return {...state, country_name: action.payload};
    case SET_COUNTRY_ID:
      return {...state, country_id: action.payload};
    case SET_STATE_NAME:
      return {...state, state_name: action.payload};
    case SET_STATE_ID:
      return {...state, state_id: action.payload};
    case SET_CITY_NAME:
      return {...state, city_name: action.payload};
    case SET_CITY_ID:
      return {...state, city_id: action.payload};

    default:
      return state;
  }
}

export default userReducer;
