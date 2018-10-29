var express = require("express")
var pug = require("pug")
var http = require("http")
var fs = require("fs")
var jsonfile = require("jsonfile")

var app = express()

app.all("*",(req,res,next)=>{
    if(req.url != "/w3.css") res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
    next()
})

app.get("/",(req,res)=>{
    jsonfile.readFile("data/data.json", (erro,dados)=>{
        if(!erro) res.write(pug.renderFile("views/index.pug", {ficheiros: dados}))
        else res.write(pug.renderFile("views/erro.pug", {e: erro}))
        res.end()
    })
})

app.get("/w3.css",(req,res)=>{
    res.writeHead(200, {"Content-Type":"text/css"})
    fs.readFile("stylesheet/w3.css",(erro,dados)=>{
        if(!erro) res.write(dados)
        else res.write(pug.renderFile("views/erro.pug",{e: erro}))
        res.end()
    })
})

app.post("/processaForm",(req,res)=>{

})

app.get("*", (req,res)=>{
    res.write(pug.renderFile("views/erro.pug", {e: "Erro: " + req.url + " não implementado..."}))
    res.end()
})

app.post("*", (req,res)=>{
    res.write(pug.renderFile("views/erro.pug", {e: "Erro: " + req.url + " não implementado..."}))
    res.end()
})

http.createServer(app).listen(4007)
