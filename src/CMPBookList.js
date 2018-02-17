import React, { Component}  from 'react';


import CMPBookShelf from "./CMPBookShelf";

import "./App.css";

class CMPBookList extends   Component{
    state={
        booksOnShelf:this.props.booksOnShelf
    };


    componentWillReceiveProps(nextProps){
        this.setState({booksOnShelf: nextProps.booksOnShelf})
    }

    handleChangeShelf = (books: any) => {
        this.setState({
            books: books
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

                    <CMPBookShelf
                        key="currently"
                        books={this.state.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
                        onChangeShelf={this.handleChangeShelf}
                        title="Currently Reading"
                    />
                    <CMPBookShelf
                        key="wantToRead"
                        books={this.state.booksOnShelf.filter(book => book.shelf === "wantToRead")}
                        onChangeShelf={this.handleChangeShelf}
                        title="Want to Read"
                    />
                    <CMPBookShelf
                        key="read"
                        books={this.state.booksOnShelf.filter(book => book.shelf === "read")}
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
