import React from 'react';
import MainWindow from './MainWindow';
import Player from './player';
import NavBar from './NavBar';
import Queue from './Queue';
import { ipcRenderer } from 'electron';

const App = () => {

   const [music, setMusic] = useState([]);

   useEffect(() => {
      ipcRenderer.send('get:music');
      ipcRenderer.on('send:music', (e, songs) => {
         // console.log(JSON.parse(songs));
         setMusic(JSON.parse(songs));
      });
   }, 
   []);

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
