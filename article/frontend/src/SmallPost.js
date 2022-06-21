import React ,{useState,useEffect}from 'react';
import {Link } from "react-router-dom";
import './SmallPost.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
function SmallPost(smalldata) {
    const FullPostUrl= "http://localhost:8000/allpost/";
    const [starcolor,Setstarcolor] = useState(smalldata.islikedcolor);
    useEffect(() =>{
        Setstarcolor(smalldata.islikedcolor);
    },[smalldata.islikedcolor])
    var data = {
        "type" : "like",
        "id" : smalldata.id,
        "currentid" : smalldata.currentid
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    function importAll(r) {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    function handlestar(){
        if(starcolor === "grey"){
            Setstarcolor("orange")
        }
        else{
            Setstarcolor("grey")
        }
        smalldata.passtocolor("yes");
        axios.post(FullPostUrl, {
              data
            })
        .catch((err) => {});
    }
    const images = importAll(require.context('./photos', false, /\.(png|jpe?g|svg|jfif|webp)$/));
    function readingTime(text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    }
    var name  = smalldata.username;
    var id = smalldata.id;
    var place = "python Programming";
    let strtitle = smalldata.title;
    var title = strtitle;
    var date = smalldata.date.slice(-2)+" "+ months[Number(smalldata.date.substr(5,2))-1]+" .";
    var time = readingTime(smalldata.description);
    var imgsrc = smalldata.imgsrc;
    imgsrc = images[imgsrc];
    return (
        <div className='small'  >  
            <img src= {imgsrc}
            alt="Cheetah!" />
            <div className="comp">
                <p className ="comptext"><i class= "fa fa-info-circle"  ></i><span> {name}</span> </p>
                <p className="com">in <span>{place}</span></p>
            </div>
            <Link to= {"/pages/"+id}><p className ="topclick"  >{title}</p></Link>
            <p className='topdate'>{date} {time} min read
            <button className='fullbtn' onClick = {handlestar}><i class= "fa fa-star " style = {{color:starcolor}} ></i></button>  
            </p>
        </div>      
  )
}

export default SmallPost