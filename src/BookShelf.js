import React, { Component } from 'react';
import BookItem from './BookItem.js'



/**
* @description output of books and ordered under bookshelfs
* @constructor
*/


class BookShelf extends Component{

  shelves = [
   { title: "Currently Reading", slug: "currentlyReading" },
   { title: "Want to Read", slug: "wantToRead" },
   { title: "Read", slug: "read" },
  ]


	render() {
   return (
      <div>
       {
        this.shelves.map( (shelf, index) => {
        return(
          <div key={index}className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">  
              {
                this.props.books.filter((book) => { return book.shelf === shelf.slug })
                .map( (book) => (
                 <li key= {book.id} > <BookItem  book = { book } updateBookshelfAndSearch = {this.props.updateBookshelfAndSearch} isSearchPage = {this.isSearchPage} /></li>
                ))
              }        
              </ol>
            </div>
          </div>
          )
      }) 
      }
      </div>
    )
	}
}

export default BookShelf;