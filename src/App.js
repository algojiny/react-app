import './App.css';
import { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";

//클래스 방식

/* 
  컴포넌트 쪼개기
class Subject extends Component{
  render(){
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}


class TOC extends Component{
  render(){
    return (
    <nav>
      <ul>
        <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">JavaScript</a></li>
      </ul>
    </nav>
    );
  }
} 

class Content extends Component{
  render(){
    return (
      <article>
        <h2>{this.props.title}</h2>
       {this.props.desc}
      </article>
    );
  }
}
*/

class App extends Component{

  constructor(props){
    super(props); //state초기화
    this.state = {
      mode:"read",
      selected_content_id:2,
      subject:{title:"WEB", sub:"world wide web!"},
      welcome:{title:"Welcome", desc:"Hello, React!!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }
  render(){
    var _title, _desc = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === "read"){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
       <Subject 
        title={this.state.subject.title}
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({
            mode:'welcome'
          })
        }.bind(this)}  
      >
       </Subject>
       {/*  <header>
          <h1> <a href = '/' onClick={function(e){
            console.log(e);
            e.preventDefault(); //이벤트 실행 후 기본적인 동작 막기
            //this.state.mode='welcome';
            this.setState({
              mode:'welcome'
            }); 
          }.bind(this)}> {this.state.subject.title} </a></h1 >
          {this.state.subject.sub}
        </header> */}
        <TOC onChangePage={function(){
          alert("hihiihi");
          this.setState({
            mode:'read'
          })
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Content title={_title} desc={_desc}></Content>
        
      </div>
    );
  }
}


/*
  함수형 방식
 function App() {
  return (
    <div className="App">
      Hello, React!!
    </div>
  );
} */

export default App;
