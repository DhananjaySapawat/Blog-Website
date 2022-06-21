import React,{ useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './Latest.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
function Latest (latestdata) {
    const [starcolor,Setstarcolor] = useState(latestdata.islikedcolor);
    useEffect(() =>{
        Setstarcolor(latestdata.islikedcolor);
    },[latestdata.islikedcolor])
    let id = latestdata.id;
    let no = latestdata.no + 1 + latestdata.pg;
    let title = latestdata.title;
    let description = latestdata.description ;
    let imgsrc = latestdata.imgsrc;
    var name  = latestdata.username;
    var place = latestdata.place;
    const FullPostUrl= "http://localhost:8000/allpost/";
    var data = {
        "type" : "like",
        "id" : latestdata.id,
        "currentid" : latestdata.currentid
    }
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const images = importAll(require.context('./photos', false, /\.(png|jpe?g|svg|jfif|webp)$/));
    function readingTime(text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    }
    let time = readingTime(description);
    imgsrc = images[imgsrc];
    function handlestar(){
        if(starcolor === "grey"){
            Setstarcolor("orange")
        }
        else{
            Setstarcolor("grey")
        }
        latestdata.passcolor("yes");
        axios.post(FullPostUrl, {
              data
            })
        .catch((err) => {});
    }
    return (
        <div className ="post">
            <h2>{no} {title}</h2>
            <p className="text">
                {description.slice(0, 500) }
                <p className="in"><Link to ={"/pages/"+id} ><button className ="btnreadd"><span className="read" > Read More . </span></button></Link>{" "}{time} min read <button className ="favstar" onClick = {handlestar}><i class= "fa fa-star " style = {{color:starcolor}} ></i></button></p>
            </p>
            <img  src={imgsrc}
            alt="Cheetah!" />
            <p className='latesticon'><span>&#9432;</span> {name} in {place}</p>
        </div>
  )
}

export default Latest 