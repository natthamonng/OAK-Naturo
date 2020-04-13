import { authService } from '../services/auth.service';

const BASE_URL = 'http://localhost:8080';

export const profileDataFetchSuccess = (data) => {
    return {
        type:'PROFILE_DATA_REQ_SUCCESS',
        data
    }
};

export const profileDataFetchFailure = () => {
    return {
        type:'PROFILE_DATA_REQ_FAILED'
    }
};

export const fetchUserData = () => {
    return async (dispatch) => {
        const response = await fetch( `${BASE_URL}/api/me`, {
            method: 'GET',
            headers: {
                'Authorization': authService.getToken()
            }
        });

        if(response.ok){
            response.json().then(data => {
                dispatch(profileDataFetchSuccess(data));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        }
        else{
            response.json().then(error => {
                dispatch(profileDataFetchFailure(error));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        }

        return response;
    }
};