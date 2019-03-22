import React, { Component } from 'react';
import BookItem from './BookItem.js'

class BookShelf extends Component{

	state: {

	}


	render() {
		return(
			<div>
			    <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{
							this.props.books.filter((book) => { return book.shelf === "currentlyReading" })
                    		.map( (book, index) => (
 						    <li key= {index}> <BookItem book = { book } handleChange = {this.props.handleChange } /></li>
                    	))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{
							this.props.books.filter((book) => { return book.shelf === "wantToRead" })
                    		.map( (book, index) => (
 						<li key= {index}> <BookItem book = { book } handleChange = {this.props.handleChange } /></li>
                    	))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{
							this.props.books.filter((book) => { return book.shelf === "read" })
                    		.map( (book, index) => (
 						<li key= {index}> <BookItem book = { book } handleChange = {this.props.handleChange }/></li>
                    	))}
                    </ol>
                  </div>
                </div>
            </div>
			)
	}
}

export default BookShelf;