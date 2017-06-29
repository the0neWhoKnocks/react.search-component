import { Component } from 'react'
import './Search.styl'
import SearchBar from 'COMPONENTS/SearchBar/SearchBar.jsx'
import VisualSearch from 'COMPONENTS/VisualSearch/VisualSearch.jsx'

class Search extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      focusedItemIndex: undefined,
      searchVal: '',
      autoCompleteResults: []
    };
  }

  handleArrowDown(){
    this.setState({
      focusedItemIndex: 0
    });
  }

  handleSearchInput(val){
    // just store the value so if a user arrows down it doesn't get lost
    this.state.searchVal = val;
  }

  handleSearchResults(data){
    this.setState({
      autoCompleteResults: data.results,
      focusedItemIndex: undefined
    });
  }

  handleAutoCompleteSelect(selection){
    this.setState({
      autoCompleteResults: [],
      focusedItemIndex: undefined,
      searchVal: selection
    });
  }

  render(){
    return (
      <div className="search">
        <SearchBar
          placeholder="Search..."
          value={ this.state.searchVal }
          onArrowDown={ this.handleArrowDown.bind(this) }
          onInput={ this.handleSearchInput.bind(this) }
          onResults={ this.handleSearchResults.bind(this) }
        />
        <VisualSearch
          autoCompleteItems={ this.state.autoCompleteResults }
          focusedItem={ this.state.focusedItemIndex }
          onSelect={ this.handleAutoCompleteSelect.bind(this) }
        />
      </div>
    )
  }
}

export default Search