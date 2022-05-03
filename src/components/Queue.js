import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { IoIosCloseCircle } from 'react-icons/io';

function Queue({ queue, deleteFromQueue }) {
   return (        
      <Container>
         {queue.map((song) => (
            <Card 
            key={Math.random()}>
               {song.songPath
                  .trim()
                  .split('\\')
                  .slice(-1)
                  .toString()
                  .slice(12, -4)}
               <button onClick={() => deleteFromQueue(song.id)}>
                  <IoIosCloseCircle />
               </button>
            </Card>
         ))}
      </Container>
   );
}

export default Queue;