'use strict';

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.generateNewQuote = this.generateNewQuote.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setNewColor = this.setNewColor.bind(this)
    this.update = this.update.bind(this)

    this.state = {
      quote: '',
      author: '',
      twitterLink: ''
    }
  }

  componentDidMount() {
    this.update();
  }

  handleClick() {
    this.update();
  }

  update() {
    this.setNewColor();
    this.generateNewQuote();
  }

  setNewColor() {
    let randomIndex = Math.floor(Math.random() * COLORS.length);
    let bgColor = COLORS[randomIndex].background
    let textColor = COLORS[randomIndex].text

    let r = document.querySelector(':root');
    r.style.setProperty('--main-color', bgColor);
    r.style.setProperty('--text-contrast-color', textColor);
  }

  generateNewQuote() {
    let newState = {};

    let randomIndex = Math.floor(Math.random() * QUOTES.length);

    newState.quote = QUOTES[randomIndex].quote;
    newState.author = QUOTES[randomIndex].author;

    let twitterLinkBase = 'https://twitter.com/intent/tweet?';
    let twitterLinkHashtags = 'hashtags=quotes';
    let twitterLinkQuote = 'text=' + encodeURI('"' + newState.quote + '"');
    let twitterLinkAuthor = encodeURI(' - ' + newState.author);
    newState.twitterLink = twitterLinkBase + twitterLinkHashtags + '&' + twitterLinkQuote + twitterLinkAuthor;


    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <h5 id="text" className="card-title text-center"><i class="fa fa-quote-left"></i> {this.state.quote}</h5>
              <p id="author" className="card-text text-end">- {this.state.author}</p>
              <div className="row">
                <a href={this.state.twitterLink} id="tweet-quote" className="color btn col-sm-1"><i className="fa fa-twitter"></i></a>
                <button id="new-quote" onClick={this.handleClick} className="color btn offset-sm-8 col-sm-3">New Quote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.querySelector('#quote-box'));