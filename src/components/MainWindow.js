import React from 'react';
import { Container, Card, CardGroup, CardImg } from 'react-bootstrap';
import {
   IoIosAddCircle,
   IoIosPlayCircle,
   IoIosStarOutline,
   IoIosStar,
} from 'react-icons/io';
import path from 'path';
import '../App.css';

export const MainWindow = ({
   music,
   addToQueue,
   playSong,
   addToFavorites,
   removeFromFavorites,
}) => {
   return (
      <Container className="border bccard col-9 pt-5 pb-5 px-4">
         {music.map((song) => (
            <div
               className="card2 bgimg mt-4 col-3 p-2 shadow-md rounded text-center"
               key={song.id}
            >
               <img
                  className="bird"
                  src="https://cdn-icons-png.flaticon.com/512/3362/3362384.png"
                  width="50px"
                  height="50px"
               />
               {song.songPath
                  .trim()
                  .split('\\')
                  .slice(-1)
                  .toString()
                  .slice(12, -4)
                  .slice(0, 20)
                  .concat('...')}
               <div className="p-1">
                  <button
                     type="button"
                     className="btn btn-light p-3 rounded-10 border"
                     onClick={(e) => {
                        playSong(song.id);
                     }}
                  >
                     <IoIosPlayCircle />
                  </button>
                  <button
                     type="button"
                     className="btn btn-light p-3 rounded-10 border"
                     onClick={(e) => {
                        addToQueue(song.id);
                     }}
                  >
                     <IoIosAddCircle />
                  </button>
                  {song.favorite ? (
                     <button
                        type="button"
                        className="btn btn-light p-3 rounded-10 border"
                        onClick={(e) => {
                           removeFromFavorites(song.id);
                        }}
                     >
                        <IoIosStar />
                     </button>
                  ) : (
                     <button
                        type="button"
                        className="btn btn-light p-3 rounded-10 border"
                        onClick={(e) => {
                           addToFavorites(song.id);
                        }}
                     >
                        <IoIosStarOutline />
                     </button>
                  )}
               </div>
            </div>
         ))}
      </Container>
   );
};

export default MainWindow;
