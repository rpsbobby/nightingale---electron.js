import React from "react";
import { Container } from "react-bootstrap";
import { IoIosAddCircle, IoIosPlayCircle, IoIosStarOutline } from "react-icons/io";
import "../App.css";

export const MainWindow = ({ music, addToQueue, playSong, addToFavorites }) => {
  const resolveTheName = (str) => {
    let arr = string.split("\\");
    let songName = arr[arr.length - 1];
    return songName.slice(-4);
  };
  return (
    <Container>
      {music.map((song) => (
        
          <div class="" key={song.id}>               
            {song.songPath
              .trim()
              .split("\\")
              .slice(-1)
              .toString()
              .slice(12, -4).slice(0, 20).concat('...') }
            <div class="">
              <button onClick={(e) => {
                  playSong(song.id);
                }}
              >
                <IoIosPlayCircle />
              </button>
              <button onClick={(e) => {
                  addToQueue(song.id);
                }}
              >
                <IoIosAddCircle />
              </button>
              <button onClick={(e) => {
                  addToFavorites(song.id);
                }}
              >
                <IoIosStarOutline />
              </button>
            </div>
          </div>
        
      ))}
    </Container>
  );
};

export default MainWindow;
