import React, { createContext, useContext, useReducer } from "react";

const initialState = {
	userStatus: false,
	userPic: "",
    search: "",
	userDoc: null,
};

const reducer = (state, action) => {
    switch(action.type) {
        case "set_pic":
			return {
				...state,
				userStatus: action.status,
				userPic: action.userPic,
            };
            
		case "set_doc":
			return {
				...state,
				userDoc: action.userDoc,
			}
		
		case "set_search":
			return {
				...state,
				search: action.search,
            };
            
		default: 
			return state;
	}
};


export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    return(
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    );    
};

export const useStateValue = () => useContext(StateContext);