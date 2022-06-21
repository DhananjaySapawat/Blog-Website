import React from 'react';
import "./HorizontalPost.css";
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
function HorizontalPost(Post) {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
     }
    const images = importAll(require.context('./photos', false, /\.(png|jpe?g|svg|jfif|webp)$/));
    let title = Post.title;
    let description = Post.description;
    let id = Post.id;
    let data = {
    "type" : "delete",
    "id": id,
     }
    function handledelete(e){
        const url = "http://localhost:8000/allpost/";
        axios.post(url, {
            data
            })
            .catch((err) => {});
        Post.childchange(false);
    }
    var imgsrc = Post.imgsrc;
    imgsrc = images[imgsrc];
  return (
    <div className='horizontalpost'>
        <div className='horizontalpostimg'>
          <img src= {imgsrc}
          alt="Cheetah!" />
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