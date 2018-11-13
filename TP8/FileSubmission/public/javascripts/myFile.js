$(() => {
    $("#table").load("http://localhost:4008/table")
    
    $("#sendFile").click(e => {
        e.preventDefault()
        $("#table").append("<tr>\n<td><a href=\"http://localhost:4008/uploaded/"+ $("#files")[0].files[0].name + "\">" + $("#files")[0].files[0].name + "</a></td>\n<td>" + $("#desc").val() + "</td>\n</tr>")
        ajaxPost()
    })

    function ajaxPost(){
        var formData = new FormData()
        formData.append("file",$("#files")[0].files[0])
        formData.append("desc",$("#desc").val())
        $.ajax({
            type: "POST",
            enctype: "form/multipart",
            processData: false,
            contentType: false,
            url: "http://localhost:4008/saveFile",
            data: formData,
            success: n => alert("Ficheiro gravado com sucesso: " + n),
            error: e => {
                alert("Erro no post: " + JSON.stringify(e))
                console.log("ERRO: " + e)
            }
        })
        $("#files").val("")
        $("#desc").val("")
    }
})
