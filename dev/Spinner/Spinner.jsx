import { Component } from 'react'
import './Spinner.styl'

class Spinner extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <span className="spinner"></span>
    )
  }
}

export default Spinner