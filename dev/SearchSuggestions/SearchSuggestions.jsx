import { Component } from 'react'
import { array, object, string } from 'prop-types'
import './SearchSuggestions.styl'
import SuggestionItem from 'COMPONENTS/SuggestionItem/SuggestionItem.jsx'

class SearchSuggestions extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const hasItems = ( this.props.suggestionItems.length )
      ? ' has--items'
      : '';
    const items = this.props.suggestionItems.map(item => <SuggestionItem
      imgAlt={ item.imgAlt }
      imgURL={ item.imgURL }
      productSubtitles={ item.productSubtitles }
      productTitle={ item.productTitle }
      productURL={ item.productURL }
    />)

    return (
      <div className={ `search-suggestions${ hasItems }` }>
        <div className="search-suggestions__wrapper">
          <h4 className="search-suggestions__title">{ this.props.title }</h4>
          <div className="search-suggestions__items">{ items }</div>
          <a
            className="search-suggestions__view-all"
            href={ this.props.viewAll.url }
          >{ this.props.viewAll.text } ({ this.props.viewAll.count })</a>
        </div>
      </div>
    )
  }
}

SearchSuggestions.propTypes = {
  title: string.required,
  suggestionItems: array.required,
  viewAll: object.required
}
SearchSuggestions.defaultProps = {
  title: '',
  suggestionItems: [],
  viewAll: {}
}

export default SearchSuggestions