import './App.css';
import FirstStep from './components/FirstStep';
import './components/fonts.css'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import FourthStep from './components/FourthStep';
import Footer from './components/Footer';
import { FormProvider } from './context/FormContext';
import { PetDataProvider } from './context/petDataContext';
import DebugPetDataContext from './components/DebugPetDataContext ';


function App() {
  return (
    <FormProvider>
    <PetDataProvider>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={<FirstStep />}/>
      <Route path="/step2" element= {<SecondStep />}/>
      <Route path="/step3" element= {<ThirdStep />}/>
      <Route path="/step4" element= {<FourthStep />}/>
      </Routes>
      <Footer/>
      <DebugPetDataContext/>
    </div>
    </PetDataProvider>
    </FormProvider>
  );
}

export default App;
