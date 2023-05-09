import React, {useReducer,useState, useEffect} from "react";


// const reducerIF = (state,action) =>{
//     if (action.type === 'ERROR') {
//         return {
//             ...state,
//             error: true,
//             loading: false
//         }
//     }else if (action.type === 'CHECK') {
//         return {
//             ...state,
//             loading: true
//         }
//     }else{
//         return {
//             ...initialState
//         }
//     }
// }


// const reducerObject = (state,action) =>{
//     return {
//         'ERROR': {...state,error:true,loading:false},
//         'CHECK':{...state,loading:false}
//     }
// }

// const reducer = (state,action) =>{
//     if(reducerObject(state)[action.type]){
//         return reducerObject(state)[action.type]
//     }else{
//         return state;
//     }
// }


function UseReducer({name}){

    const SECURITY_CODE = "reducer"
    
    const initialState = {
        value: '',
        loading: false,
        error: false,
        mensaje: false,
        delete: false,
        confirmed: false
    }
    const actionTypes = {
        confirmed : 'CONFIRM',
        verify: 'CHECK',
        error: 'ERROR',
        writing: 'WRITE',
        deleted: 'DELETE',
        restart: 'RESET'
    }

    const reducerSwitch = (state,action) =>{
        console.log(state,action);
        switch (action.type) {
    
            case 'CONFIRM':
                return {
                    ...state,
                    mensaje: true,
                    loading: false,
                    confirmed: true
                }
                break;
    
            case 'ERROR':
                return {
                    ...state,
                    error: true,
                    loading: false
                }
            break;
    
            case 'CHECK':
                return {
                    ...state,
                    loading: true,
                    error:false,
                    mensaje:false
                }
            break;
    
            case 'WRITE':
                return {
                    ...state,
                    value: action.payload
                }
            break;
    
            case 'DELETE':
                return {
                    ...state,
                    delete: true
                }
            break;
    
            case 'RESET':
                return {
                    ...initialState
                }
            break;
        
            default:
                return {
                    ...initialState
                }
            break;
        }
    }

    const [state,dispatch] = React.useReducer(reducerSwitch,initialState)
    
    const onError = () =>{
        dispatch({
            type: actionTypes.error
        })
    }
    const onConfirmed = () =>{
        dispatch({
            type: actionTypes.confirmed
        })
    }
    // const onWrite = (event) =>{
    //     dispatch({
    //         type: actionTypes.writing,
    //         payload: event.target.value
    //     })
    // }
    const onWrite = ({target: {value}}) =>{
        dispatch({
            type: actionTypes.writing,
            payload: value
        })
    }
    const onCheck = () =>{
        dispatch({
            type: actionTypes.verify
        })
    }
    const onDelete = () => {
        dispatch({type: actionTypes.deleted})
    }
    const onReset = () =>{
        dispatch({
            type: actionTypes.restart
        })
    }
    useEffect(()=>{
        
        if (state.loading) {
            setTimeout(()=>{
                if (state.value !== SECURITY_CODE) {
                    // dispatch({
                    //     type: actionTypes.error
                        
                    // })
                    onError()
                }else{
                    // dispatch({
                    //     type: actionTypes.confirmed
                    // })
                    onConfirmed()
                }
            },3000)

           
        }
    },[state.loading])


    if (!state.delete && !state.confirmed) {
        return (
            <>
                <p>Por favor, escribe el código de seguridad</p>
                {state.error && <p>El codigo es incorrecto</p>}

                {state.loading && <p>Cargando...</p>}
                {state.mensaje && (<p>
                    Verificacion EXITOSA !!!
                </p>)}

                {/* onChange={(event)=>{
                    onWrite(event.target.value)
                    dispatch({
                        type: actionTypes.writing,
                        payload: event.target.value
                    })
                }} */}
                <input placeholder="Codigo de Seguridad" value={state.value} 
                    onChange={onWrite}
                    type="text" />
                
                <button onClick={()=>{
                    onCheck()
                    // dispatch({
                    //     type: actionTypes.verify
                    // })
                }}>Comprobar</button>
            </>
        )
    }else if(state.confirmed && !state.delete){
        return (
            <>
                <h3>¿Seguro de que quiere eliminar el estado?</h3>
                <button onClick={()=>{
                    onDelete()
                    // dispatch({type: actionTypes.deleted})
                }}>Si, eliminar</button>
                <button onClick={()=>{
                    onReset()
                    // dispatch({
                    //     type: actionTypes.restart
                    // })
                }}>No, mejor lo piensas con mas calma</button>
            </>
        )
    }else{
        return (
            <>
            <h3>Eliminado con exito</h3>
            <button onClick={onReset}>Deshacer cambios</button>
            </>
        )
    }

    
    
}

export default UseReducer