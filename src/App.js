import './App.css';
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './Components/Register';
import GameComponent from './Components/GameComponent';

function App() {
  const [gameLevel, setGameLevel] = useState('easy'); // Default game level

  // Function to set the game level from Register component
  const handleGameLevelChange = (level) => {
    setGameLevel(level);
  };
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<Register  onGameLevelChange={handleGameLevelChange} initialGameLevel={gameLevel}/>}/>
        <Route path="/squidgame" element={<GameComponent gameLevel={gameLevel}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
