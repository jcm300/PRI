var express = require("express")
var pug = require("pug")
var http = require("http")
var fs = require("fs")
var jsonfile = require("jsonfile")
var formidable = require("formidable")
var fsExtra = require("fs.extra")

var app = express()

regExpUp = /\/uploaded\//

app.all("*",(req,res,next)=>{
    if(req.url != "/w3.css" && !regExpUp.test(req.url)) res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
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

app.get("/uploaded/*",(req,res)=>{
    jsonfile.readFile("data/data.json",(erro,dados)=>{
        if(!erro){
            var filepath = "." + req.url
            var type = dados.find(e => e.path==filepath).type
            res.writeHead(200,{"Content-Type": type})
            fs.readFile(filepath, (erro2,dados)=>{
                if(!erro2) res.write(dados)
                else res.write(pug.renderFile("views/erro.pug",{e:erro2}))
                res.end()
            })
        }else{
            res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
            res.write(pug.renderFile("views.erro.pug", {e:erro}))
            res.end()
        }
    })
})

app.post("/processaForm",(req,res)=>{
    var form = new formidable.IncomingForm()

    form.parse(req, (erro, fields, files)=>{
        if(!erro){
            var fenviado = files.ficheiro.path
            var fnovo = "./uploaded/" + files.ficheiro.name
            
            fsExtra.move(fenviado,fnovo, erro2 => {
                if(!erro2){
                    jsonfile.readFile("data/data.json",(erro3,dados)=>{
                        if(!erro3){
                            var fich = {nome: files.ficheiro.name,
                                        path: fnovo,
                                        desc: fields.desc,
                                        type: files.ficheiro.type}
                            dados.push(fich)
                            jsonfile.writeFile("data/data.json", dados, erro4 =>{
                                if(!erro4){
                                    res.write(pug.renderFile("views/index.pug", {ficheiros: dados}))
                                    res.end()
                                }else{
                                    res.write(pug.renderFile("views/erro.pug", {e:erro4}))
                                    res.end()
                                }
                            })
                        }else{
                            res.write(pug.renderFile("views/erro.pug", {e:erro3}))
                            res.end()
                        }
                    })
                }else{
                    res.write(pug.renderFile("views/erro.pug", {e:erro2}))
                    res.end()
                }
            })
        }else{
            res.write(pug.renderFile("views.erro.pug", {e:erro}))
            res.end()
        }
    })
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
