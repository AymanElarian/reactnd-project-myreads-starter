import React, { Component}  from 'react';
import * as BooksAPI from "./BooksAPI";


class CMPBook extends Component {


    state={
        books:this.props.books
    };


    componentWillReceiveProps(nextProps){
        this.setState({books: nextProps.books})
    }


    updateBook(book: any, shelf: string) {
        book.shelf = shelf;

        let temp = this.state.books;
        const bookToUpdate = temp.filter(t => t.id === book.id)[0];
        bookToUpdate.shelf = shelf;
        BooksAPI.update(bookToUpdate, shelf).then(response => {
            this.setState({
                books: temp
            });
            this.props.onChangeShelf(temp);
        });


        //this.props.onChangeShelf(book, shelf);


    }



    render(){


        return (


                    <ol className="books-grid">

                        {this.state.books.map(book =>

                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{  width: 128,
                                                height: 193,
                                                backgroundImage: 'url(" '+ book.imageLinks.thumbnail + '")'
                                            }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                value={book.shelf}
                                                onChange={e => {
                                                    this.updateBook(book, e.target.value);
                                                }}
                                            >
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(", "):book.authors}</div>
                                </div>
                            </li>


                        )}



                    </ol>



        );

    }

}


export default CMPBook;


