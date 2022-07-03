import React,{ useState,useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import YourArticle from './Pages/YourArticle';
import Fullpost from './Pages/Fullpost';
import Edit from './Pages/Edit';
import ErrorPage from './Pages/ErrorPage';
import axios from 'axios';
import Create from'./Pages/Create'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
function App() {
    /* Constant and variable */
    useEffect(() => {
      document.title = "CricShard"
    }, []);
    const [ApiData,SetApiData] = useState([]);
    const [change,Setchange] = useState([false]);
    const [currentid,Setcurrentid] = useState([]);
    const [name,Setname] = useState("");
    const CurrentUrl = "http://127.0.0.1:8000/";
    const CurrentUserUrl = CurrentUrl +"current/";
    const FullPostUrl = CurrentUrl + "allpost/";
    let data ;
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
    /* function handleSubmit(e){
        data.username = name;
        axios.post(FullPostUrl, {
              data
            })
            .catch((err) => {});
        console.log(change);
        Setchange(false);
    }; */
  /* create app 
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
}*/
  /* functions for App app */
  function changehappen(value){
    Setchange(false);
  }
  function changebutton(value){
    Setchange(false);

  }
  return (
    <div className="App">
      <Header CurrentUrl = {CurrentUrl} name = {name}/>
      <Routes>
          <Route path="" element={ <Home currentid = {currentid} ApiData={ApiData} parentcolor = {changehappen} FullPostUrl={FullPostUrl} CurrentUrl = {CurrentUrl}/> }  />  
          <Route path="/create"element={ <Create CurrentUrl = {CurrentUrl} passchange = {changebutton} username = {name} /> }  />
          <Route path="/yourarticle"element={ <YourArticle ApiData={ApiData} passchange = {changehappen}  username={name} FullPostUrl={FullPostUrl} CurrentUrl = {CurrentUrl}/> }  />
          <Route path="/editpages/:id"element={<Edit  passchange = {changehappen} ApiData={ApiData} FullPostUrl={FullPostUrl} CurrentUrl = {CurrentUrl}/>} />
          <Route path="/pages/:id" element={<Fullpost ApiData={ApiData} FullPostUrl={FullPostUrl} parentcolor = {changehappen} CurrentUrl = {CurrentUrl}/>} />
          <Route path='/*' element={<ErrorPage/>} />
      </Routes>
    </div>
  )
}

export default App;
