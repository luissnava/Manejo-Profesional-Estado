import React ,{useEffect, useState} from "react";
const SECURITY_CODE = "pragma"

function Status({name}){

    const [state, setState] = React.useState({
        value: '',
        loading: false,
        error: false,
        mensaje: false,
        delete: false,
        confirmed: false

    })

    // ***** Estados Independientes ****

    // const [value, setValue] = useState('')
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const [mensaje, setMensaje] = useState(false)

    const onError = () =>{
        setState({...state, error: true, loading:false})
    }
    const onConfirmed = () =>{
        setState({...state, mensaje:true, loading:false, confirmed: true})
    }
    const onWrite = (newValue) =>{
        setState({...state, value: newValue})
    }
    const onCheck = () =>{
        setState({...state, loading: true, error: false, mensaje:false})
    }
    const onDelete = () => {
        setState({...state,delete: true})
    }
    const onReset = () =>{
        setState({
            ...state,
            confirmed: false
        })
    }
    useEffect(()=>{
        
        if (state.loading) {
            setTimeout(()=>{
                if (state.value !== SECURITY_CODE) {
                    onConfirmed()
                }else{
                    onError()
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
                <input placeholder="Codigo de Seguridad" value={state.value} onChange={(event)=>{
                    onWrite(event.target.value)
                }} type="text" />
                
                <button onClick={()=>{
                    // setLoading(true)
                    // setError(false)
                    // setMensaje(false)
                    // setState(prevState => ({...prevState, loading: true, error: false, mensaje:false}))
                    onCheck()
                }}>Comprobar</button>
            </>
        )
    }else if(state.confirmed && !state.delete){
        return (
            <>
                <h3>¿Seguro de que quiere eliminar el estado?</h3>
                <button onClick={()=>{
                    onDelete()
                }}>Si, eliminar</button>
                <button onClick={()=>{
                    onReset()
                }}>No, mejor lo piensas con mas calma</button>
            </>
        )
    }else{
        return (
            <>
            <h3>Eliminado con exito</h3>
            <button onClick={()=>{
                setState({...state,confirmed:false,delete:false})
            }}>Deshacer cambios</button>
            </>
        )
    }
}

export default Status