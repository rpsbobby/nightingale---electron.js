import React from 'react';
import {
   IoIosAddCircle,
   IoIosPlayCircle,
   IoIosStarOutline,
   IoIosStar,
} from 'react-icons/io';

function Card({
   id,
   songPath,
   favorite,
   handleFavorite,
   playSong,
   addToQueue,
}) {
   return (
      <>
         <div
            className="card2 bgimg mt-5 col-3 p-2 shadow-md rounded text-center"
            key={id}
         >
            <img
               className="bird"
               src="https://cdn-icons-png.flaticon.com/512/3362/3362384.png"
               width="50px"
               height="50px"
            />
            {songPath
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
                     e.preventDefault();
                     playSong(id);
                  }}
               >
                  <IoIosPlayCircle />
               </button>
               <button
                  type="button"
                  className="btn btn-light p-3 rounded-10 border"
                  onClick={(e) => {
                     e.preventDefault();
                     addToQueue(id);
                  }}
               >
                  <IoIosAddCircle />
               </button>

               <button
                  type="button"
                  className="btn btn-light p-3 rounded-10 border"
                  onClick={(e) => {
                     e.preventDefault();
                     handleFavorite(id);
                  }}
               >
                  {favorite ? <IoIosStar /> : <IoIosStarOutline />}
               </button>
            </div>
         </div>
      </>
   );
}
export default Card;
