import React from 'react';
import MainWindow from './MainWindow';
import Player from './player';
import NavBar from './NavBar';
import Queue from './Queue';

const App = () => {
   return (
      <div>
         <NavBar />
         <MainWindow />
         <Queue />
         <Player/>
      </div>
   );
};

export default App;
