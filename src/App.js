import React from 'react'
import BookShelf from './BookShelf.js'
import SearchResults from './SearchResults.js'
import * as BooksAPI from './BooksAPI'
import { throttle, debounce } from 'throttle-debounce';
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query: '',
    books: [],
    bookSearch: [], 

  }

  searchDebounce = throttle(500, this.searchQuery)

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
    })

  }


  searchQuery = (event) => {
      this.setState( { query: event.target.value }, () => {
        BooksAPI.search(this.state.query)
         .then( (books) => {
          if(Array.isArray(books)){
            this.setState( { bookSearch: books})
          }
         })
      })
  }


  handleChange = (event, book) => {
      BooksAPI.update(book, book.shelf);
      this.newState = event.target.value
      const updateBookshelf = [...this.state.books];
      updateBookshelf.map( (b) => {
          if( b.title === book.title){
            return b.shelf = this.newState
          }
          return;
      })
      this.setState({ books: updateBookshelf });
  };

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
                <SearchResults searchResults = {this.state.bookSearch}/>
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
                { <BookShelf books = { this.state.books } handleChange = {this.handleChange}/>}
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
