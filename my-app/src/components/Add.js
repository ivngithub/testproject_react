import React from "react";
import PropTypes from "prop-types";

class Add extends React.Component {

    state = {
        id: '',
        author: '',
        text: '',
        bigText: '',
        valueCheckBox: false,
    };

    validate = () => {
        if (this.state.author.trim() && this.state.text.trim() && this.state.bigText.trim()
            && this.state.valueCheckBox) {
            return true
        }
        return false
    };

    handleChangeInput = (e) => {
        this.setState({ id: +new Date(), author: e.currentTarget.value })
    };

    handleChangeTextArea = (e) => {
        this.setState({ text: e.currentTarget.value })
    };

    handleChangeBigTextArea = (e) => {
        this.setState({ bigText: e.currentTarget.value })
    };

    handleChangeCheckBox = (e) => {
        console.log(this.state.valueCheckBox);
        this.setState({ valueCheckBox: e.currentTarget.checked })
    };

    onClickButtonHandler = (e) => {
        e.preventDefault();
        alert(this.state.author + '\n' + this.state.text);
        const {id, author, text, bigText} = this.state;
        this.props.onAddNews({id, author, text, bigText})
    };

    render() {
        console.log('render Add');
        return (
            <React.Fragment>
                <form className='add'>
                    <input type='text' className='add__author'
                           onChange={this.handleChangeInput}
                           value={this.state.author} placeholder='Ваше имя'
                    />
                    <textarea className='add__text'
                              onChange={this.handleChangeTextArea}
                              value={this.state.text} placeholder='Текст новости'>

                    </textarea>
                    <textarea className='add__bigText'
                              onChange={this.handleChangeBigTextArea}
                              value={this.state.bigText} placeholder='Весь Текст новости'>

                    </textarea>
                    <label className='add__checkrule'>
                        <input type='checkbox'  onChange={this.handleChangeCheckBox}/>Я согласен с правилами
                    </label>
                    <button className='add__btn'
                            disabled={!this.validate()}
                            onClick={this.onClickButtonHandler}>Показать alert
                    </button>
                </form>
            </React.Fragment>
        )
    }
}

Add.propTypes = {
    onAddNews: PropTypes.func.isRequired,
};

export { Add } // именованный экспорт
