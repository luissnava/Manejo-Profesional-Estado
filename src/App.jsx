import Status from './components/useState'
import { ClassState } from './components/claassState'
import UseReducer from './components/useReducer'
import './App.css'

function App() {
  return (
    <>
     {/* <Status name="Status"></Status> */}
     <UseReducer name={'Reducer'}></UseReducer>
     {/* <ClassState name="ClassState"></ClassState> */}
    </>
  )
}

export default App


