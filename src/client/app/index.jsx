import React from 'react';
import {render} from 'react-dom';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import ToDoList from './ToDoList.jsx';
import CompletedList from './CompletedList.jsx';

class App extends React.Component {
  
    constructor(props) {
      super(props);

      if(!localStorage.getItem('items')) {
        var firstItems = [];
      } else {
        var firstItems = JSON.parse(localStorage.getItem('items'));
      }

      if(!localStorage.getItem('completedIndex')) {
        var firstCompletedIndex = [];
      } else {
        var firstCompletedIndex = JSON.parse(localStorage.getItem('completedIndex'));
      }

      this.state = {
        items: firstItems,
        text: '',
        isShowEditInputId: 0,
        isOpenEditInput: false,
        completedIndex: firstCompletedIndex
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.submitEditList = this.submitEditList.bind(this);
      this.onComplete = this.onComplete.bind(this);
    }
    
    componentDidMount() {

      if(this.state.completedIndex.length!==0){
        for(let i = 0; i < this.state.completedIndex.length; i++){
          $('#'+this.state.completedIndex[i]+'checkbox').prop('checked', true);
          $('#'+this.state.completedIndex[i]+'list').css("background-color", "grey");
          $('#'+this.state.completedIndex[i]+'label').html("<span class='my-label'>Completed !</span>");
        }
      }


      $('.menu .item').tab() ;
      $('.menu .item').click(function(){
        $('.menu .item').removeClass("active");
        $(this).addClass("active");
      });
      
    }
    componentDidUpdate() {

    }

    onComplete(e) {
      var $target = $(e.target);
      var $segment = $target.closest( ".ui.segment" );
      var $label = $target.siblings( "label" );

      if($target.is(':checked')) {
        $segment.css("background-color", "grey");
        $label.html("<span class='my-label'>Completed !</span>");
        var index = e.target.id;
        var newIndex = index.replace("checkbox", "");

        this.state.completedIndex.push(newIndex);
        this.setState({
          completedIndex: this.state.completedIndex
        });
        
      } else {
        $segment.css("background-color", "#fff");
        $label.html("");
        var index = e.target.id;
        var newIndex = index.replace("checkbox", "");
        var theIndexValue = this.state.completedIndex.indexOf(newIndex);
        this.state.completedIndex.splice(theIndexValue, 1),
        this.setState( {
          completedIndex: this.state.completedIndex
        });
      }

    }

    handleChange(e) {
      this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
          text: this.state.text,
          id: Date.now()
        };
        this.setState((prevState) => ({
          items: prevState.items.concat(newItem),
          text: ''
        }));
    }

    handleRemove(specificItem) {
        if (confirm('You want to delete this one?')) {
            var restItems = this.state.items.filter( item => {
              return item.id !== specificItem.id;
            });

            this.setState({
              items: restItems
            });
          console.log("this item has been removed");
        } else {
          console.log("cancel the removal");
        }
        
    }

    handleEdit(specificItem) {
      var showThisItem = this.state.items.filter( item => {
        return item.id === specificItem.id;
      })
      this.setState({
        isShowEditInputId: showThisItem[0].id,
        isOpenEditInput: !this.state.isOpenEditInput
      });
    }

    submitEditList(specificItem, editText, e) {
      e.preventDefault();
      var index = this.state.items.indexOf(specificItem);
      var editedItem = {
        text: editText,
        id: this.state.items[index].id
      };
      this.state.items.splice(index, 1 , editedItem)
      this.setState({
        items: this.state.items,
        isOpenEditInput: !this.state.isOpenEditInput
      });
    }

    render() {
      return (
        <div className="home-wrap">
            {/*------------------------Header Zone------------------------*/}
            <div className="ui middle aligned one column centered grid">
              <div className="row">
                <div className="column">  
                  <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui text container">
                      <h1 className="ui inverted header">
                        To Do list web application
                      </h1>
                      <h3>by Supanat Piphitpattanaprapt</h3>
                      <a style={{color:'white'}} href="mailto:oaksupanat@gmail.com">
                        <div className="ui big primary button">
                          Contact <span style={{textTransform: 'none',fontWeight: '200'}}>oaksupanat@gmail.com </span>
                          <i style={{marginLeft: '1rem'}} className="mail icon"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 style={{marginTop: '4rem'}} className="ui center aligned icon header">
              <i className="circular sound icon"></i>
              Add your TODO list<br />
            </h2>

          {/*------------------------Content Zone------------------------*/}
          <div className="ui two column doubling stackable centered grid">
            <div className="column">
              <div style={{textAlign: 'center', margin: '2.5rem 0 3rem'}}>

                <form className="ui form" onSubmit={this.handleSubmit}>
                  <div className="inline field">
                    <input onChange={this.handleChange} value={this.state.text} type="text" placeholder="Buy a car?" />
                    <button className="ui button" type="submit">+</button>
                  </div>
                </form>
              </div>
              <div className="ui top attached tabular menu">
                <a className="item active" data-tab="first">All</a>
                <a className="item" data-tab="second">Completed Task</a>
              </div>
              <div className="ui bottom attached tab segment active" data-tab="first">
                <ToDoList items={this.state.items} handleRemove={this.handleRemove} onComplete={this.onComplete}
                handleEdit={this.handleEdit} isShowEditInputId={this.state.isShowEditInputId} isOpenEditInput={this.state.isOpenEditInput}
                submitEditList={this.submitEditList} /> 
              </div>
              <div className="ui bottom attached tab segment" data-tab="second">

                <CompletedList items={this.state.items} completedIndex={this.state.completedIndex} />
              
              </div>


            </div>
          </div>
        </div>
      );
    }
}

const targetElement = document.getElementById('app');

render((
  <App />
), targetElement);

