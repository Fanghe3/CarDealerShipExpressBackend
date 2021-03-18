const express = require("express");
const app = express();
const fs = require("fs");

const port = 3000;

app.use(express.json());

const store = {};
 

app.get("/", (req, res) => {
  res.send("Hello Fang");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/", (req, res) => {
 var data = fs.readFileSync("./server/test.json");
  var myData = JSON.parse(data);
  let count = data.count + 1;
   myData.push({ id: myData.length +1 , ...req.body });
  let newData = JSON.stringify(myData, null, 2);
  fs.writeFileSync("./server/test.json", newData);
  res.status(200).send("store")  ;
})


app.post("/1", (req, res) => {
  count++;
  store[`${count}`] = req.body;
  res.send(200, store); // res.send(200, [store]);
});

/* app.put("/:id", (req, res) => {
  const { id } = req.parems;
  if (store.hasOwnProperty(id)) {
    store[id] = req.body;
    res.send(`updated ${id}`);
  } else {
    res.send(`can not find ${id}`);
  }
}); */

/* app.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (store.hasOwnProperty(id)) {
    delete store[id];
    console.log(" store del", store);
    res.send(`Delete ${id}`);
  } else {
    res.send(`can not find  ${id}`);
  }
}); */


app.put("/:id", (request, response) => {
  const { id } = request.params ;
  
  const existingJsonData = JSON.parse(fs.readFileSync("./server/test.json"));
  
  let Found = false;

  existingJsonData.forEach((element, index) => {
     
    if (Found == false && element.hasOwnProperty("id") && element["id"] == id) {
        Found = true;  
        element = { ...element, ...request.body};        
        existingJsonData[index] = element; 

        let newData = JSON.stringify(existingJsonData, null, 2);
        fs.writeFileSync("./server/test.json", newData);        
    } 
  });
        
   if (Found)
    response.status("200").send("undated item for id");
    else  response.status("400").send("not found this id");

});


app.delete("/:id", (request, response) => {
  const { id } = request.params;

  const existingJsonData = JSON.parse(fs.readFileSync("./server/test.json"));

  let Found = false;

  existingJsonData.forEach((element, index) => {
    if (Found == false && element.hasOwnProperty("id") && element["id"] == id) {
      Found = true;
       
      existingJsonData.splice(index, 1);     
     let newData = JSON.stringify(existingJsonData, null, 2);
     
     fs.writeFileSync("./server/test.json", newData);
    }
  });

  if (Found) response.status("200").send("Deleted item for id");
  else response.status("400").send("not found this id");
});



