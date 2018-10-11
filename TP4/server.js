var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer((req, res) => {
    var purl = url.parse(req.url, true)

    if(purl.pathname=="/" || purl.pathname=="/index.html") var filePath = "./website/index.html"
    else var filePath = "./website" + purl.pathname + purl.query.id + ".html"

    fs.readFile(filePath, (erro, dados) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        if(!erro)
            res.write(dados)
        else
            res.write(erro + '')

        res.end()
    })

}).listen(4001, () => {
    console.log('Servidor à escuta na porta 4001...')
})
