// @flow
import React from "react";
import { Link } from "react-router-dom";
import CMPBook from "./CMPBook";
import { Debounce } from 'react-throttle';



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

            if (typeof book.imageLinks === 'undefined') {
                book.imageLinks={};
               book.imageLinks.thumbnail='https://png.icons8.com/ios/1600/no-camera.png';

            }
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
                        <Debounce time="400" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={event => this.DoSearch(event.target.value)}
                            />
                        </Debounce>



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