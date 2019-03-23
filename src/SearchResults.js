import React, { Component } from 'react';
import BookItem from './BookItem.js'


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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Results : { this.props.searchResults.length } Books </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.props.searchResults.map( (book) => (
                         <li key= {book.id} > <BookItem  book = { book } updateBookshelf = {this.props.updateBookshelf } /></li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
            
			)
		}

	}

}

export default SearchResults;