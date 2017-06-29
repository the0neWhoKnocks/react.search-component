import { Component } from 'react'
import { array, func, number, object } from 'prop-types'
import './VisualSearch.styl'
import AutoCompleteItem from 'COMPONENTS/AutoCompleteItem/AutoCompleteItem.jsx'
import SearchSuggestions from 'COMPONENTS/SearchSuggestions/SearchSuggestions.jsx'

class VisualSearch extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      suggestions: props.suggestions || this.props.suggestions
    };
    this.currACIndex = 0;
  }

  focusAutoCompleteItem(ndx){
    const children = this.refs.autoCompleteItems.children;

    if( ndx >= children.length ){
      ndx = 0;
    }else if( ndx < 0 ){
      ndx = children.length -1;
    }

    this.currACIndex = ndx;

    const itemParent = this.refs.autoCompleteItems.children[ ndx ];
    const item = itemParent.querySelector('a');

    item.focus();
  }

  handleACLeave(){
    this.setState({
      suggestions: {}
    });
  }

  handleACSelect(selection){
    console.log('User selected:', selection);

    this.props.onSelect(selection);

    //return true; // true to have the link navigate to the URL
  }

  handleSuggestions(data){
    this.setState({
      suggestions: data.suggestions
    });
  }

  handleKeyUp(ev){
    switch(ev.which){
      case 38 : // UP
        this.focusAutoCompleteItem(this.currACIndex - 1);
        break;

      case 40 : // DOWN
        this.focusAutoCompleteItem(this.currACIndex + 1);
        break;
    }
  }

  componentDidUpdate(){
    // after a clear
    if( !this.props.autoCompleteItems.length ){
      this.props.focusedItem = undefined;

      if( Object.keys(this.state.suggestions).length ){
        this.setState({
          suggestions: {}
        });
      }
    }

    // when a user has hit down on the keyboard
    if( this.props.focusedItem !== undefined ){
      this.focusAutoCompleteItem(this.currACIndex);
    }else{
      this.currACIndex = 0;
    }
  }

  render(){
    const hasAutoCompleteItems = ( this.props.autoCompleteItems.length )
      ? ' has--items'
      : '';
    const autoCompleteItems = this.props.autoCompleteItems.map(item => {
      return <AutoCompleteItem
        url={ item.url }
        text={ item.text }
        query={ item.query }
        //onLeave={ this.handleACLeave.bind(this) }
        onSelect={ this.handleACSelect.bind(this) }
        onSuggestions={ this.handleSuggestions.bind(this) }
      />
    });

    return (
      <div className="visual-search">
        <div
          ref="autoCompleteItems"
          onKeyUp={ this.handleKeyUp.bind(this) }
          className={ `visual-search__auto-complete-items${ hasAutoCompleteItems }` }
        >
          { autoCompleteItems }
        </div>
        <SearchSuggestions
          ref="searchSuggestions"
          title={ this.state.suggestions.title }
          suggestionItems={ this.state.suggestions.suggestionItems }
          viewAll={ this.state.suggestions.viewAll }
        />
      </div>
    )
  }
}

VisualSearch.propTypes = {
  autoCompleteItems: array.required,
  focusedItem: number,
  onSelect: func,
  suggestions: object
};
VisualSearch.defaultProps = {
  autoCompleteItems: [],
  focusedItem: undefined,
  onSelect: function(){},
  suggestions: {}
};

export default VisualSearch