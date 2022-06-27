import React, { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import HorizontalPost from './HorizontalPost';
import './YourArticle.css';
function YourArticle(props) {
  let name = props.username;
  const [Posts,SetPosts] = useState(null);
  const [start,Setstart] = useState(0);
  const PostsPerPage = 10;
  const [end,Setend] = useState(PostsPerPage);  
  const [PageNumber,SetPageNumber] = useState(0);
  const [PageCount,SetPageCount] = useState(1);
  function CheckMyPost(post){
    return (post.username === name);
  }
  useEffect(() => {
    SetPosts((props.ApiData).filter(CheckMyPost).sort((a,b)=> a.id-b.id).reverse());
  },[props.ApiData]);

  useEffect(() => {
    if(Posts!== null && Posts!== undefined){
      SetPageCount(Math.ceil(Posts.length / PostsPerPage));
    }
  },[Posts]);

  useEffect(()=>{
    document.body.scrollTo(0,0) ;
  },[PageNumber]);

  function GiveStart(i,n,m){
    var a = n - i - m;
    if(a<0){
      return 0;
    }
    return a;
  }
  function GiveEnd(i,n){
    var a = n - i;
    return a;
  }
  function handlePageClick(event){
    SetPageNumber(event.selected*PostsPerPage)
    const PostSet = (event.selected * PostsPerPage) % Posts.length;
    Setstart(PostSet);
    Setend(PostSet+PostsPerPage);
  }
  function handlelike(bol){
    if(bol === true){
      return "orange";
    }
    else{
      return "grey";
    }
  }
  
  function mypost(MyPosts){
    if(MyPosts!=null){
        return (
          MyPosts.slice(start,end).map(post =>(
            <HorizontalPost childchange = {passchildchange}  islikedcolor = {handlelike(post.isliked)} title={post.article_title} description={post.description} imgsrc={post.article_image} id ={post.id} date ={post.date} username={post.username} FullPostUrl={props.FullPostUrl} CurrentUrl = {props.CurrentUrl}/>
        ))
      )
    }
  }
  function passchildchange(value){
    props.passchange(value);
  }
  return (
    <div className='yourarticle'><p>YOUR SUBMITTED ARTICLES</p>
        {
            mypost(Posts)
        }
        <nav aria-label="Page navigation example"> 
          <ReactPaginate
            onPageChange={handlePageClick}
            nextLabel="Next"
            pageRangeDisplayed={5}
            pageCount={PageCount}
            previousLabel="Previous"
            renderOnZeroPageCount = {null}
            containerClassName='pagination'
            pageLinkClassName = 'page-num'
            previousLinkClassName = 'page-num'
            nextLinkClassName = 'page-num'
            activeClassName='active'
          />
        </nav> 
    </div>
  )
}

export default YourArticle