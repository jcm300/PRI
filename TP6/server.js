var http = require("http")
var url = require("url")
var fs = require("fs")
var pug = require("pug")
var jsonfile = require("jsonfile")
var {parse} = require("querystring")

var server = http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)

    if(req.method == "GET"){
        if(purl.pathname == "/"){
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write(pug.renderFile("views/index.pug"))
            res.end()
        }else if(purl.pathname == "/w3.css"){
            res.writeHead(200, {"Content-Type":"text/css"})
            fs.readFile("style/w3.css", (erro, dados)=>{
                if(!erro){
                    res.write(dados)
                }else{
                    res.write(pug.renderFile("views/erro.pug",{e:erro}))
                }
                res.end()
            })

        }else if(purl.pathname == "/lista"){
            res.writeHead(200, {"Content-Type":"text/html"})
            jsonfile.readFile("data/data.json", (erro,dados)=>{
                if(!erro){
                    res.write(pug.renderFile("views/lista.pug",{teses:dados}))
                }else{
                    res.write(pug.renderFile("views/erro.pug",{e:erro}))
                }
                res.end()
            })
        }else if(purl.pathname == "/processaForm"){
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write(pug.renderFile("views/recebido.pug",{tese: purl.query}))
            res.end()
        }else if(purl.pathname == "/registo"){
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write(pug.renderFile("views/form.pug"))
            res.end()
        }else{
            res.writeHead(501, {"Content-Type":"text/html;charset=utf-8"})
            var erro = "Erro: " + purl.pathname + " não implementado..."
            res.end(pug.renderFile("views/erro.pug",{e:erro}))       
        }
    }else if(req.method == "POST"){
        if(purl.pathname == "/processaForm"){
            getInfo(req, resultado => {
                jsonfile.readFile("data/data.json",(erro,teses)=>{
                    if(!erro){
                        teses.push(resultado)
                        jsonfile.writeFile("data/data.json", teses, erro2 =>{
                            if(erro2) console.log("Erro: " + erro2)
                        })
                    }else{
                        console.log("Erro: " + erro)
                    }
                })
                res.end(pug.renderFile("views/recebido.pug",{tese: resultado}))
            })
        }else{
            res.writeHead(501, {"Content-Type":"text/html;charset=utf-8"})
            var erro = "Erro: " + purl.pathname + " não implementado..."
            res.end(pug.renderFile("views/erro.pug",{e:erro}))
        }
    }else{
        res.writeHead(501, {"Content-Type":"text/html;charset=utf-8"})
        var erro = "Erro: " + req.method + " não suportado..."
        res.end(pug.renderFile("views/erro.pug",{e:erro}))
    }
})

server.listen(4006,()=>{
    console.log("Servidor à escuta na porta 4006...")
})

function getInfo(request, callback){
    const FORM_URLENCODED = "application/x-www-form-urlencoded"

    if(request.headers["content-type"] === FORM_URLENCODED){
        let body = ""
        request.on("data", chunk =>{
            body += chunk.toString()
        })
        request.on("end", ()=>{
            callback(parse(body))
        })
    }else{
        callback(null)
    }
}
