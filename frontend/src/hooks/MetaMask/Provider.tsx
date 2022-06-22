import { createContext, ReactNode, useReducer } from "react";
import { ActionType, reducer, Action, State } from "./reducer";

const initState = { account: "" };
export const MetaMeskStateContext = createContext<State>(initState);
export const MetaMeskDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

export function MetaMeskProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <MetaMeskStateContext.Provider value={state}>
      <MetaMeskDispatchContext.Provider value={dispatch}>
        {children}
      </MetaMeskDispatchContext.Provider>
    </MetaMeskStateContext.Provider>
  );
}
