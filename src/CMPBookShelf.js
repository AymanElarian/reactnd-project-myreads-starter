import React, { Component}  from 'react';
import CMPBook from "./CMPBook";


class CMPBookShelf  extends Component {



    state={
        books:this.props.books
    };


    componentWillReceiveProps(nextProps){
        this.setState({books: nextProps.books})
    }


    handleChangeShelf = (books: any) => {
        this.setState({
            books: books
        });

        this.props.onChangeShelf(books);
    };


    render(){

        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">

                    <CMPBook
                        books={this.state.books}
                        onChangeShelf={this.handleChangeShelf}

                    />


                </div>
            </div>


        );

    }

}


export default CMPBookShelf;


