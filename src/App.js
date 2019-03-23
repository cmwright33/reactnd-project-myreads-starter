import React from 'react'
import BookShelf from './BookShelf.js'
import SearchResults from './SearchResults.js'
import * as BooksAPI from './BooksAPI'
import { throttle, debounce } from 'throttle-debounce';
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    query: '',
    books: [],
    bookSearch: [], 

  }

  searchThrottle = throttle(500, this.searchQuery)

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
          }else{
            this.setState( { bookSearch: []})
          }
         })
      })
  }


  updateBookshelf = (event, book) => {

    const updateBookshelf = [...this.state.books];
    
      if ( book.hasOwnProperty('shelf') ){

        const updateBookshelf = [...this.state.books];
        updateBookshelf.map( (b) => {
            if( b.id === book.id){
              BooksAPI.update(book, event.target.value);
              return b.shelf = event.target.value;
            }
            return;
        })
        this.setState({ books: updateBookshelf });

      }else{

        book.self = event.target.value
        BooksAPI.update(book, event.target.value);
        this.setState(prevState => ({
          books: [...prevState.books, book]
        }))

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
                <SearchResults searchResults = {this.state.bookSearch} updateBookshelf = {this.updateBookshelf}/>
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
                { <BookShelf books = { this.state.books } updateBookshelf = {this.updateBookshelf}/>}
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
