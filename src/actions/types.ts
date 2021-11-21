// Alerts
export const SET_ALERT = 'SET_ALERT';
export const SET_LOADING = 'SET_LOADING';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';

type AuthenticatedAction = {
  user: User;
  type: typeof AUTHENTICATED;
};

type UnauthenticatedAction = {
  type: typeof UNAUTHENTICATED;
};

type SetAlertAction = {
  alert: Alert;
  type: typeof SET_ALERT;
};

type RemoveAlertAction = {
  id: string;
  type: typeof REMOVE_ALERT;
};

export type LoadingAction = {
  value: boolean;
  type: typeof SET_LOADING;
};

export type AlertActions = SetAlertAction | RemoveAlertAction;
export type AuthenticationActions = AuthenticatedAction | UnauthenticatedAction;
