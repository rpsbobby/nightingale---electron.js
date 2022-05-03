import React from 'react';
import MainWindow from './MainWindow';
import Player from './player';
import NavBar from './NavBar';

const App = () => {
   return (
      <div>
         <NavBar />
         <MainWindow />
         //queue
         <Player/>
      </div>
   );
};

export default App;
