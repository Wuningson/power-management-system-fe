// Alerts
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';

type AuthenticatedAction = {
  type: typeof AUTHENTICATED;
  user: User;
};

type UnauthenticatedAction = {
  type: typeof UNAUTHENTICATED;
};

type SetAlertAction = {
  type: typeof SET_ALERT;
  alert: Alert;
};

type RemoveAlertAction = {
  type: typeof REMOVE_ALERT;
  id: string;
};

export type AuthenticationActions = AuthenticatedAction | UnauthenticatedAction;
export type AlertActions = SetAlertAction | RemoveAlertAction;
