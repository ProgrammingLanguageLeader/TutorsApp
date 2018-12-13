import { makeApiRequest } from "../services/api";
import { apiPaymentApplicationConstants } from "../constants";

const createPaymentApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiPaymentApplicationConstants.CREATE_PAYMENT_APPLICATION_REQUEST
    });
    return makeApiRequest('create_payment_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiPaymentApplicationConstants.CREATE_PAYMENT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiPaymentApplicationConstants.CREATE_PAYMENT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getIncomingPaymentApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiPaymentApplicationConstants.GET_INCOMING_PAYMENT_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_incoming_payment_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiPaymentApplicationConstants.GET_INCOMING_PAYMENT_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiPaymentApplicationConstants.GET_INCOMING_PAYMENT_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const getOutgoingPaymentApplications = (options) => {
  return async dispatch => {
    dispatch({
      type: apiPaymentApplicationConstants.GET_OUTGOING_PAYMENT_APPLICATIONS_REQUEST
    });
    return makeApiRequest('get_outgoing_payment_applications', 'get', options)
      .then(
        response => {
          dispatch({
            type: apiPaymentApplicationConstants.GET_OUTGOING_PAYMENT_APPLICATIONS_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiPaymentApplicationConstants.GET_OUTGOING_PAYMENT_APPLICATIONS_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const acceptPaymentApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiPaymentApplicationConstants.ACCEPT_PAYMENT_APPLICATION_REQUEST
    });
    return makeApiRequest('accept_payment_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiPaymentApplicationConstants.ACCEPT_PAYMENT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiPaymentApplicationConstants.ACCEPT_PAYMENT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

const rejectPaymentApplication = (options) => {
  return async dispatch => {
    dispatch({
      type: apiPaymentApplicationConstants.REJECT_PAYMENT_APPLICATION_REQUEST
    });
    return makeApiRequest('reject_payment_application', 'post', options)
      .then(
        response => {
          dispatch({
            type: apiPaymentApplicationConstants.REJECT_PAYMENT_APPLICATION_SUCCESS,
            payload: response,
          })
        },
        errors => {
          dispatch({
            type: apiPaymentApplicationConstants.REJECT_PAYMENT_APPLICATION_FAILURE,
            payload: errors,
          });
        }
      )
  }
};

export const apiPaymentApplicationActions = {
  createApplication: createPaymentApplication,
  getIncomingApplications: getIncomingPaymentApplications,
  getOutgoingApplications: getOutgoingPaymentApplications,
  acceptApplication: acceptPaymentApplication,
  rejectApplication: rejectPaymentApplication
};
