"use strict";
const express = require("express");  
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 4000;
app.get("/photos", async(req, res) => {  
  var dbx = require('mg-dbx').dbx;
  var db = new dbx();
  var open = db.open({ type: "YottaDB", host: "yottadb", tcp_port: 7041, });
  var photos = db.mglobal("PHOTOS");
  var result=photos.get(0)
  if (result == "") { 
     const { data } =await axios.get("https://jsonplaceholder.typicode.com/photos");
     let i=0;
     let cnt=0;
     const data1=JSON.stringify(data);
     console.log("Writing to YottaDB");
     db.function("RUN^yottacache", 30, "^PHOTOS");
     for (i=0; i <= data1.length; i=i+4000 ) {
        photos.set(cnt,data1.substring(i,i+4000));
        cnt=cnt+1;
     }
     res.json(data)
  } 
  else {
     console.log("Reading from YottaDB");
     var key = "";
     var data2=""
     while ((key = photos.next(key)) != "") {
        data2 = data2 + photos.get(key);
     }
     console.log(data2)
     var data3 = JSON.parse(data2);
     res.json(data3)
  }
  db.close();
});
app.get("/comments", async(req, res) => {
  var dbx = require('mg-dbx').dbx;
  var db = new dbx();
  var open = db.open({ type: "YottaDB", host: "yottadb", tcp_port: 7041, });
  var comments = db.mglobal("COMMENTS");
  var result=comments.get(0)
  if (result == "") {
     let i=0;
     let cnt=0;
     const { data } =await axios.get("https://jsonplaceholder.typicode.com/comments");
     const data1=JSON.stringify(data);
     console.log("Writing to YottaDB");
     db.function("RUN^yottacache", 30, "^COMMENTS");
     for (i=0; i <= data1.length; i=i+4000 ) {
        comments.set(cnt,data1.substring(i,i+4000));
        cnt=cnt+1;
     }
     res.json(data)
  }
  else {
     console.log("Reading from YottaDB");
     var key = "";
     var data2=""
     while ((key = comments.next(key)) != "") {
        data2 = data2 + comments.get(key);
     }
     console.log(data2)
     var data3 = JSON.parse(data2);
     res.json(data3)
  }
  db.close();

});
app.get("/reddit", async(req, res) => {
  var dbx = require('mg-dbx').dbx;
  var db = new dbx();
  var open = db.open({ type: "YottaDB", host: "yottadb", tcp_port: 7041, });
  var reddit = db.mglobal("REDDIT");
  var result=reddit.get(0)
   let i=0;
   let cnt=0;
   var result=reddit.get(0)
   if (result == "") {
     const { data } =await axios.get("https://www.reddit.com/r/Wallstreetbets/top.json?limit=10000&t=year");
     let i=0;
     let cnt=0;
     const data1=JSON.stringify(data);
     console.log("Writing to YottaDB");
     db.function("RUN^yottacache", 30, "^REDDIT");
     for (i=0; i <= data1.length; i=i+4000 ) {
        reddit.set(cnt,data1.substring(i,i+4000));
        cnt=cnt+1;
     }
     res.json(data)
  }
  else {
     console.log("Reading from YottaDB");
     var key = "";
     var data2=""
     while ((key = reddit.next(key)) != "") {
        data2 = data2 + reddit.get(key);
     }
     console.log(data2)
     var data3 = JSON.parse(data2);
     res.json(data3)
  }
  db.close();

});

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
