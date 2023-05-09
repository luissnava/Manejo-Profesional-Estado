import React from "react";
const SECURITY_CODE = "solidity"
class ClassState extends React.Component{
   
    
    constructor(props){
        super(props)
        this.state ={
            value: '',
            error: false,
            loading: false
        };
    }

    componentDidMount(){
        console.log("component methods");
    }
    componentWillUnmount(){
        console.log("component methods");
    }
    componentDidUpdate(){
        if (this.state.loading) {
            setTimeout(()=>{
                if (SECURITY_CODE == this.state.value) {
                    this.setState({error: false, loading: false})
                }else{
                    this.setState({error:true, loading: false})
                }
            },3000)
        }
    }
    render(){
        const {error,value,loading} = this.state
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el código de seguridad</p>
                {
                    this.state.error && (
                        <p>Error: el codigo es incorrecto</p>
                    )
                }
                {
                    this.state.loading && (
                        <p>Cargando..</p>
                    )
                }
                <input placeholder="Codigo de Seguridad" type="text" value={this.state.value} onChange={(event) => {this.setState({value: event.target.value})}}/>

                {/* <button onClick={()=>this.setState(prevState => ({error: !prevState.error}))}>Comprobar</button> */}

                <button onClick={()=>{
                    this.setState({loading: true, error: false})
                }}>Comprobar</button>
            </div>
        )
    }
}

export {ClassState}