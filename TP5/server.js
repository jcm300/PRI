var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var genIndex = require('./genIndex')

var style = /w3\.css/
var index = /index/
var obra = /obra\/m[0-9]+/

genIndex()

http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)
    
    if(index.test(purl.pathname)){
        res.writeHead(200, {'Content-Type':'text/html'})

        fs.readFile('data/index.json',(erro,dados)=>{
            if(!erro){
                res.write(pug.renderFile('views/index.pug', {ind: JSON.parse(dados)}))
            }else{
                res.write('<p><b>ERRO: </b> ' + erro + '</p>')
            }
            res.end()
        })
    }else if(style.test(purl.pathname)){
        res.writeHead(200, {'Content-Type':'text/css'})
        
        fs.readFile('style/w3.css',(erro,dados)=>{
            if(!erro){
                res.write(dados)
            }else{
                res.write('<p><b>ERRO: </b> ' + erro + '</p>')
            }
            res.end()
        })
    }else if(obra.test(purl.pathname)){
        var file = purl.pathname.split('/')[2] + '.json'

        res.writeHead(200, {'Content-Type':'text/html'})

        fs.readFile('data/' + file, (erro,dados)=>{
            if(!erro){
                res.write(pug.renderFile('views/template.pug', {obra: JSON.parse(dados)}))
            }else{
                res.write('<p><b>ERRO: </b> ' + erro + '</p>')
            }
            res.end()
        })
    }else{
        res.writeHead(200, {'Content-Type':'text/html'})
        res.write('<p><b>ERRO:</b> ' + purl.pathname + '</p>')
        res.write('<p><b>Rota desconhecida!!!</b></p>')
        res.end()
    }

}).listen(6001,()=>{
    console.log('Servidor à escuta na porta 6001.....')
})
