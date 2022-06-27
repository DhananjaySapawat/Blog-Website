import React from 'react'
import SmallPost from './SmallPost';
import './TopArticle.css'
function TopArticle(prop) {
  var Posts = prop.ApiData;
  function handlelike(bol){
      if(bol === true){
        return "orange";
      }
      else{
        return "grey";
      }
  }
  function passchange(value){
      prop.passcolor(value);
  }
  var ReversePost = Posts.sort((a,b) => a.likes - b.likes).reverse() ; 
  function alltoppost(Posts){
    if(Posts!=null){
        return (
           ReversePost.slice(0,5).map(post =>(
          <SmallPost islikedcolor = {handlelike(post.isliked)} passtocolor ={passchange} description = {post.description} title={post.article_title} username={post.username} imgsrc={post.article_image} date = {post.date} id = {post.id} currentid = {prop.currentid}   FullPostUrl={prop.FullPostUrl} CurrentUrl = {prop.CurrentUrl}/>
        ))
      )
    }
  }
  return (
    <div className='top'>
        <h2>TOP ARTICLES</h2>
        {
          alltoppost(Posts)
        }
    </div>
  )
}

export default TopArticle