import Immutable from 'seamless-immutable';

import { apiPaymentApplicationConstants } from '../constants';

const initialState = Immutable({
  incomingPaymentApplications: [],
  outgoingPaymentApplications: [],
  fetching: false,
  errors: null,
});

const apiPaymentApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case apiPaymentApplicationConstants.CREATE_PAYMENT_APPLICATION_REQUEST:
    case apiPaymentApplicationConstants.GET_INCOMING_PAYMENT_APPLICATIONS_REQUEST:
    case apiPaymentApplicationConstants.GET_OUTGOING_PAYMENT_APPLICATIONS_REQUEST:
    case apiPaymentApplicationConstants.ACCEPT_PAYMENT_APPLICATION_REQUEST:
    case apiPaymentApplicationConstants.REJECT_PAYMENT_APPLICATION_REQUEST:
      return state.merge({
        fetching: true,
      });

    case apiPaymentApplicationConstants.CREATE_PAYMENT_APPLICATION_SUCCESS:
    case apiPaymentApplicationConstants.ACCEPT_PAYMENT_APPLICATION_SUCCESS:
    case apiPaymentApplicationConstants.REJECT_PAYMENT_APPLICATION_SUCCESS:
      return state.merge({
        errors: null,
        fetching: false,
      });

    case apiPaymentApplicationConstants.GET_INCOMING_PAYMENT_APPLICATIONS_SUCCESS:
      return state.merge({
        incomingPaymentApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiPaymentApplicationConstants.GET_OUTGOING_PAYMENT_APPLICATIONS_SUCCESS:
      return state.merge({
        outgoingPaymentApplications: action.payload,
        fetching: false,
        errors: null,
      });

    case apiPaymentApplicationConstants.CREATE_PAYMENT_APPLICATION_FAILURE:
    case apiPaymentApplicationConstants.GET_INCOMING_PAYMENT_APPLICATIONS_FAILURE:
    case apiPaymentApplicationConstants.GET_OUTGOING_PAYMENT_APPLICATIONS_FAILURE:
    case apiPaymentApplicationConstants.ACCEPT_PAYMENT_APPLICATION_FAILURE:
    case apiPaymentApplicationConstants.REJECT_PAYMENT_APPLICATION_FAILURE:
      return state.merge({
        errors: action.payload,
        fetching: false,
      });

    default:
      return state;
  }
};

export default apiPaymentApplicationReducer;
