import React, { Component } from 'react';
import BookItem from './BookItem.js';
import Shelf from './Shelf.js'


/**
* @description Represents output of Search Results with bookshelf selections
* @constructor
*/

class SearchResults extends Component {

	render(){

		if(this.props.searchResults === undefined || this.props.searchResults.length === 0 ){
			
		return(
                <div className="bookshelf">
                	<div>No Results</div>
                </div>
			)

		}else{
		return(
			   <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Results : { this.props.searchResults.length } Books </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                       	this.props.searchResults.filter((book) => { return !book.hasOwnProperty('shelf') })
                    		.map( (book) => (
                         <li key= {book.id} > <BookItem  book = { book } updateBookshelfAndSearch = {this.props.updateBookshelfAndSearch} isSearchPage = {this.isSearchPage} /></li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                {
                  this.props.shelves.map( (shelf, index) => {
                  return(
                      <Shelf key = { index } shelf = { shelf } >
                        {
                          this.props.searchResults.filter((book) => { return book.shelf === shelf.slug })
                          .map( (book) => (
                           <li key= {book.id}  className="key-here"> <BookItem  book = { book } updateBookshelfAndSearch = {this.props.updateBookshelfAndSearch} isSearchPage = {this.isSearchPage} /></li>
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

}



export default SearchResults;