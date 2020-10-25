import React from 'react';
import './App.css';
import Nav from './Nav';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import PhotoList from './PhotoList';
import PostPhoto from './PostPhoto';
import PhotoDetail from './PhotoDetail';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      photoList: []
    }
  }

  addToList = (newPost) => {
    const{photoList} = this.state;
    this.setState({
      photoList: photoList.concat(newPost)
    })
    console.log(newPost);
  }

  updatePost = (updatedPost) => {
    const{photoList} = this.state;
    const thisList = Object.assign([], photoList);
    const currentItem = thisList[updatedPost.index];
    currentItem.title = updatedPost.title;
    currentItem.imgUrl = updatedPost.imgUrl;
    this.setState({
      photoList: thisList
    })
    console.log(updatedPost)
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Welcome to Photo Manager!</h1>
        </header>
        <body>
          <BrowserRouter>
            <Nav />
            <Route exact path="/" component={Home} />
            <Route exact path="/photolist" render={(props) => <PhotoList {...props} photoList={this.state.photoList} />} />
            <Route path="/photolist/:id" render={(props) => <PhotoDetail {...props} updatePost={this.updatePost} photoList={this.state.photoList} />} />
            <Route path="/postphoto" render={(props) => <PostPhoto {...props} addToList={this.addToList} />} />
          </BrowserRouter>
        </body>
      </div>
    );
  }
 
}

export default App;
