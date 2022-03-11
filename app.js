const base = "./base.json"

const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()

function createObj(val1, val2) {
  return {
    en: val1,
    uz: val2,
    ischeck: false
  }
}

getList = function(){
  return JSON.parse(fs.readFileSync("./base.json"))
}

setList = function (list){
  list.sort(function(obj1, obj2) {
    let val = obj1.en < obj2.en ? -1 : obj1.en > obj1.en ? 1 : 0;
    return val;
  })
  fs.writeFileSync(base, JSON.stringify(list))
}

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.get("/",(req, res) => {
  try {
    let list = getList()
    return res.render("main", {list: list ? list : []})
  } catch (e) {
    return res.json({err: e})
  }
})

app.post("/post", (req, res) => {
  try {
    let list =  getList()
    list.push(createObj(req.body.en, req.body.uz))
    setList(list)
    return res.redirect("/")
  } catch (e) {
    return res.json({err: e})
  }
})

app.listen(3000, () => {
  console.log("Server started.")
})