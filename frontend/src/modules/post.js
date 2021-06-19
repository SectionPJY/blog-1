import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import * as postAPI from '../lib/api/post';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';

const [WRITE, WRITE_SUCCESS, WRITE_FAILURE] = createRequestActionTypes('post/WRITE');

export const write = createAction(WRITE, formData => formData);

const writeSaga = createRequestSaga(WRITE, postAPI.write);
export function* postSaga() {
    takeLatest(WRITE, writeSaga);
}

const initialState = {
    postError : '',
}

const post = handleActions(
    {
        [WRITE_SUCCESS] : (state, {payload : e}) => (
            {
                ...state,
                postError : e,
            }
        ),
        [WRITE_FAILURE] : (state, {payload : e}) => (
            {
                ...state,
                postError : e
            }
        )
    },
    initialState
)

export default post;