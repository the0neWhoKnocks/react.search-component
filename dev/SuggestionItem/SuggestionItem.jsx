import { Component } from 'react'
import { object } from 'prop-types'
import './SuggestionItem.styl'

class SuggestionItem extends Component {

  constructor(props){
    super(props)
  }

  handleClick(ev){
    ev.preventDefault();
    console.log(`Navigate to: ${ ev.currentTarget.href }`);
  }

  render(){
    const subtitles = this.props.productSubtitles.map(val => <div className="suggestion-item__sub-title">{ val }</div>)

    return (
      <a
        className="suggestion-item"
        href={ this.props.productURL }
        onClick={ this.handleClick.bind(this) }
      >
        <img
          className="suggestion-item__img"
          src={ this.props.imgURL }
          alt={ this.props.imgAlt }
        />
        <div className="suggestion-item__copy">
          <h4 className="suggestion-item__title">{ this.props.productTitle }</h4>
          { subtitles }
        </div>
      </a>
    )
  }
}

SuggestionItem.propTypes = {
  img: object.required,
  product: object.required
};
SuggestionItem.defaultProps = {
  img: {},
  product: {}
};

export default SuggestionItem