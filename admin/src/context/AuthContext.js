import {createContext, useReducer, useEffect} from 'react'

export const AuthContext=createContext()

export const authReducer=(state,action)=>{
    switch(action.type){
        // Cases for Seller
        case 'SELLER_LOGIN':
            return {
                seller:action.payload
            }
            case 'SELLER_LOGOUT':
                return{
                    seller:null
            }

            // Cases for Buyer

            case 'BUYER_LOGIN':
                return {
                    buyer:action.payload
                }
                case 'BUYER_LOGOUT':
                    return{
                        buyer:null
                }
                
                // Cases for Admin

                case 'ADMIN_LOGIN':
                    return{
                        admin:action.payload
                    }
                    case 'ADMIN_LOGOUT':
                        return{
                            admin:null
                        }

            default:
                return{
                    state:null
                }

    }

}
export const AuthContextProvider=({children})=>{
    
    const [state, dispatch]=useReducer(authReducer,{
        seller:null,
        buyer:null
    })
    useEffect(() => {
      
        const seller=JSON.parse(localStorage.getItem('seller'))
        console.log('seller',seller)

        if(seller){
            dispatch({type:'SELLER_LOGIN', payload: seller})
        }

        const buyer=JSON.parse(localStorage.getItem('buyer'))

        if(buyer){
            dispatch({type:'BUYER_LOGIN', payload: buyer})
        }

        const admin =JSON.parse(localStorage.getItem('admin'))
        if(admin){
            dispatch({type:'ADMIN_LOGIN', payload: admin})

        }
    }, [])
    

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
