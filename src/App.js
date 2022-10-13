import './App.css';
import '@fontsource/roboto/500.css';
import SignUp from "./Pages/SignUp";
import {Routes, Route} from 'react-router-dom'
import {AuthContextProvider} from "./Context/AuthContext";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import PrivateRoutes from "./Pages/PrivateRoutes";

function App() {
  return (
      <>
          <AuthContextProvider>
              <Routes>
                  <Route path='/' element={<SignIn/>}/>
                  <Route path='/Register' element={<SignUp/>}/>
                  <Route path='/Dashboard' element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
              </Routes>
          </AuthContextProvider>

      </>
  );
}

export default App;
