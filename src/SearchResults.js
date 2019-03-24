import React, { Component } from 'react';
import BookItem from './BookItem.js';


class SearchResults extends Component {

	isSearchPage = true;

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
                         <li key= {book.id} > <BookItem  book = { book } addToBookshelf = {this.props.addToBookshelf} isSearchPage = {this.isSearchPage} /></li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
			    <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{
							this.props.searchResults.filter((book) => { return book.shelf === "currentlyReading" })
                    		.map( (book) => (
 						    	<li key= {book.id} > <BookItem  book = { book } addToBookshelf = {this.props.addToBookshelf } isSearchPage = {this.isSearchPage} /></li>
                    		))
                    	}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{
							this.props.searchResults.filter((book) => { return book.shelf === "wantToRead" })
                    		.map( (book) => (
 								<li key= {book.id} > <BookItem  book = { book } addToBookshelf = {this.props.addToBookshelf } isSearchPage = {this.isSearchPage} /></li>
                    		))
                    	}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{
							this.props.searchResults.filter((book) => { return book.shelf === "read" })
                    		.map( (book) => (
 								<li key= {book.id}> <BookItem book = { book } addToBookshelf = {this.props.addToBookshelf } isSearchPage = {this.isSearchPage} /></li>
                    		))
                    	}
                    </ol>
                  </div>
                </div>
            </div>
			)
		}

	}

}



export default SearchResults;