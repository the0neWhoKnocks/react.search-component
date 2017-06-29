import { Component } from 'react'
import { func, string } from 'prop-types'
import './SearchBar.styl'
import Spinner from 'COMPONENTS/Spinner/Spinner.jsx'

class SearchBar extends Component {
  
  constructor(props){
    super(props);

    this.inputDebounce = undefined;
    this.searchReq = undefined;
    this.statuses = {
      PROCESSING: 'processing',
      STANDBY: 'standby',
      SUCCESS: 'success'
    };

    this.state = {
      focused: false,
      status: this.statuses.STANDBY
    };
  }

  handleInput(ev){
    const _self = this;
    const el = ev.currentTarget;
    const queryVal = el.value;
    const debounceTime = ( !queryVal )
      ? 0
      : 500; // needs to be 500 to account for a user holding a key down (like backspace)

    this.props.value = queryVal;
    this.setState({
      value: queryVal
    });

    this.props.onInput(queryVal);

    clearTimeout( this.inputDebounce );
    this.inputDebounce = setTimeout(function(){
      // actual request > here <

      // everything except the `dispatch` can be deleted
      if( _self.searchReq ){
        console.log('Cancel fake request');
        clearTimeout( _self.searchReq );
      }

      if( queryVal !== '' ){
        console.log('Making fake request');
        const reqTime = Math.floor(Math.random() * 1500) + 1;

        _self.setState({
          status: _self.statuses.PROCESSING
        });

        _self.searchReq = setTimeout(function(){
          const maxResults = 4;
          const randomAmount = Math.floor(Math.random() * maxResults) + 1;
          const val = 'FAKE VAL';
          let fakeVals = [];

          for(let i=0; i<randomAmount; i++){
            const randomInsertionPnt = Math.floor(Math.random() * val.length);
            const result = val.substr(0, randomInsertionPnt) + queryVal + val.substr(randomInsertionPnt, val.length);

            fakeVals.push({
              query: queryVal,
              text: result,
              url: `http://fake.com/${ i }`
            });
          }

          _self.setState({
            status: _self.statuses.SUCCESS
          });

          _self.props.onResults({
            results: fakeVals
          });
        }, reqTime);
      }else{
        _self.handleClear();
      }
    }, debounceTime);
  }

  handleKeyUp(ev){
    switch( ev.which ){
      case 40 : // DOWN
        if(
          this.state.status === this.statuses.SUCCESS
          && this.props.onArrowDown
        ){
          this.props.onArrowDown();
        }
        break;
    }
  }

  handleSubmit(ev){
    ev.preventDefault();

    // if a user chose to submit ensure no type-ahead requests go out
    clearTimeout( this.inputDebounce );
  }

  handleClear(ev){
    this.setState({
      focused: true,
      status: this.statuses.STANDBY
    });

    this.props.value = '';
    this.props.onInput( this.props.value );
    this.props.onResults({
      results: []
    });
  }

  componentDidUpdate(){
    if( this.state.focused ){
      this.refs.searchInput.focus();
    }
  }

  render(){
    let btnClass = '';
    let spinnerClass = '';

    switch(this.state.status){
      case this.statuses.PROCESSING :
        spinnerClass = ' is--visible';
        break;

      case this.statuses.SUCCESS :
        btnClass = ' is--visible';
        break;
    }

    return (
      <form
        className="search-bar"
        onSubmit={ this.handleSubmit.bind(this) }
      >
        <input
          ref="searchInput"
          type="text"
          placeholder={ this.props.placeholder }
          value={ this.props.value }
          onInput={ this.handleInput.bind(this) }
          onKeyUp={ this.handleKeyUp.bind(this) }
        />
        <div className={ `search-bar__spinner${ spinnerClass }` }>
          <Spinner />
        </div>
        <button
          type="button"
          className={ `search-bar__clear-btn${ btnClass }` }
          onClick={ this.handleClear.bind(this) }
        >{ this.props.clearText }</button>
      </form>
    )
  }
}

SearchBar.propTypes = {
  clearText: string,
  onArrowDown: func,
  onInput: func,
  onResults: func,
  placeholder: string,
  value: string
};
SearchBar.defaultProps = {
  clearText: 'Clear',
  onArrowDown: function(){},
  onInput: function(){},
  onResults: function(){},
  placeholder: 'Search',
  value: ''
};

export default SearchBar