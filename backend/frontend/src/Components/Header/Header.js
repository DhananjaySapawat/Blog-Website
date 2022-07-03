import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import './Header.css'
function Header(props) {
    const name = props.name;
    const username = (name==="AnonymousUser")?"":name;
    const CurrentUrl = props.CurrentUrl;
    const [logtext,Setlogtext] = useState((name === "AnonymousUser")?"login":"logout");
    useEffect(() => {
        Setlogtext((name === "AnonymousUser")?"login":"logout");
    },[name]);
    function log(){
        if(logtext === "login"){
        Setlogtext("logout");
        window.location.href=CurrentUrl+'login/';    
        }
        else{
        Setlogtext("login");
        window.location.href=CurrentUrl+'logout/';    
    }
  }
    return (
    <ul className='header'>
        <Link to = ""><li ><h2>Greetings {username}</h2></li></Link>
        <li className="non-li"><button onClick={log}>{logtext}</button></li>
        { 
          (name!=="AnonymousUser") ? 
          <li className="non-li" ><Link to = "/yourarticle">
          <button  >
            Your Articles
          </button></Link></li>:null 
        }
        {
          (name!=="AnonymousUser") ?
          <li className="non-li"><Link to = "/Create">
          <button >
              Write
          </button> 
          </Link></li>:null 
        }
        <li className="non-li"><Link to = "">
        <button>
            Home
        </button> 
        </Link></li>  
        <li className="inv-li" id="home-btn"><Link to = "">
        <button >
            Home
        </button> 
        </Link></li>
        {
          (name!=="AnonymousUser") ?
          <li className="inv-li"><Link to = "/Create">
          <button >
              Write
          </button> 
          </Link></li>:null 
        }
        { 
          (name!=="AnonymousUser") ? 
          <li className="inv-li" ><Link to = "/yourarticle">
          <button  >
            Your Articles
          </button></Link></li>:null 
        }
        <li className="inv-li">
        <button onClick={log}>
            {logtext}
        </button>
        </li>
      </ul>
  )
}

export default Header