import {createContext, useReducer, useEffect} from 'react'

export const AuthContext=createContext()

export const authReducer=(state,action)=>{
    switch(action.type){
        // Cases for User
        case 'USER_LOGIN':
            return {
                user:action.payload
            }
            case 'USER_LOGOUT':
                return{
                    user:null
            }
            default:
                return{
                    state:null
                }

    }

}
export const AuthContextProvider=({children})=>{
    
    const [state, dispatch]=useReducer(authReducer,{
        user:null,
    
    })
    useEffect(() => {
      
        const user=JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type:'USER_LOGIN', payload: user})
        }

       
    }, [])
    
    console.log('AuthContext State: ', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
