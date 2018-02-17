import React from 'react'
import { Route } from "react-router-dom";
import CMPBookList from "./CMPBookList";
import SearchPage from "./SearchPage";
import * as BooksAPI from "./BooksAPI";

import './App.css'



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
    };



    handleChangeShelf = (books: any) => {
        BooksAPI.getAll().then(data => {
            this.setState({
                books: data
            });
        });


    };

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => <CMPBookList booksOnShelf={this.state.books} />} />
                <Route
                    path="/search"
                    render={() =>
                        <SearchPage onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} />}
                />

            </div>
        );
    }

  }


export default BooksApp
