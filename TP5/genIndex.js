var fs = require('fs')

function isNotDirectory(path){
    return !(fs.statSync("data/" + path).isDirectory() || path=="index.json")
}

function createJson(files){
    var string = "{\n\"obras\": [\n"
    
    files.forEach((file)=>{
            var dados = fs.readFileSync("data/" + file)
            var json = JSON.parse(dados)
            string = string + "\n{\"id\": \"" + json._id + "\",\n"
            string = string + "\"titulo\": \"" + json.titulo + "\"\n}\n,"
    })

    string = string.substring(0,string.length-1) + "\n]\n}"
    return string;
}

module.exports = function genIndex(){
    var contents = fs.readdirSync("data")
    var files = contents.filter(isNotDirectory)
    fs.writeFileSync("data/index.json",createJson(files))
}
