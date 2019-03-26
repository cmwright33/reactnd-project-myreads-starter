import React from 'react';

/**
* @description Shelf
* @constructor
*/

const Shelf = (props) => {  
   return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf.title}</h2>
            <div className="bookshelf-books">
            	<ol className="books-grid">  
					{ props.children }      
              </ol>
            </div>
          </div>
    )
	
}

export default Shelf;