import React, { useState } from 'react';
import './App.css';
import Xoom from './Xoom';

function App() {
  const [joinMeeting, setJoinMeeting] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
      {
        joinMeeting ? <Xoom /> : <button style={{border:'1px solid white'}} onClick={() => setJoinMeeting(true)}>Join Meeting</button>
      }
      </header>
    </div>
  );
}

export default App;
