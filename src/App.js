import './App.css';
import { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from './components/Control';

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
    this.max_content_id=3;//contents 추가시 id생성을 위한 마지막 id값, state로 만들면 불필요한 로딩이 더 발생하기 때문에 단독 속성값으로 작성 
    this.state = {
      mode:"welcome",
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
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if( data.id == this.state.selected_content_id){
          return data;
          break;
        }
        i++;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === "read"){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id = this.max_content_id+1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title: _title, desc: _desc}
        // );
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title: _title, desc: _desc}
        )
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0
          while(i<_contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i++
          }

          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render(){

    return (
      <div className="App">
       <Subject 
        title={this.state.subject.title}
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({
            mode:'welcome',
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
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id: +id
          });
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);//splice(삭제할 객체의 시작 index, 삭제 개수)
                  break;
                }
                i++;
              }
              this.setState({
                mode:'welcome',
                contents: _contents
              });
              alert('deleted!');
            }
          }else{
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
        
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
