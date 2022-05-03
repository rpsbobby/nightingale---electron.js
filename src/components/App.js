import React from 'react';
import MainWindow from './MainWindow';
import Player from './player';
import NavBar from './NavBar';
import Queue from './Queue';
import { ipcRenderer } from 'electron';

const App = () => {
   const [music, setMusic] = useState([]);
   const [queue, setQueue] = useState([]);

   const deleteFromQueue = (id) => {
      const temp = queue.filter((song) => song.id !== id);
      setQueue(temp);
   };

   useEffect(() => {
      ipcRenderer.send('get:music');
      ipcRenderer.on('send:music', (e, songs) => {
         // console.log(JSON.parse(songs));
         setMusic(JSON.parse(songs));
      });
   }, []);

   return (
      <div>
         <NavBar />
         <MainWindow />
         <Queue queue={queue} deleteFromQueue={deleteFromQueue} />
         <Player />
      </div>
   );
};

export default App;
