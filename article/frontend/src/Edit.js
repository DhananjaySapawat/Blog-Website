import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import './Edit.css'
import axios from 'axios';
import {Link } from "react-router-dom";
function Edit(prop) {
    const { id } = useParams();
    const EditArticleData = prop.ApiData.find(EditArticleData => EditArticleData.id === parseInt(id));
    var Title = "";
    var descr = "";
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
    /* importing images */
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
     }
    const images = importAll(require.context('./photos', false, /\.(png|jpe?g|svg|jfif|webp)$/));
    const handleTitle = (e) => {
        e.preventDefault()
        Title = e.target.value;
    };
    const handledesrc = (e) =>{
        e.preventDefault()
        descr = e.target.value;
    };
    const handleimgsrc = (e) =>{
        e.preventDefault()
        Setimgsrcc((e.target.value).substr(12));
    };
    function createimg (img) {
            if(img!==""){
                return <img src= {images[img]}
                        alt="Cheetah!" />
            }
        }
  function EdithandleSubmit(e){
        data.id = EditArticleData.id;
        data.article_title = Title;
        data.description = descr;
        data.article_image = imgsrcc;
        data.company = EditArticleData.company;
        data.username= EditArticleData.username;
        data.date = EditArticleData.date;
        const url = "http://localhost:8000/allpost/";
        axios.post(url, {
              data
            })
            .catch((err) => {});
        prop.passchange(false);
        
    };
    function EditData(editdata){
        useEffect(() => {
            if(editdata!=null || editdata!= undefined){
                Setimgsrcc(editdata.article_image);
            }
        },[editdata]);
        if(editdata != null){
            Title = editdata.article_title;
            descr = editdata.description;
            return (
                <form id="my-edit-form" >
                <label for="createEditTitle">TITLE</label><br/>
                <input type="text" id="createEditTitle" name="createEditTitle" onChange={handleTitle}  defaultValue ={editdata.article_title} /><br/>
                <label for="createEditDESCRIPTION">DESCRIPTION</label><br/>
                <textarea  id="createEditDESCRIPTION" name="createEditDESCRIPTION" onChange={handledesrc}   defaultValue ={editdata.description}  /><br/>
                <input type="file" id="ImageEditFile" name="ImageEditFile"  onChange={handleimgsrc}    />
                <Link to ='/yourarticle'><button onClick={EdithandleSubmit}>Save Changes</button></Link>
                <div className="editimg">
                {
                    createimg(imgsrcc)
                }
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