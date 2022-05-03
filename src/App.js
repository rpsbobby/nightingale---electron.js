import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import MainWindow from './components/MainWindow';
import NavBar from './components/NavBar';
import Queue from './components/Queue';
import Player from './components/Player';
import { Container } from 'react-bootstrap';

const App = () => {
   const [music, setMusic] = useState([]);
   const [queue, setQueue] = useState([]);
   const [favorites, setFavorites] = useState([]);

   const [nextSong, setNextSong] = useState('');

   const [play, setPlay] = useState();

   const addToQueue = (id) => {
      console.log(nextSong);
      setQueue([...queue, music[id]]);
      if (nextSong === '') {
         setNextSong(id);
      }
   };

   const addToFavorites = (id) => {
      setFavorites([...favorites, music[id]]);
      console.log(favorites);
   };

   const playSong = (id) => {
      setNextSong(id);
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

   useEffect(() => {}, [nextSong]);

   useEffect(() => {
      ipcRenderer.send('get:music');
      ipcRenderer.on('send:music', (e, songs) => {
         // console.log(JSON.parse(songs));
         setMusic(JSON.parse(songs));
      });
   }, []);

   return (
      <div className="col">
         <div className="row">
            <NavBar />
         </div>
         <div className="row">
            <MainWindow
               music={music}
               addToQueue={addToQueue}
               playSong={playSong}
               addToFavorites={addToFavorites}
            />
            <Queue queue={queue} deleteFromQueue={deleteFromQueue} />
         </div>
         <div className="row">
            <Player
               music={music}
               id={nextSong}
               playNextSongFromQueue={playNextSongFromQueue}
            />
         </div>
      </div>
   );
};

export default App;
