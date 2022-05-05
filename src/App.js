import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import NavBar from './components/NavBar';
import Card from './components/Card';
import Queue from './components/Queue';
import Player from './components/Player';

const App = () => {
   // props
   const [music, setMusic] = useState([]);
   const [queue, setQueue] = useState([]);
   const [favorites, setFavorites] = useState([]);
   const [nextSong, setNextSong] = useState('');

   useEffect(() => {
      getMusic();
      getFavorites();
   }, []);

   // EVENT HANDLERS
   // favorites
   const addToFavorites = (id) => {
      updateMusic(id, true);
      // add to favorites array
      if (!favorites.includes(id)) {
         setFavorites([...favorites, id]);
      }
   };

   const removeFromFavorites = (id) => {
      updateMusic(id, false);
      // filter favorites -> return value if doesn't match id
      setFavorites(favorites.filter((element) => element !== id));
   };

   const updateMusic = (id, bool) => {
      music.map((song) => {
         if (song.id === id) {
            song.favorite = bool;
         }
      });
      setMusic([...music]);
   };

   // play next song with button click or from the queue
   const playSong = (id) => {
      setNextSong(id);
   };

   const playNextSongFromQueue = () => {
      if (nextSong === queue[0].id) {
         setNextSong('');
      }
      setNextSong(queue[0].id);
      setQueue(queue.slice(1));
   };

   // queue add and delete
   const addToQueue = (id) => {
      if (!queue.includes(id)) {
         setQueue([...queue, music[id]]);
      }
      if (nextSong === '') {
         setNextSong(id);
      }
   };
   const deleteFromQueue = (id) => {
      const temp = queue.filter((song) => song.id !== id);
      setQueue(temp);
   };

   // ipcRenderer methods
   const getMusic = () => {
      ipcRenderer.send('get:music');
      ipcRenderer.on('send:music', (e, songs) => {
         setMusic(JSON.parse(songs));
      });
   };

   const getFavorites = () => {
      ipcRenderer.send('get:favorites');
      ipcRenderer.on('send:favorites', (e, fav) => {
         setFavorites(JSON.parse(fav));
      });
   };

   ipcRenderer.on('get:favorites:onclose', () => {
      ipcRenderer.send('save:favorites', JSON.stringify(favorites));
   });

   const handleFavorite = (id) => {
      if (favorites.includes(id)) {
         removeFromFavorites(id);
      } else {
         addToFavorites(id);
      }
   };

   return (
      <div className="col">
         <div className="row">
            <NavBar />
         </div>
         <div className="row">
            <div className="border bccard col-9 pt-5 pb-5 px-4">
               {music.map((song) => (
                  <Card
                     id={song.id}
                     songPath={song.songPath}
                     favorite={song.favorite}
                     handleFavorite={handleFavorite}
                     addToQueue={addToQueue}
                     playSong={playSong}
                  />
               ))}
            </div>
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
