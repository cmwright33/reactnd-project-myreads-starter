import React from 'react'
import BookShelf from './BookShelf.js'
import SearchResults from './SearchResults.js'
import * as BooksAPI from './BooksAPI'
import { throttle } from 'throttle-debounce';
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    query: '',
    books: [],
    bookSearch: [], 
  }

  shelves = [
   { title: "Currently Reading", slug: "currentlyReading" },
   { title: "Want to Read", slug: "wantToRead" },
   { title: "Read", slug: "read" },
  ]
  //throttle search results
  searchThrottle = throttle(500, this.searchQuery)

  //once component mounts pull book data
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }));
    });

  }

  /**
  * @description merges two arrays of objects (updating the results to reflect shelf data)
  * @param {Array} searchResult -- Data from BooksAPI
  * @param {Array} bookShelf -- state array books
  * @returns {array} merged array of objects 
  * helper function created with assitance of SO -- 03/24/2019 -- https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key/46849485
  */

  mergeById = (searchResult, bookShelf) =>
    searchResult.map(itm => ({
        ...bookShelf.find((item) => (item.id === itm.id) && item),
        ...itm
    }));

  /**
  * @description pull search input and sets bookSearch state array
  * @param {event}  Data from BooksAPI
  * @returns {nothing} 
  */

  searchQuery = (event) => {
      this.setState( { query: event.target.value }, () => {

        if(this.state.query.length > 0){

          BooksAPI.search(this.state.query)
            .then( (books) => {
            if(Array.isArray(books)){
              // merge data returned with current bookshelf (adding a shelf value if we all ready have on) 
              let mergedList = this.mergeById(books, this.state.books);
           
              this.setState( { bookSearch: mergedList})
            }else{
              this.setState( { bookSearch: []})
            }
           });
        }else{
            this.setState( { bookSearch: []})
        }
      });
  }

  /**
  * @description update book in bookshelf and update search results
  * @param {event}  selected value
  * @param {book}  book selected
  * @returns {nothing} 
  */

  updateBookshelfAndSearch = (event, book) => {

        // remove and re-add new book
        const updateResults = [...this.state.bookSearch].filter( oldBook => {

          return book.id !== oldBook.id

        }).concat([book]);

        // remove and re-add new book
        const updateBookshelfs = [...this.state.books].filter( bookOnShelf => { 

            return book.id !== bookOnShelf.id

          }).concat([book]);

        if(this.state.bookSearch.length > 0){

          book.shelf = event.target.value

          BooksAPI.update(book, event.target.value)
          .then( () => {

            // add new book to both arrays
            this.setState(prevState => ({

              books: updateBookshelfs,
              bookSearch: updateResults

            }));

          });

        }

      }

  render() {
    return (

      <div className="app">
          <Route exact path="/search" render= { () => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link 
                  to='/'
                  className='close-search'
                  >Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" onChange={ (e) => {this.searchQuery(e)} } value={this.state.query} placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                <SearchResults 
                  searchResults = {this.state.bookSearch} 
                  updateBookshelfAndSearch = {this.updateBookshelfAndSearch}
                  shelves = { this.shelves }
                  />
                </ol>
              </div>
            </div>
          )} />
          <Route exact path="/" render= { () => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                { <BookShelf 
                  books = { this.state.books } 
                  updateBookshelfAndSearch = {this.updateBookshelfAndSearch} 
                  shelves = { this.shelves }
                />}
              </div>
              <div className="open-search">
                <Link 
                  to='/search'
                  className='open-search'
                  >Add a book</Link>
              </div>
            </div>
          )} 
          />
      </div>
    )
  }
}

export default BooksApp
