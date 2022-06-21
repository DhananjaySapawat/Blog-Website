import React, { useState,useEffect } from 'react'
import HorizontalPost from './HorizontalPost'
import './YourArticle.css'
function YourArticle(props) {
  let name = props.username;
  const [Posts,SetPosts] = useState(null);
  useEffect(() => {
    SetPosts(props.ApiData);
  },[props.ApiData])
  function handlelike(bol){
    if(bol === true){
      return "orange";
    }
    else{
      return "grey";
    }
  }
  function mypost(Posts){
    if(Posts!=null){
        return (
        Posts.sort((a,b) => a.likes - b.likes).map(post =>(
            userpost(post)
        ))
      )
    }
  }
  function passchildchange(value){
    props.passchange(value);
  }
  function userpost(post){
    if(post.username === name){
      return  <HorizontalPost childchange = {passchildchange}  islikedcolor = {handlelike(post.isliked)} title={post.article_title} description={post.description} imgsrc={post.article_image} id ={post.id} date ={post.date} username={post.username} />
    }
  }
  return (
    <div className='yourarticle'><p>YOUR SUBMITTED ARTICLES</p>
        {
            mypost(Posts)
        }
    </div>
  )
}

export default YourArticle