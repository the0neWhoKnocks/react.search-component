import { Component } from 'react'
import { boolean, func, string } from 'prop-types'
import './AutoCompleteItem.styl'
import Spinner from 'COMPONENTS/Spinner/Spinner.jsx'

class AutoCompleteItem extends Component {
  constructor(props){
    super(props)

    this.hoverTime = 0;
    this.hovering = false;

    this.state = {
      loading: false
    }
  }

  transformText(text, query){
    return text.replace(query, `<mark>${ query }</mark>`)
  }

  dispatchSuggestions(){
    this.props.onSuggestions({
      suggestions: this.suggestionData
    });
  }

  getSuggestions(){
    const _self = this;

    return new Promise(function(resolve, reject){
      _self.setState({
        loading: true
      });

      // make FAKE request
      const reqTime = Math.floor(Math.random() * 600) + 300;
      _self.reqTime = setTimeout(function(){
        const randomAmount = Math.floor(Math.random() * 6) + 1;
        _self.suggestionData = {
          title: 'Top Suggestions',
          suggestionItems: [],
          viewAll: {
            count: Math.floor(Math.random() * 60) + 1,
            text: 'View all',
            url: '//localhost/pw/2365874'
          }
        };

        for(let i=0; i<randomAmount; i++){
          _self.suggestionData.suggestionItems.push({
            imgAlt: `Img ${ i+1 } for ${ _self.props.text }`,
            imgURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            productSubtitles: [
              `Product Description ${ i+1 } ${ _self.props.text }`,
              `${ Math.floor(Math.random() * 15) + 1 } colors`
            ],
            productTitle: `Product Title ${ i+1 }`,
            productURL: `//localhost/p/${ i+1 }`
          })
        }

        resolve();
      }, reqTime);
    });
  }

  toggleState(show){
    if( show ){
      // use cached request data if it exists
      if( this.suggestionData ){
        this.dispatchSuggestions();
      }else{
        this.getSuggestions()
        .then(function(){
          this.setState({
            loading: false
          });
          this.dispatchSuggestions();
        }.bind(this))
        .catch(function(err){
          console.error(err);
        });
      }
    }else{
      // kill the FAKE request if this item was blurred
      clearInterval(this.reqTime);

      this.setState({
        loading: false
      });

      this.props.onLeave();
    }
  }

  handleClick(ev){
    ev.preventDefault();

    const el = ev.currentTarget;
    const hoverDiff = Date.now() - this.hoverTime;

    if( this.hovering || this.hoverTime && hoverDiff > 100 ){
      // give a dev the ability to short circuit navigation
      if( this.props.onSelect(this.props.text) ){
        console.log(`Navigate to: ${ el.href }`);
        window.location = el.href;
      }
    }else{
      this.hovering = false;
      this.toggleState(true)
    }
  }

  handleMouseOver(ev){
    if( !this.touched ){
      this.hovering = true;
      this.toggleState(true)
    }else{
      this.hoverTime = Date.now();
    }
  }

  handleMouseOut(ev){
    this.hovering = false;
    this.toggleState()
  }

  handleTouchStart(ev){
    this.touched = true;

    setTimeout(function(){
      this.touched = false;
    }, 300);
  }

  componentWillUnmount(){
    clearInterval(this.reqTime);
  }

  componentWillReceiveProps(props) {
    if( this.props.text !== props.text ){
      delete this.suggestionData
    }
  }

  render(){
    const linkText = {
      __html: this.transformText(this.props.text, this.props.query)
    };
    let loadingClass = ( this.state.loading ) ? ' is--loading' : '';

    return (
      <span className={ `auto-complete-item${ loadingClass }` }>
        <div className="auto-complete-item__spinner"><Spinner /></div>
        <a
          className="auto-complete-item__link"
          href={ this.props.url }
          onClick={ this.handleClick.bind(this) }
          onFocus={ this.handleMouseOver.bind(this) }
          onMouseOver={ this.handleMouseOver.bind(this) }
          onMouseOut={ this.handleMouseOut.bind(this) }
          onBlur={ this.handleMouseOut.bind(this) }
          onTouchStart={ this.handleTouchStart.bind(this) }
          dangerouslySetInnerHTML={ linkText }
        />
      </span>
    )
  }
}

AutoCompleteItem.propTypes = {
  onLeave: func,
  onSelect: func,
  onSuggestions: func,
  query: string.isRequired,
  text: string.isRequired,
  url: string.isRequired
};
AutoCompleteItem.defaultProps = {
  onLeave: function(){},
  onSelect: function(){ return true; },
  onSuggestions: function(){},
  query: '',
  text: '',
  url: ''
};

export default AutoCompleteItem