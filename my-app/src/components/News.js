import React from "react";
import PropTypes from "prop-types";

import { Article } from './Article'

class News extends React.Component {

    state = {
        counter: 0,
    };

    handleCounter = () => {
        const c = this.state.counter;
        this.setState({counter: c + 1})
    };

    renderNews = () => {
        const { data } = this.props; // аналогично записи const data = this.props.data
        let newsTemplate;

        if (data.length) {
            newsTemplate = data.map(function(item) {
                return (
                    <Article key={item.id} data={item}/>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
            }
        return newsTemplate
        };

    render() {
        const { data } = this.props;
        return (
            <div className="news">
                {this.renderNews()}
                {
                    data.length ? <strong className={'news__count'} onClick={this.handleCounter}>Всего новостей: {data.length}</strong> : null
                }
                <p>Всего кликов: {this.state.counter}</p>
            </div>
        );
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
};

export { News } // именованный экспорт
