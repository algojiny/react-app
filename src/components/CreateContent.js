import { Component } from 'react';

class CreateContent extends Component{
  render(){
    return (
      <article>
        <h2>Create</h2>
        <form action='/create_process' method='post'
        onSubmit={function(e){
          e.preventDefault();//form안에서 submit클릭시 자동으로 action에 링크된 페이지로 이동하는 것을 막기위함
          this.props.onSubmit(
            e.target.title.value,
            e.target.desc.value
          );
        }.bind(this)}
        >
          <p><input type='text' name='title' placeholder='title'></input></p>
          <p><textarea name='desc' placeholder='description'></textarea></p>
          <p><input type='submit'></input></p>
        </form>
      </article>
    );
  }
}

export default CreateContent; 