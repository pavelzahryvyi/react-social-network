import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const SET_CAPTCHA = 'authReducer/SET_CAPTCHA';


const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                captchaUrl: null
            };
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl
            };
        default:
            return state;
    }
};

type SetAuthUserDataTypePayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataTypePayloadType
}

export const setAuthUserData
    = (id: number | null, email: string | null, login: string | null, isAuth: boolean | null): SetAuthUserDataType => (
    {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    }
);

type SetCaptureType = {
    type: typeof SET_CAPTCHA
    payload: { captchaUrl: string }
}

export const setCaptcha = (captchaUrl: string): SetCaptureType => (
    {
        type: SET_CAPTCHA,
        payload: {captchaUrl}
    }
);

export const getAuthUserDataThunk = () => async (dispatch: any) => {

    const response = await authAPI.me();
    if (response.resultCode === ResultCodesEnum.Success) {
        const {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

};

export const loginThunk
    = (email: string, password: string, rememberMe: boolean = false, captcha?: string) =>
    async (dispatch: any) => {

        const response = await authAPI.login(email, password, rememberMe, captcha);

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserDataThunk());
        } else {
            const err = response.messages.length > 0 ? response.messages[0] : "Some error";
            console.log('---Error', response)
            const action = stopSubmit("login", {_error: err});
            dispatch(action);

            if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                console.log("need captcha");
                dispatch(getCaptchaThunk());
            }
        }
    };

export const logoutThunk = () => async (dispatch: any) => {
    const response = await authAPI.logOut()

    if (response.resultCode === ResultCodesEnum.Success) {
        console.log(response);
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaThunk = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha();
    dispatch(setCaptcha(response.data.url));

    console.log('---captcha response', response)
}

export default authReducer;