import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, {authSaga} from './auth';
import post, {postSaga} from './post';

const rootReducer = combineReducers({
    loading,
    auth,
    post,
})

export function* rootSaga() {
    yield all([authSaga(), postSaga()]);
}

export default rootReducer;