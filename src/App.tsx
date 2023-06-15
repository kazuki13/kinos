import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './js/Home'; //作成したpage1.jsを読
import React2 from './js/React'
import React from 'react'


class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/React`} element={<React2 />} />
          {/* <Route path={`φωτίζω`} element={<Jetbot />} />
          <Route path={`E-gate`} element={<Egate />} />
          <Route path={`Face`} element={<Face />} />
          <Route path={`satoukibi`} element={<Satoukibi />} />
          <Route path={`other`} element={<Others />} /> */}
        </Routes>
      </BrowserRouter>
    );
  };
}


export default App;