import React,{ useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import './Create.css'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
function Create(props) {
    const navigate = useNavigate();
    const CurrentUrl = props.CurrentUrl;
    const FullPostUrl = CurrentUrl + "allpost/";
    const TitleRef = React.useRef();
    const DescrptionRef = React.useRef();
    const ImageRef = React.useRef();
    var name = props.username;
    let data = {
        "type" : "add",
        "article_title": "",
        "description": "",
        "username": "",
        "article_image": "",
        "company": "python Programming",
        "date": ""
    }
    const [file, setFile] = useState("");
    const handleimgsrc = (e) =>{
        setFile(e.target.value.substr(12));
    };
    function handleSubmit(e){
        e.preventDefault();              
        data.username = name;
        data.article_title = TitleRef.current.value;
        data.description = DescrptionRef.current.value;
        data.article_image = (ImageRef.current.value).substr(12);
        console.log(data)
        axios.post(FullPostUrl, {
              data
            })
            .catch((err) => {});
        props.passchange("yes");
        navigate('/')
    };
    return (
      <div className ="create">
      <form id="my-form">
          <label for="createTitle">TITLE</label><br/>
          <input type="text" id="createTitle"  name="createTitle" ref={TitleRef} /><br/>
          <label for="createDESCRIPTION">DESCRIPTION</label><br/>
          <textarea  id="createDESCRIPTION" name="createDESCRIPTION" ref={DescrptionRef} /><br/>
          <label for="ImageFile">
          <input type="file" id="ImageFile" name="ImageFile" ref={ImageRef} onChange={handleimgsrc} />
          <div className="createimg">
          {file ?<img className = "createpreview" src= {CurrentUrl + "media/"+file} alt="Cheetah!" />:" "}
          <button onClick={handleSubmit}>Publish</button>
          </div>
          </label>     
      </form>
      </div>
)
}
export default Create