import React ,{useState,useEffect}from 'react';
import {Link } from "react-router-dom";
import './SmallPost.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
function SmallPost(smalldata) {
    const FullPostUrl= smalldata.FullPostUrl;
    const [starcolor,Setstarcolor] = useState(smalldata.islikedcolor);
    const CurrentUrl = smalldata.CurrentUrl;
    var id = smalldata.id;
    var imgsrc = CurrentUrl+"media/" + smalldata.imgsrc;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = smalldata.date.slice(-2)+" "+ months[Number(smalldata.date.substr(5,2))-1]+" .";
    useEffect(() =>{
        Setstarcolor(smalldata.islikedcolor);
    },[smalldata.islikedcolor])
    var data = {
        "type" : "like",
        "id" : smalldata.id
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
    function readingTime(text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    }
    var time = readingTime(smalldata.description);
    return (
        <div className='small'  >  
            <img src= {imgsrc}
            alt="Cheetah!" />
            <div className="comp">
                <div className='comp-top'>
                    <p className='comp-top-icon'><span >&#9432;</span></p> 
                    <div  className='comp-top-text'>
                        <p className ="comptext">{smalldata.username}</p>
                        <p className="com">in <span>{smalldata.company}</span></p>
                    </div>
                </div>
                <Link to= {"/pages/"+id}><p className ="topclick"  >{smalldata.title}</p></Link>
                <p className='topdate'>{date} {time} min read
                <button className='fullbtn' onClick = {handlestar}><i class= "fa fa-star " style = {{color:starcolor}} ></i></button>  
                </p>
            </div>
        </div>      
  )
}

export default SmallPost