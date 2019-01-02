const CREATE_PAYMENT_APPLICATION_REQUEST = 'api/CREATE_PAYMENT_APPLICATION_REQUEST';
const CREATE_PAYMENT_APPLICATION_SUCCESS = 'api/CREATE_PAYMENT_APPLICATION_SUCCESS';
const CREATE_PAYMENT_APPLICATION_FAILURE = 'api/CREATE_PAYMENT_APPLICATION_FAILURE';

const GET_INCOMING_PAYMENT_APPLICATIONS_REQUEST = 'api/GET_INCOMING_PAYMENT_APPLICATIONS_REQUEST';
const GET_INCOMING_PAYMENT_APPLICATIONS_SUCCESS = 'api/GET_INCOMING_PAYMENT_APPLICATIONS_SUCCESS';
const GET_INCOMING_PAYMENT_APPLICATIONS_FAILURE = 'api/GET_INCOMING_PAYMENT_APPLICATIONS_FAILURE';

const GET_OUTGOING_PAYMENT_APPLICATIONS_REQUEST = 'api/GET_OUTGOING_PAYMENT_APPLICATIONS_REQUEST';
const GET_OUTGOING_PAYMENT_APPLICATIONS_SUCCESS = 'api/GET_OUTGOING_PAYMENT_APPLICATIONS_SUCCESS';
const GET_OUTGOING_PAYMENT_APPLICATIONS_FAILURE = 'api/GET_OUTGOING_PAYMENT_APPLICATIONS_FAILURE';

const ACCEPT_PAYMENT_APPLICATION_REQUEST = 'api/ACCEPT_PAYMENT_APPLICATION_REQUEST';
const ACCEPT_PAYMENT_APPLICATION_SUCCESS = 'api/ACCEPT_PAYMENT_APPLICATION_SUCCESS';
const ACCEPT_PAYMENT_APPLICATION_FAILURE = 'api/ACCEPT_PAYMENT_APPLICATION_FAILURE';

const REJECT_PAYMENT_APPLICATION_REQUEST = 'api/REJECT_PAYMENT_APPLICATION_REQUEST';
const REJECT_PAYMENT_APPLICATION_SUCCESS = 'api/REJECT_PAYMENT_APPLICATION_SUCCESS';
const REJECT_PAYMENT_APPLICATION_FAILURE = 'api/REJECT_PAYMENT_APPLICATION_FAILURE';

export const apiPaymentApplicationConstants = {
  CREATE_PAYMENT_APPLICATION_REQUEST, CREATE_PAYMENT_APPLICATION_SUCCESS, CREATE_PAYMENT_APPLICATION_FAILURE,
  GET_INCOMING_PAYMENT_APPLICATIONS_REQUEST, GET_INCOMING_PAYMENT_APPLICATIONS_SUCCESS,
  GET_INCOMING_PAYMENT_APPLICATIONS_FAILURE, GET_OUTGOING_PAYMENT_APPLICATIONS_REQUEST,
  GET_OUTGOING_PAYMENT_APPLICATIONS_SUCCESS, GET_OUTGOING_PAYMENT_APPLICATIONS_FAILURE,
  ACCEPT_PAYMENT_APPLICATION_REQUEST, ACCEPT_PAYMENT_APPLICATION_SUCCESS, ACCEPT_PAYMENT_APPLICATION_FAILURE,
  REJECT_PAYMENT_APPLICATION_REQUEST, REJECT_PAYMENT_APPLICATION_SUCCESS, REJECT_PAYMENT_APPLICATION_FAILURE
};