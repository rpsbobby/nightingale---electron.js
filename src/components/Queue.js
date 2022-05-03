import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { IoIosCloseCircle } from 'react-icons/io';
function Queue({ queue, deleteFromQueue }) {
   return (        
      <Container className="border bcqueue col-3 float-right pt-5 pb-5">
         {queue.map((song) => (
            <Card className= "card p-1 shadow-sm bg-light rounded text-center"
            key={Math.random()}>
               {song.songPath
                  .trim()
                  .split('\\')
                  .slice(-1)
                  .toString()
                  .slice(12, -4)}
               <button button
                type="button"
                className="btn p-2 btn-outline-danger" onClick={() => deleteFromQueue(song.id)}>
                  <IoIosCloseCircle />
               </button>
            </Card>
         ))}
      </Container>
   );
}

export default Queue;