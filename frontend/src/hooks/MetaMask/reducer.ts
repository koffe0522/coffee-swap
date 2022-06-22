export type State = {
  account: string;
};

export type Action = {
  type: ActionType;
  payload: State;
};

export enum ActionType {
  ACTION_SET_ACCOUNT = "ACTION_SET_ACCOUNT",
  ACTION_CLEAR_ACCOUNT = "ACTION_DELETE_ACCOUNT",
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.ACTION_SET_ACCOUNT:
      return { account: action.payload.account };
    case ActionType.ACTION_CLEAR_ACCOUNT:
      return { account: "" };
    default:
      return state;
  }
};
