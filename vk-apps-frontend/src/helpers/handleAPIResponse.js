export default (successAction, failureAction, dispatch) => response => {
  const action = (response.status && response.status === 200) ? successAction : failureAction;
  const payload = (response.status && response.status === 200) ? response.data : response;
  dispatch({
    type: action,
    payload: payload,
  });
  return response;
};