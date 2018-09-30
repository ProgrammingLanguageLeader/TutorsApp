export const BASE_URL = 'https://tutors-backend.herokuapp.com/api/v1'

export const CALL_API = 'call_api'

export default store => next => action => {
    if (!action || !action[CALL_API]) {
        return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = action[CALL_API].types;
    next({
        ...action, 
        type: REQUEST
    });

    const endpoint = action[CALL_API].endpoint;
    const post = action[CALL_API].post ? {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(
            {
                ...action[CALL_API].post, 
                regId: getToken(store)
            }
        )} : {}
    fetch(`${BASE_URL}/${endpoint}`, post)
        .then(response => {
            return response.json()
        })
        .then(result => {
            next({...action, result, type: SUCCESS});
        })
        .catch(error => {
            next({...action, error, type: FAILURE});
        });
}

const getToken = (store) => {
    const state = store.getState()
    return state.auth && state.auth.hasAuth ? state.auth.authInfo.token : "" // defaultAuth.token
}