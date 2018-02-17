import React from 'react'
import { Route } from "react-router-dom";
import CMPBookList from "./CMPBookList";
import * as BooksAPI from "./BooksAPI";

import './App.css'

/*
 <Route
                path="/search"
                render={() =>
                    <SearchPage onChangeShelf={this.handleChanges} booksOnShelf={this.state.books} />}
            />
 */

class BooksApp extends React.Component {

    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(data => {
            this.setState({
                books: data
            });
        });
    }

    handleChanges = (book: any, shelf: string) => {
        BooksAPI.update(book, shelf).then(response => {
            this.getBooks();
        });
    };

    getBooks() {
        BooksAPI.getAll().then(data => {
            this.setState({
                books: data
            });
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => <CMPBookList booksOnShelf={this.state.books} />} />

            </div>
        );
    }

  }


export default BooksApp
