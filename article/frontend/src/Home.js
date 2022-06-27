import React,{useState,useEffect} from 'react'
import TopArticle from './TopArticle';
import Latest from './Latest';
import "./Home.css"
import ReactPaginate from 'react-paginate';
function Home(prop){
  var Posts = prop.ApiData;
  const [start,Setstart] = useState(0);
  const [end,Setend] = useState(0);
  const PostsPerPage = 10;
  const [PageNumber,SetPageNumber] = useState(0);
  var pageCount = Math.ceil(Posts.length / PostsPerPage);
  useEffect(()=>{
      document.body.scrollTo(0,0) ;
    },[PageNumber])
  function likecall(value){
     prop.parentcolor(value);
  }
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
      Setstart(GiveStart(PostSet,Posts.length,PostsPerPage));
      Setend(GiveEnd(PostSet,Posts.length));
  }
  function handlelike(bol){
      if(bol === true){
        return "orange";
      }
      else{
        return "grey";
      }
  }
  function allpost(Postss){
      if(Postss!==null){
          if(end<=0){
            return (
              Postss.sort((a,b) => {return (a.id - b.id)}).slice(Postss.length-PostsPerPage,Postss.length).reverse().map((post,no)  =>(
              <Latest islikedcolor = {handlelike(post.isliked)} currentid = {prop.currentid} passcolor = {likecall} title={post.article_title} description={post.description} imgsrc={post.article_image} date={post.date} username={post.username} place={post.company} id = {post.id} pg = {PageNumber} no = {no++}  FullPostUrl={prop.FullPostUrl} CurrentUrl = {prop.CurrentUrl}/>
                ))
              )
          }
          else{
          return (
            Postss.sort((a,b) => {return (a.id - b.id)}).slice(start,end).reverse().map((post,no)  =>(
            <Latest islikedcolor = {handlelike(post.isliked)} currentid = {prop.currentid} passcolor = {likecall}  title={post.article_title} description={post.description} imgsrc={post.article_image} date={post.date} username={post.username} place={post.company} id = {post.id} pg = {PageNumber} no = {no++}  FullPostUrl={prop.FullPostUrl} CurrentUrl = {prop.CurrentUrl} />
              ))
            )
          }
      }
  }
  return (
    <div>
      <TopArticle  passcolor = {likecall} ApiData = {prop.ApiData}  currentid = {prop.currentid} FullPostUrl={prop.FullPostUrl} CurrentUrl = {prop.CurrentUrl} />
      {
       allpost(Posts)
      }
    <nav aria-label="Page navigation example"> 
      <ReactPaginate
        onPageChange={handlePageClick}
        nextLabel="Next"
        pageRangeDisplayed={5}
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
    <footer >
      <div>
        <section >
          <a  href="https://www.facebook.com/dhananjay.sapawat/" role="button"
            ><i className="fa fa-facebook"></i
          ></a>
          <a href="https://twitter.com/DhananjaySapaw1" role="button"
            ><i className="fa fa-twitter"></i
          ></a>
          <a href="mailto:dhananjaysapawat1947@gmail.com" role="button"
            ><i className="fa fa-envelope"></i
          ></a>
          <a href="https://www.instagram.com/dhan_man_jay_sapawat/" role="button"
            ><i className="fa fa-instagram"></i
          ></a>
          <a  href="https://www.linkedin.com/in/dhananjay-sapawat-3b628920b" role="button"
            ><i className="fa fa-linkedin"></i
          ></a>
           <a href="https://github.com/DhananjaySapawat" role="button"
            ><i className="fa fa-github"></i
            ></a>
        </section>
        <div >
          © 2022 Copyright :
          <a > Dhananjay Sapawat</a>
        </div>
      </div>
    </footer>
  
    </div>
  )
}

export default Home