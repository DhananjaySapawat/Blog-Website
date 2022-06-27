import React,{ useState,useEffect } from 'react';
import { Routes, Route ,Link } from "react-router-dom";
import './App.css';
import Home from './Home';
import YourArticle from './YourArticle';
import Fullpost from './Fullpost';
import Edit from './Edit';
import ErrorPage from './ErrorPage';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
function App() {
    /* Constant and variable */
    useEffect(() => {
      document.title = "CricShard"
    }, []);
    const [btn,Setbtn] = useState("Write");
    const [link,Setlink] = useState("/create");
    const [logtext,Setlogtext] = useState("login");
    const [ApiData,SetApiData] = useState([]);
    const [change,Setchange] = useState([false]);
    const [currentid,Setcurrentid] = useState([]);
    var imgsrcc = "empty.png";
    var Title = " ";
    var descr = " ";
    const [name,Setname] = useState("");
    const CurrentUrl = "http://127.0.0.1:8000/";
    const CurrentUserUrl = CurrentUrl +"current/";
    const FullPostUrl = CurrentUrl + "allpost/";
    let data = {
    "type" : "add",
    "article_title": "",
    "description": "",
    "username": "",
    "article_image": "",
    "company": "python Programming",
    "date": ""
    }
    /* fetching data from api*/
    function fetchdata () {
        Setchange(true);
        axios.get(FullPostUrl)
            .then(res => {
              data = res.data;
              SetApiData(data);
            })
            .catch(err => {})
    }
    useEffect(
        fetchdata
    , [change]);
     /* fetching currentuser from api*/
    useEffect(() => {
        axios.get(CurrentUserUrl)
          .then((response) => {
          Setcurrentid(response.data.current_id);
          Setname(response.data.current_user);
        });
    }, [CurrentUserUrl]);
    /* functions for Create app */
    function log(e){
      if(logtext === "login"){
        Setlogtext("logout");
        window.location.href=CurrentUrl+'login/';    
      }
      else{
        Setlogtext("login");
        window.location.href=CurrentUrl+'logout/';    
      }
    }
    function handleSubmit(e){
        data.username = name;
        axios.post(FullPostUrl, {
              data
            })
            .catch((err) => {});
        Setchange(false);
    };
    function btnName(e){
        if(btn === "Write"){
            Setbtn("Publish");
            Setlink("../");
            }
        else{
            Setbtn("Write");
            Setlink("/create");
            data["article_title"] = Title;
            data["description"] = descr; 
            data["username"] = name;
            data["article_image"] = imgsrcc;
            handleSubmit(e)     
        }
  }
  function notcreate(){
    Setbtn("Write");
    Setlink("/create");
  }
  
  /* create app */
  function Create() {
        const [file, setFile] = useState("");
        const handleTitle = (e) => {
                e.preventDefault()
                Title = e.target.value;
        };
        const handledesrc = (e) =>{
                e.preventDefault()
                descr = e.target.value;
        };
        const handleimgsrc = (e) =>{
            imgsrcc = (e.target.value).substr(12);
            setFile(e.target.value.substr(12));
            console.log(e.target.value.substr(12));
        };
        function createimg (img) {
          if(img!==""){
            return <img className = "createpreview" src= {CurrentUrl + "media/"+img}
              alt="Cheetah!" />
          }
        }
       
        return (
          <div className ="create">
          <form id="my-form">
              <label for="createTitle">TITLE</label><br/>
              <input type="text" id="createTitle" name="createTitle" onChange={handleTitle}  /><br/>
              <label for="createDESCRIPTION">DESCRIPTION</label><br/>
              <textarea  id="createDESCRIPTION" name="createDESCRIPTION" onChange={handledesrc}   /><br/>
              <label for="ImageFile">
              <input type="file" id="ImageFile" name="ImageFile" onChange={handleimgsrc} />
              </label>
              <div className="createimg">
              {
                createimg (file)
              }
              </div>
          </form>
          </div>
  )
}
  /* functions for App app */
  function your_article(){
    if(name!=="AnonymousUser"){
      return  <li><Link to = "/yourarticle">
        <button onClick = {notcreate} >
            Your Articles
        </button>
        </Link></li>
    }
  }
  function write(){
      if(name!=="AnonymousUser"){
      return <li><Link to = {link}>
        <button onClick={btnName} form="my-form" herf={link}>
            {btn}
        </button> 
        </Link></li>  
    }
  }
  function changehappen(value){
    Setchange(false);
  }
  function showname(){
    if(name==="AnonymousUser"){
      return ""
    }
    return name
  }
  function check(){
      if(name === "AnonymousUser"){
         Setlogtext("login");
      }
      else{
        Setlogtext("logout");
      }
  }
  useEffect(() => {
      check()
  }, [name]);
  return (
    <div className="App">
      <ul className='header'>
        <Link to = ""><li><h2>Greetings {showname()}</h2></li></Link>
        <li>
        <button onClick={log}>
            {logtext}
        </button>
        </li>
        {
          your_article()
        }
        {
          write()
        }
        <li><Link to = "">
        <button onClick = {notcreate}>
            Home
        </button> 
        </Link></li>  
      </ul>
      <Routes>
          <Route path="" element={ <Home currentid = {currentid} ApiData={ApiData} parentcolor = {changehappen} FullPostUrl={FullPostUrl} CurrentUrl = {CurrentUrl}/> }  />  
          <Route path="/create"element={ <Create username={name}/> }  />
          <Route path="/yourarticle"element={ <YourArticle ApiData={ApiData} passchange = {changehappen}  username={name} FullPostUrl={FullPostUrl} CurrentUrl = {CurrentUrl}/> }  />
          <Route path="/editpages/:id"element={<Edit  passchange = {changehappen} ApiData={ApiData} FullPostUrl={FullPostUrl} CurrentUrl = {CurrentUrl}/>} />
          <Route path="/pages/:id" element={<Fullpost ApiData={ApiData} FullPostUrl={FullPostUrl} parentcolor = {changehappen} CurrentUrl = {CurrentUrl}/>} />
          <Route path='/*' element={<ErrorPage/>} />
      </Routes>
    </div>
  )
}

export default App;
