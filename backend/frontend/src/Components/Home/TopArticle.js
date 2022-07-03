import React from 'react'
import SmallPost from './SmallPost';
import './TopArticle.css'
function TopArticle(prop) {
  var Posts = prop.ApiData;
  function passchange(value){
      prop.passcolor(value);
  }
  var ReversePost = Posts.sort((a,b) => a.likes - b.likes).reverse() ; 
  return (
    <div className='top'>
        <h2>TOP ARTICLES</h2>
        {
          Posts? ReversePost.slice(0,5).map(post =>(
            <SmallPost 
              islikedcolor = {post.isliked?"orange":"gray"}  
              description = {post.description} 
              title={post.article_title} 
              username={post.username} 
              imgsrc={post.article_image} 
              date = {post.date} 
              id = {post.id} 
              company = {post.company}
              currentid = {prop.currentid}   
              FullPostUrl={prop.FullPostUrl} 
              CurrentUrl = {prop.CurrentUrl} 
              passtocolor ={passchange} 
            />))  :" "
        }
    </div>
  )
}

export default TopArticle