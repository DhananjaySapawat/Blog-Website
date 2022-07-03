import React from 'react'
import Latest from './Latest';
import './AllArticle.css'
function AllArticle(props) {
  var AllPostData = props.Posts;
  var start = props.start;
  var end = props.end;
  var PostsPerPage = props.PostsPerPage;
  var PageNumber = props.PageNumber;
  function likecall(value){
    props.childlikecall(value);
  }
  if(end<=0){
    return (
      AllPostData.sort((a,b) => {return (a.id - b.id)}).slice(AllPostData.length-PostsPerPage,AllPostData.length).reverse().map((post,no)  =>(
        <Latest islikedcolor = {post.isliked?"orange":"gray"} 
          currentid = {props.currentid} 
          passcolor = {likecall} 
          title={post.article_title} 
          description={post.description} 
          imgsrc={post.article_image} 
          date={post.date} 
          username={post.username} 
          place={post.company} 
          id = {post.id} 
          pg = {PageNumber} 
          no = {no++}  
          FullPostUrl={props.FullPostUrl} 
          CurrentUrl = {props.CurrentUrl}
        />))
    )
  }
  
  else{
    return (
      AllPostData.sort((a,b) => {return (a.id - b.id)}).slice(start,end).reverse().map((post,no)  =>(
        <Latest islikedcolor = {post.isliked?"orange":"gray"} 
          currentid = {props.currentid} 
          passcolor = {likecall}  
          title={post.article_title} 
          description={post.description} 
          imgsrc={post.article_image} 
          date={post.date} 
          username={post.username} 
          place={post.company} 
          id = {post.id} 
          pg = {PageNumber} 
          no = {no++}  
          FullPostUrl={props.FullPostUrl} 
          CurrentUrl = {props.CurrentUrl} />
      ))
    )
  }
}

export default AllArticle