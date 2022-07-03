import React,{useState,useEffect} from 'react'
import TopArticle from '../Components/Home/TopArticle';
import Footer from '../Components/Home/Footer';
import AllArticle from '../Components/Home/AllArticle' 
import "./Home.css"
import ReactPaginate from 'react-paginate';
function Home(prop){
  var Posts = prop.ApiData;
  const [start,Setstart] = useState(0);
  const [end,Setend] = useState(0);
  const PostsPerPage = 10;
  const [PageNumber,SetPageNumber] = useState(0);
  var pageCount = Math.ceil(Posts.length / PostsPerPage);
  /* useEffect */

  useEffect(()=>{
      document.body.scrollTo(0,0) ;
    },[PageNumber])

  /* Functions */
  function likecall(value){
     prop.parentcolor(value);
  }
  function GiveStart(i,n,m){
    return (n - i - m) < 0 ? 0 : (n - i - m);
  }
  function GiveEnd(i,n){
    return  n - i;
  }
  function handlePageClick(event){
      SetPageNumber(event.selected*PostsPerPage)
      const PostSet = (event.selected * PostsPerPage) % Posts.length;
      Setstart(GiveStart(PostSet,Posts.length,PostsPerPage));
      Setend(GiveEnd(PostSet,Posts.length));
  }
  
  return (
    <div>
      <TopArticle  
        passcolor = {likecall} 
        ApiData = {prop.ApiData}  
        currentid = {prop.currentid} 
        FullPostUrl={prop.FullPostUrl} 
        CurrentUrl = {prop.CurrentUrl} 
      />
      {Posts? 
        <AllArticle 
          Posts = {Posts} 
          end = {end} 
          PostsPerPage = {PostsPerPage} 
          PageNumber={PageNumber} 
          FullPostUrl={prop.FullPostUrl} 
          CurrentUrl = {prop.CurrentUrl} 
          currentid = {prop.currentid} 
          start ={start} 
          childlikecall = {likecall}
        />:(" ")
      } 
      <nav aria-label="Page navigation example"> 
        <ReactPaginate
          onPageChange={handlePageClick}
          nextLabel="Next"
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount = {null}
          containerClassName='pagination'
          pageLinkClassName = 'page-num'
          previousLinkClassName = 'page-num'
          nextLinkClassName = 'page-num'
          activeClassName='active'
        />
      </nav> 
      <Footer/>
    </div>
  )
}

export default Home