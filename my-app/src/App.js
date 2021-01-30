import React from 'react'; // подключение библиотеки React
import PropTypes from 'prop-types'
import './App.css'; // подключение файла стилей

const myNews = [
    {
        id: 1,
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        id: 2,
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        id: 3,
        author: 'Max Frontend',
        text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
        bigText: 'А евро опять выше 70.'
    },
    {
        id: 4,
        author: 'Гость',
        text: 'Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru',
        bigText: 'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!'
    }
];

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

class App extends React.Component {

    state = {
        news: myNews,
    };

    handleAddNews = (data) => {
        const nextNews = [data, ...this.state.news];
        this.setState({ news: nextNews })
    };

    render() {
        return (
            <React.Fragment>
                <Add onAddNews={this.handleAddNews}/>
                <h3>Новости</h3>
                <News data={this.state.news}/>
            </React.Fragment>
        )
    }
}

export default App;
