import React, { Component } from 'react';
import './ContentRating.css';

class ContentRating extends Component {
  constructor() {
    super();
    this.state = {
      likes: 0,
      dislikes: 0,
      totalRatings: 0,  
      handleLike: () => {
        this.setState(prevState => ({
          likes: prevState.likes + 1,
          totalRatings: prevState.totalRatings + 1
        }))
      },
      handleDislike: () => {
        this.setState(prevState => ({
          dislikes: prevState.dislikes + 1,
          totalRatings: prevState.totalRatings + 1
        }))
      }
    }
  }
  render() {
    let test = this.state.likes+1;
    console.log('test = ',test);
    return (
      <div className='content-rating'>
        <p>
          Some content that you can like or dislike, whichever you like!
        </p>
        <div className="rating-buttons">
          <div onClick={this.state.handleLike} className="like-button">
            Like ({this.state.likes})
          </div>
          <div onClick={this.state.handleDislike} className="dislike-button">
            dislike ({this.state.dislikes})
          </div>
        </div>
        <div className="total-ratings">
          Total Ratings: {this.state.totalRatings}
        </div>
      </div>
    );
  }
}

export default ContentRating;
