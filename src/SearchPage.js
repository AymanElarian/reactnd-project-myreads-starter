// @flow
import React from "react";
import { Link } from "react-router-dom";
import CMPBook from "./CMPBook";


import * as BooksAPI from "./BooksAPI";

import "./App.css";

class SearchPage extends React.Component {
    state = {
        keyword: "",
        books: []
    };


    DoSearch = (keyword: string) => {
        this.setState({
            keyword: keyword
        });
        if (keyword) {
            this.APISearch(keyword);
        } else {
            this.setState({
                books: []
            });
        }
    };


    APISearch(query: string) {
        BooksAPI.search(query, 20).then(
            response => {
                if (response.error) {
                    this.setState({
                        books: []
                    });
                } else {
                    this.updateBooks(response);
                }
            },
            error => {
                console.log("Error");
            }
        );
    };




    updateBooks(books: any) {
        const UpdatedBooks = books.map(book => {
            book.shelf = "none";
            this.props.booksOnShelf.forEach(bookOnShelf => {
                if (book.id === bookOnShelf.id) {
                    book.shelf = bookOnShelf.shelf;
                }
            });
            return book;
        });
        this.setState({
            books: UpdatedBooks
        });
    }


    handleChangeShelf = (books: any) => {
        this.setState({
            books: books
        });

        this.props.onChangeShelf(books);

    };





    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.keyword}
                            onChange={event => this.DoSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <CMPBook
                        books={this.state.books}
                        onChangeShelf={this.handleChangeShelf}

                    />

                </div>
            </div>
        );
    }
}
export default SearchPage;