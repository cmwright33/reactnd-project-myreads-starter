import React, { Component } from 'react';

class BookItem extends Component{




	render() {

		return(
			<div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.url})` }}></div>
	            <div className="book-shelf-changer">
	              <select value={this.props.book.shelf} onChange={ (e) => { this.props.handleChange(e, this.props.book) }} >
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
	            {this.props.book.authors.map( (author) => (
 					<div> {author.value} </div>
                ))}
	          </div>
	        </div>
		)
	}
}


export default BookItem;