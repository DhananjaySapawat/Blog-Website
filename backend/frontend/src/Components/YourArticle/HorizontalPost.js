import React from 'react';
import "./HorizontalPost.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
function HorizontalPost(Post) {
    /* Constants */
    const CurrentUrl = Post.CurrentUrl;
    const FullPostUrl = Post.FullPostUrl;
    let title = Post.PostData.article_title;
    let description = Post.PostData.description;
    let id = Post.PostData.id;
    var imgsrc = CurrentUrl+"media/"+ Post.PostData.article_image;
    let data = {
    "type" : "delete",
    "id": id,
    }
    function handledelete(e){
        axios.post(FullPostUrl, {
            data
            })
            .catch((err) => {});
        Post.childchange(false);
    }
    return (
      <div className='horizontalpost'>
        <div className='horizontalpostimg'>
          <img src= {imgsrc} alt="Cheetah!" />
        </div>
        <div className='middle'><Link to={"/pages/"+id}><p >{title}</p></Link>
            <p>{description.slice(0, 200)}</p>
        </div>
        <div className='icons'>
          <Link to={"/editpages/"+id}><button className ="editbtn" ><i class="fa fa-edit"></i></button></Link>
          <Link to="/yourarticle"><button  className ="deletebtn" onClick={handledelete}><i class="fa fa-trash" ></i></button></Link>
        </div>
      </div>
  )
}

export default HorizontalPost