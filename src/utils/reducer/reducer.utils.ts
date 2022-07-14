import { AnyAction } from "redux";

type Matchable<ActionCreator extends () => AnyAction> = ActionCreator & {
  type: ReturnType<ActionCreator>["type"]; //get the type attribute of the action
  match(action: AnyAction): action is ReturnType<ActionCreator>; //predicate function, narrow the scope down
};

// receives no action parameters and adds type and the match method to the actionCreator
export function withMatcher<
  ActionCreator extends () => AnyAction & { type: string }
>(actionCreator: ActionCreator): Matchable<ActionCreator>;

// receives action parameters
// ...args: any[] means concatenate all args into an array
export function withMatcher<
  ActionCreator extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: ActionCreator): Matchable<ActionCreator>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type; //since actionCreator always return some action
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      // if this passes, will narrow down from AnyAction to type
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
