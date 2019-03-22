import React, { Component } from 'react';

class BookItem extends Component{

	selectedShelf = this.props.book.shelf !== undefined ? this.props.book.shelf : 'none';
	thumbnailSelected = this.props.book.imageLinks !== undefined ? this.props.book.imageLinks.thumbnail : "https://dummyimage.com/128x193/000/fff.png";
	authorFound = this.props.book.authors !== undefined ? this.props.book.authors : [" "];

	render() {
		console.log(this.props.book.imageLinks)
		return(
			<div className="book" key={this.props.book.id}>
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.thumbnailSelected})` }}></div>
	            <div className="book-shelf-changer">
	              <select value={this.selectedShelf} onChange={ (e) => { this.props.handleChange(e, this.props.book) }} >
	                <option value="move" disabled>Move to...</option>
	                <option value="currentlyReading">Currently Reading</option>
	                <option value="wantToRead">Want to Read</option>
	                <option value="read">Read</option>
	                <option value="none">None</option>
	              </select>
	            </div>
	          </div>
	          <div className="book-title">{this.props.book.title}</div>
	          <div className="book-authors">
            	{
					this.authorFound.map( (author, index) => (
							<span key={index}> {author} </span>
            		))
            	}
	          </div>
	        </div>
		)
	}
}


export default BookItem;