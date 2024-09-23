
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Flow from './pages/Flow/flow';
import WriteMsg from './pages/WriteMsg/writeMsg';
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Flow />} /> 
        <Route path="/WriteMsg" element={<WriteMsg />} />  
       </Routes>
    </BrowserRouter>
  )
}

export default App