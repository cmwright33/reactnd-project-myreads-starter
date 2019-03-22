import React from 'react'
import BookShelf from './BookShelf.js'
import BookItem from './BookItem.js'
import SearchResults from './SearchResults.js'
import * as BooksAPI from './BooksAPI'
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
    showSearchPage: false,
    books: [],
    bookSearch: [], 

  }

    componentDidMount() {
      BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books
          }))
      })

    }


  setQuery = (event) => {
      this.setState( { query: event.target.value })
  }

  handleInput = (event) => {

    if (event.key === "Enter") {
      BooksAPI.search(this.state.query)
       .then( (books) => {
          console.log(books)
        this.setState( { bookSearch: books})
       })
    }
  }



   handleChange = (event, book) => {
      this.newState = event.target.value
      const updateBookshelf = [...this.state.books];
      updateBookshelf.map( (b) => {
          if( b.title === book.title){
            return b.shelf = this.newState
          }
      })
      this.setState({ books: updateBookshelf });
   };

  render() {
    return (

     
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

                <input type="text" onChange={ (e) => {this.setQuery(e) }} onKeyPress = { (e) => {this.handleInput(e)} } value={this.state.query} placeholder="Search by title or author"/>
                <SearchResults searchResults = {this.state.bookSearch}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              { <BookShelf books = { this.state.books } handleChange = {this.handleChange}/>}
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
