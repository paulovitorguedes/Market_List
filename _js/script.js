var lista_itens = Array();
var valor = '';

function adicionarGrupo() {
    var grupo = document.getElementById("name").value.toUpperCase().trim();

    var achou = false;
    for (let i = 0; i < lista_itens.length; i++) {
        if (lista_itens[i] == grupo) {
            achou = true;
        } 
    }
    if (achou) {
        alert("valor existe");
    } else {
        if (grupo != "") {
            valor += "<div id='container1'><div id='namegroup1' class='group'><span id='spangroup1'>" + grupo + "</span></div><p id='itens1'></p><div class='form-inline'><input type='text' id='proxitem1' class='form-control mt-1' placeholder='Próximo Item'><a href='#' onclick='adicionarItens(" + "1" + ")'><i class='fa-solid fa-circle-up fa-lg ml-2'></i></a></div></div>";

            document.getElementById('section').innerHTML = valor;
            document.getElementById("name").value = "";

            lista_itens.push(grupo);
        }
    }
}

function adicionarItens(id) {
    // var namegroup = document.getElementById("spangroup" + id).innerHTML;
    // var nameitem = document.getElementById("proxitem" + id).value;
    // console.log(lista_itens.indexOf(namegroup));
    // if (lista_itens.indexOf(namegroup) < 0) {
    //     lista_itens[namegroup] = Array();
    //     console.log("entrou");
    // }
    // lista_itens[namegroup].push(nameitem);


    // // document.getElementById("itens" + id).innerHTML = lista_itens[namegroup];
    // console.log(lista_itens[namegroup]);

}