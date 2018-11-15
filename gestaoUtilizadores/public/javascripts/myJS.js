$(() => {
    
    $("#listUsers").click(e => {
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:4009/api/user",
            success: result => $("#result").append("<p>" + JSON.stringify(result) + "</p>"),
            error: e => $("#result").append("<p>Erro: " + e + "</p>")
        })
    })

    $("#createUser").click(e => {
        e.preventDefault()
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({name: $("#nameC").val(), email: $("#emailC").val(), password: $("#passwordC").val()}),
            url: "http://localhost:4009/user",
            success: result => $("#result").append("<p>" + JSON.stringify(result) + "</p>"),
            error: e => $("#result").append("<p>Erro: " + e + "</p>")
        })
    })
    
    $("#listUser").click(e => {
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:4009/api/user/" + $("#idI").val(),
            success: result => $("#result").append("<p>" + JSON.stringify(result) + "</p>"),
            error: e => $("#result").append("<p>Erro: " + e + "</p>")
        })
    })   
    
    $("#updateUser").click(e => {
        e.preventDefault()
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({name: $("#nameU").val(), email: $("#emailU").val(), password: $("#passwordU").val()}),
            url: "http://localhost:4009/user/" + $("#idU").val(),
            success: result => $("#result").append("<p>" + JSON.stringify(result) + "</p>"),
            error: e => $("#result").append("<p>Erro: " + e + "</p>")
        })
    })
})
