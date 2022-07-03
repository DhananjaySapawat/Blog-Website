import React, { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import HorizontalPost from '../Components/YourArticle/HorizontalPost';
import './YourArticle.css';
function YourArticle(props) {
  /* Constants */
  const name = props.username;
  const [Posts,SetPosts] = useState(null);
  const [start,Setstart] = useState(0);
  const PostsPerPage = 10;
  const [end,Setend] = useState(PostsPerPage);  
  const [PageNumber,SetPageNumber] = useState(0);
  const [PageCount,SetPageCount] = useState(1);

  /* useEfeect Functions */
  useEffect(() => {
    SetPosts((props.ApiData).filter( (post) => { return (post.username === name) } ).sort((a,b)=> a.id-b.id).reverse());
  },[props.ApiData]);

  useEffect(() => {
      SetPageCount(Posts ? Math.ceil(Posts.length / PostsPerPage) : 1);
  },[Posts]);

  useEffect(()=>{
    document.body.scrollTo(0,0) ;
  },[PageNumber]);

  /* Functions */
  function handlePageClick(event){
    SetPageNumber(event.selected*PostsPerPage)
    const PostSet = (event.selected * PostsPerPage) % Posts.length;
    Setstart(PostSet);
    Setend(PostSet+PostsPerPage);
  }  
  return (
    <div className='yourarticle'><p>YOUR SUBMITTED ARTICLES</p>
        {           
          Posts ?  Posts.slice(start,end).map(post =>(
            <HorizontalPost 
            PostData = {post} 
            childchange = { (value) => {props.passchange(value)} }  
            FullPostUrl={props.FullPostUrl} 
            CurrentUrl = {props.CurrentUrl}/> )) : " "
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