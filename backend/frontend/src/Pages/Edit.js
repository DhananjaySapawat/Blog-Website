import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import './Edit.css'
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
function Edit(prop) {
    const navigate = useNavigate();
    const CurrentUrl = prop.CurrentUrl;
    const FullPostUrl= prop.FullPostUrl;
    const { id } = useParams();
    const EditArticleData = prop.ApiData.find(EditArticleData => EditArticleData.id === parseInt(id));
    const TitleRef = React.useRef();
    const DescrptionRef = React.useRef();
    const ImageRef = React.useRef();
    const [imgsrcc,Setimgsrcc] =  useState("");
    let data = {
        "type" : "edit",
        "id" : 1,
        "article_title": "",
        "description": "",
        "username": "",
        "article_image": "",
        "company": "",
        "date": ""
    }
    const handleimgsrc = (e) =>{
        e.preventDefault()
        Setimgsrcc((e.target.value).substr(12));
    };
  function EdithandleSubmit(e){
        e.preventDefault(); 
        data.id = EditArticleData.id;
        data.article_title = TitleRef.current.value;
        data.description = DescrptionRef.current.value;
        data.article_image = (ImageRef.current.value).substr(12);
        data.company = EditArticleData.company;
        data.username= EditArticleData.username;
        data.date = EditArticleData.date;
        console.log(data);
        axios.post(FullPostUrl, {
              data
            })
            .catch((err) => {});
        prop.passchange(false);
        navigate(-1);
        
    };
    function EditData(editdata){
        useEffect(() => {
            editdata?Setimgsrcc(editdata.article_image) : Setimgsrcc("")
        },[editdata]);
        if(editdata !== null && editdata!== undefined){
            return (
                <form id="my-edit-form" >
                <label for="createEditTitle">TITLE</label><br/>
                <input type="text" id="createEditTitle" name="createEditTitle" ref={TitleRef} defaultValue ={editdata.article_title} /><br/>
                <label for="createEditDESCRIPTION">DESCRIPTION</label><br/>
                <textarea  id="createEditDESCRIPTION" name="createEditDESCRIPTION" ref={DescrptionRef} defaultValue ={editdata.description}  /><br/>
                <input type="file" id="ImageEditFile" name="ImageEditFile" ref={ImageRef} onChange={handleimgsrc}    />
                <button id="SaveChnge" onClick={EdithandleSubmit}>Save Changes</button>
                <div className="editimg">
                <img src= {imgsrcc?CurrentUrl+"media/"+imgsrcc:""} alt="Cheetah!" />
                </div>
            </form>
            )
        }
    }
    return (
        <div className ="myedit">{EditData(EditArticleData)}</div>       
  )
}

export default Edit