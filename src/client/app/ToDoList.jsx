import React from 'react';
import {render} from 'react-dom';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class ToDoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editText: "",
      checked: false

    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }
  
  handleChange(e) {
      this.setState({
        editText: e.target.value
      });
    }

  render() {

    return (

      <div style={{padding: '1rem 0rem'}} className="to-do-item">
          <div className="ui segments">

              {this.props.items.map( (item,index) => {
                return (  
                  <div className="ui segment" key={item.id} id={index+"list"}>
                    <div className="ui checkbox">
                      <input type="checkbox" name="checkbox" id={index+"checkbox"} onChange={this.props.onComplete} />
                      <label id={index+"label"}></label>
                    </div>
                    <h3 style={{display:"inline-block", marginLeft:'1.2rem'}}> {"  " + item.text} </h3>
                    <i onClick={()=>{this.props.handleRemove(item)}} className="large red remove icon" style={{float: 'right'}}></i>
                    <i onClick={()=>{this.props.handleEdit(item)}} className="large teal edit icon" style={{float: 'right'}}></i>
                    
                    { (this.props.isShowEditInputId===item.id)&&(this.props.isOpenEditInput) ? (

                        <form className="ui form" onSubmit={(e) => {this.props.submitEditList(item, this.state.editText, e)}} >
                          <div className="inline field">
                            <input type="text" onChange={this.handleChange} defaultValue={item.text} />
                            <button className="ui button" type="submit">edit</button>
                          </div>
                        </form>


                      ) : null }



                  </div>)
              })}

          </div>
          
      </div>
    );
  }

}

export default ToDoList;
