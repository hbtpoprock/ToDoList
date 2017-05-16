import React from 'react';
import {render} from 'react-dom';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class CompletedList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editText: "",
      checked: false

    };
  }

  componentDidMount() {

  }
  componentDidUpdate(){
    
  }
  

  render() {

    function filteringComplete(item,index) {

          var arrayCompleteIndex = this.props.completedIndex;
          var items = this.props.items;
          console.log('TAB2==========='+arrayCompleteIndex);
          if(arrayCompleteIndex.length!==0){

            for(let i = 0; i<arrayCompleteIndex.length; i++){
              if( Number(arrayCompleteIndex[i]) === (index)){
                return true;
              }
            }
        }
    }
    
    return (

      <div style={{padding: '1rem 0rem'}} className="to-do-item">
          <div className="ui segments">

              {this.props.items.filter(filteringComplete.bind(this)).map( (item,index) => {
                return (  
                  <div className="ui segment" style={{backgroundColor:'grey'}} key={item.id} id={index+"list"}>
                    <div className="ui checkbox">
                      <input type="checkbox" name="checkbox" id={index+"checkbox"} checked />
                      <label id={index+"label"}></label>
                    </div>
                    <h3 style={{display:"inline-block", marginLeft:'1.2rem'}}> {"  " + item.text} </h3>

                  </div>)
              })}

          </div>
          
      </div>
    );
  }

}

export default CompletedList;
