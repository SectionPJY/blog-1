import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import * as userAPI from '../lib/api/user';
import { takeLatest } from '@redux-saga/core/effects';

const LOGOUT = 'user/LOGOUT';

export const logout = createAction(LOGOUT);

export const logoutSaga = createRequestSaga(LOGOUT, userAPI.logout);
export function* userSaga() {
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {};

const user = handleActions(
    {
        [LOGOUT] : (state, payload) => ({
            ...state,
        })
    },
    initialState
);

export default user;
    
