  ////////////////APP STATES/////////////////////
export const SET_HOTEL_TYPE = 'SET_HOTEL_TYPE';
export const SET_PHONE_NO = 'SET_PHONE_NO';

////////////////////Account Data Submition////////////////
export const SET_HOTEL_SUBMIT_ID = 'SET_HOTEL_SUBMIT_ID';
export const SET_PAYMENT_SUBMIT_ID = 'SET_PAYMENT_SUBMIT_ID';

////////////////////////VEHICLE///////////////
export const SET_CAR_CONDITION = 'SET_CAR_CONDITION';
export const SET_CAR_CONDITION_ID = 'SET_CAR_CONDITION_ID';
export const SET_CAR_TYPE = 'SET_CAR_TYPE';
export const SET_CAR_TYPE_ID = 'SET_CAR_TYPE_ID';
export const SET_CAR_MAKE = 'SET_CAR_MAKE';
export const SET_CAR_YEAR = 'SET_CAR_YEAR';

//////////////////IMAGES/////////////////
export const SET_USER_IMAGE= 'SET_USER_IMAGE';
export const EDIT_USER_IMAGE= 'EDIT_USER_IMAGE';

/////////////////////NavPlace///////////////////
export const SET_NAV_PLACE= 'SET_NAV_PLACE';

  ////////////////APP STATES/////////////////////


  ///////////////User Login Info///////////////
export const setPhoneNumber = phone_no => dispatch => {
    dispatch({
        type: SET_PHONE_NO,
        payload: phone_no,
    });
};


////////////////////Account creation////////////////
export const setHotelType = hoteltype => dispatch => {
    dispatch({
        type: SET_HOTEL_TYPE,
        payload: hoteltype,
    });
};

////////////////////Account Data Submition////////////////
export const setHotelSubmitId = hotel_submit_id => dispatch => {
    dispatch({
        type: SET_HOTEL_SUBMIT_ID,
        payload: hotel_submit_id,
    });
};

export const setPaymentSubmitId = payment_submit_id => dispatch => {
    dispatch({
        type: SET_PAYMENT_SUBMIT_ID,
        payload: payment_submit_id,
    });
};


//////////////////////Car Info//////////////////
export const setCarCondition = condition => dispatch => {
    dispatch({
        type: SET_CAR_CONDITION,
        payload: condition,
    });
};
export const setCarConditionId = condition_id => dispatch => {
    dispatch({
        type: SET_CAR_CONDITION_ID,
        payload: condition_id,
    });
};
export const setCarType = car_type => dispatch => {
    dispatch({
        type: SET_CAR_TYPE,
        payload: car_type,
    });
};
export const setCarTypeId = car_type_id => dispatch => {
    dispatch({
        type: SET_CAR_TYPE_ID,
        payload: car_type_id,
    });
};
export const setCarMake = car_make => dispatch => {
    dispatch({
        type: SET_CAR_MAKE,
        payload: car_make,
    });
};
export const setCarYear = car_year => dispatch => {
    dispatch({
        type: SET_CAR_YEAR,
        payload: car_year,
    });
};

//////////////////////images Info//////////////////

export const setUserImage = user_image => dispatch => {
    dispatch({
        type: SET_USER_IMAGE,
        payload: user_image,
    });
};

export const editUserImage = edit_user_image => dispatch => {
    dispatch({
        type: EDIT_USER_IMAGE,
        payload: edit_user_image,
    });
};


///////////////Navigation place for camera picker///////////////////////
export const setNavPlace = nav_place => dispatch => {
    dispatch({
        type: SET_NAV_PLACE,
        payload: nav_place,
    });
};