import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MultiStepForm from './components/MultiStepForm';
import Footer from './components/Footer';
import './App.css';
import StepSuccess from './components/StepSuccess';
import StepFailure from './components/StepFailure';
import NotFound from './components/NotFound';
import MultiStepFormVirtual from './components/MultiStepFormVirtual';
import Interview from './components/Interview';
import Test from './components/TelephonicAsscessmentTestResult';
import MultiStepFormTest from './components/MultiStepFormTest'
import MultiStepFormVirtualAssessmentTest from './components/MultiStepFormVirualAssessmentTest';
import TelephonicAsscessmentTestResult from './components/TelephonicAsscessmentTestResult';
import VirtualAsscessmentTestResult from './components/VirtualAsscessmentTestResult';
// import MultiStepFormVirtualTest from './components/MultiStepFormVirtualTest';


function App() {
  return (
    <div className="App">
      <div className='flex-wrapper'>
        <div className="content-below-navbar">
          {/* Your main content here */}
            <Routes>
              <Route path="/" element={<NotFound />} />
              <Route path="/book-telephonic-slot" element={<MultiStepForm />} />
              <Route path="/online-assessment-test" element={<MultiStepFormVirtual />} />
              <Route path="/virtual-assessment-test" element={<MultiStepFormVirtualAssessmentTest />} />
              <Route path="/book-virtual-test" element={<MultiStepFormTest />}/>
              <Route path="/success" element={<StepSuccess />} />
              <Route path="/failure" element={<StepFailure />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/telephonictest-submit" element={<TelephonicAsscessmentTestResult />} />
              <Route path="/virtualtest-submit" element={<VirtualAsscessmentTestResult />} />
              <Route path="*" element={<NotFound />} />
              {/* Add more routes as needed */}
            </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
