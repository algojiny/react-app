import { Component } from 'react';

class UpdateContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    }
    this.inputFormHandller = this.inputFormHandller.bind(this);
  }
  inputFormHandller(e){
    this.setState({[e.target.name]:e.target.value});

  }
  render(){
    console.log(this.props.data);
    return (
      <article>
        <h2>Update</h2>
        <form action='/update_process' method='post'
        onSubmit={function(e){
          e.preventDefault();//form안에서 submit클릭시 자동으로 action에 링크된 페이지로 이동하는 것을 막기위함
          this.props.onSubmit(
            this.state.id,
            this.state.title,
            this.state.desc,
          );
        }.bind(this)}
        >
          <input type='hidden' name='id' value={this.state.id}></input>
          <p>
            <input 
              type='text' 
              name='title' 
              placeholder='title'
              value={this.state.title}
              onChange={this.inputFormHandller}
            ></input>
          </p>
          <p>
            <textarea name='desc' 
              placeholder='description' 
              value={this.state.desc}
              onChange={this.inputFormHandller}
            ></textarea>
          </p>
          <p><input type='submit'></input></p>
        </form>
      </article>
    );
  }
}

export default UpdateContent; 