import React from 'react';
import MainWindow from './MainWindow';
import Player from './player';
import NavBar from './NavBar';
import Queue from './Queue';
import { ipcRenderer } from 'electron';

const App = () => {
   const [music, setMusic] = useState([]);
   const [queue, setQueue] = useState([]);
   const [nextSong, setNextSong] = useState('');

   const [play, setPlay] = useState();

   const addToQueue = (id) => {
      console.log(nextSong);
      setQueue([...queue, music[id]]);
      if (nextSong === '') {
         setNextSong(id);
      }
   };

   const playNextSongFromQueue = () => {
      console.log(nextSong);
      console.log(queue[0].id);
      if (nextSong === queue[0].id) {
         setNextSong('');
      }
      setNextSong(queue[0].id);
      setQueue(queue.slice(1));
      console.log(nextSong);
   };

   const deleteFromQueue = (id) => {
      const temp = queue.filter((song) => song.id !== id);
      setQueue(temp);
   };

   const playSong = (id) => {
      setNextSong(id);
   };

   useEffect(() => {}, [nextSong]);

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
         <MainWindow 
         music={music}
               addToQueue={addToQueue}
               playSong={playSong}
         />
         <Queue queue={queue} deleteFromQueue={deleteFromQueue} />
         <Player 
           music={music}
           id={nextSong}
           playNextSongFromQueue={playNextSongFromQueue}
           />
      </div>
   );
};

export default App;
