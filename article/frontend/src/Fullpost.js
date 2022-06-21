import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import "./Fullpost.css"
import 'font-awesome/css/font-awesome.min.css';
function Fullpost(prop) {
    const { id } = useParams();
    const ArticleData = prop.ApiData.find(ArticleData => ArticleData.id === parseInt(id));
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [starcolor,Setstarcolor] = useState(null);
    useEffect(()=>{
        window.scrollTo({top: 0});
    },[])
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const images = importAll(require.context('./photos', false, /\.(png|jpe?g|svg|jfif|webp)$/));
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
            console.log(fulldata);
            var date = fulldata.date.slice(-2)+" "+ months[Number(fulldata.date.substr(5,2))-1]+" .";
            var time = readingTime(fulldata.description);
            var PostTime = time + " min read";
            return (

                <div className='full'>
                    <div className='myfullimg'><img className = "fullimg" src= {images[fulldata.article_image]} 
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