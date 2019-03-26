import React, { Component } from 'react';
import BookItem from './BookItem.js'
import Shelf from './Shelf.js'



/**
* @description output of books and ordered under bookshelfs
* @constructor
*/


class BookShelf extends Component{

	render() {
   return (
      <div>
       {
        this.props.shelves.map( (shelf, index) => {
        return(
            <Shelf shelf = { shelf } key = { index } >
              {
                this.props.books.filter((book) => { return book.shelf === shelf.slug })
                .map( (book) => (
                 <li key= {book.id} > <BookItem  book = { book } updateBookshelfAndSearch = {this.props.updateBookshelfAndSearch} isSearchPage = {this.isSearchPage} /></li>
                ))
              }        
            </Shelf>
          )
      }) 
      }
      </div>
    )
	}
}

export default BookShelf;