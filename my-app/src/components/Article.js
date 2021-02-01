import React from "react";
import PropTypes from "prop-types";

class Article extends React.Component {
    state = {
        visible: false, // определили начальное состояние
    };

    handleReadMoreClck = (e) => {
        e.preventDefault();
        this.setState({ visible: true })
    };

    render() {
        const { author, text, bigText } = this.props.data;
        console.log('render', this);
        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                { /* если не visible, то показывай */
                    !this.state.visible && <a onClick={this.handleReadMoreClck} href="#more" className='news__readmore'>Подробнее</a>
                }
                { /* если visible, то показывай */
                    this.state.visible && <p className='news__big-text'>{bigText}</p>
                }
            </div>
        )
    }
}

Article.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired,
    })
};

export { Article } // именованный экспорт
