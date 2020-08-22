import React, { useContext, useReducer, createContext, Context } from 'react';

const USER_LOGIN = 'USER_LOGIN';
const USER_LOOUT = 'USER_LOOUT';

export const actions = { USER_LOGIN, USER_LOOUT };

const initialState = { username: 'ColorCC', isLogin: true, token: '' };

const userReducer = (
  state: object,
  action: { type: typeof USER_LOGIN | typeof USER_LOOUT; payload?: object }
) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.payload, isLogin: true };
    case USER_LOOUT:
      return { ...initialState };
    default:
      return { ...initialState };
  }
};

export const UserContext: Context<any> = createContext({});

export const UserProvider = ({ children }: any) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
