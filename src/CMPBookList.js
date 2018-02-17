import React, { Component}  from 'react';


import CMPBook from "./CMPBook";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class CMPBookList extends   Component{
    state={};

    handleChangeShelf = (bookId: string, e: any) => {
        let temp = this.props.booksOnShelf;
        const book = temp.filter(t => t.id === bookId)[0];
        book.shelf = e.target.value;
        BooksAPI.update(book, e.target.value).then(response => {
            this.setState({
                books: temp
            });
        });
    };

    render(){
        return (

            <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>

                    <CMPBook
                        key="currently"
                        books={this.props.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
                        onChangeShelf={this.handleChangeShelf}
                        title="Currently Reading"
                    />
                    <CMPBook
                        key="wantToRead"
                        books={this.props.booksOnShelf.filter(book => book.shelf === "wantToRead")}
                        onChangeShelf={this.handleChangeShelf}
                        title="Want to Read"
                    />
                    <CMPBook
                        key="read"
                        books={this.props.booksOnShelf.filter(book => book.shelf === "read")}
                        onChangeShelf={this.handleChangeShelf}
                        title="Read"
                    />



                </div>
            </div>
            <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
        </div>
        );
    }
}

export default CMPBookList;
