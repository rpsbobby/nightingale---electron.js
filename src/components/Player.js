import React from 'react';
import { Button, Container } from 'react-bootstrap';

function Player({ music, id, playNextSongFromQueue }) {
    
    let songPath = '';

    if (id) {
       songPath = music[id].songPath.toString();
    }
 
    function ended(e) {
       if (e) {
          playNextSongFromQueue();
       }
    }
 
    if (songPath !== '') {
       return (
          <Container className="d-flex justify-content-center bcplayer col-12 fixed-bottom">
             {/* <audio src={music} controls autoPlay> */}
             <audio
                onEnded={(e) => ended(e)}
                id="audio"
                style={{ width: '70%' }}
                src={songPath}
                controls
                autoPlay
             >
                <source type="audio/mpeg"></source>
                <source src={songPath} type="audio/mpeg"></source>
                {/* <source src={songToPlay} type="audio/mpeg"></source> */}
             </audio>
          </Container>
       );
    } else {
       return (
          <Container className="d-flex justify-content-center bcplayer col-12 fixed-bottom">
             {/* <audio src={music} controls autoPlay> */}
             <audio
                onEnded={(e) => ended(e)}
                id="audio"
                style={{ width: '70%' }}
                controls
                autoPlay
             >
                <source type="audio/mpeg"></source>
                {/* <source src={songToPlay} type="audio/mpeg"></source> */}
             </audio>
          </Container>
       );
    }
 }
 
 
 export default Player;