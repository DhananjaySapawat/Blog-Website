import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import "./Fullpost.css"
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
function Fullpost(prop) {
    const CurrentUrl = prop.CurrentUrl;
    const { id } = useParams();
    const ArticleData = prop.ApiData.find(ArticleData => ArticleData.id === parseInt(id));
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [starcolor,Setstarcolor] = useState(null);
    const FullPostUrl = prop.FullPostUrl;
    useEffect(()=>{
        document.body.scrollTo(0,0) ;
    },[])
    var data = {
        "type" : "like",
        "id" : id
    }
    function handlelike(full){
        if(full === null || full === undefined ){
            return "grey";
        }
        var bol = full.isliked;
        if(bol === true){
          return "orange";
        }
        else{
          return "grey";
        }
    }
    function handlestar(){
        if(starcolor === "grey"){
            Setstarcolor("orange")
        }
        else{
            Setstarcolor("grey")
        }
        prop.parentcolor("yes");
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
    function FullData(fulldata){
        useEffect(() => {
            Setstarcolor(handlelike(fulldata));
        },[fulldata]);
        if(fulldata != null){
            var date = fulldata.date.slice(-2)+" "+ months[Number(fulldata.date.substr(5,2))-1]+" .";
            var time = readingTime(fulldata.description);
            var PostTime = time + " min read";
            return (

                <div className='full'>
                    <div className='myfullimg'><img className = "fullimg" src= {CurrentUrl+"media/"+fulldata.article_image} 
                        alt="Cheetah!" /></div>
                    <div className='fullmid'>
                        <p className='fullmidtitle'>{fulldata.article_title} </p> 
                        <p className='fullmidright'>
                        {date} <span>{PostTime}</span>
                        <button className='fullbtn' onClick = {handlestar}><i class= "fa fa-star " style = {{color:starcolor}} ></i></button>  
                        </p> 
                    </div>
                    <p className='fulldes'>
                        {fulldata.description}
                    </p>
                    <div> <i className="fulluser" class = "fa fa-user-circle" ></i> by {fulldata.username}</div>
                </div>
                
            )
        }
    }
    return (
        <div>{FullData(ArticleData)}</div>
    )
}
export default Fullpost