var lista_grupo = Array();
var lista_container = Array();
var lista_itens = Array();
var valor_htm = '';
var countgrupo = 1;

function adicionarGrupo() {
    var grupo = document.getElementById("name").value.toUpperCase().trim();

    var achou = false;
    for (let i = 0; i < lista_grupo.length; i++) {
        if (lista_grupo[i] == grupo) {
            achou = true;
        }
    }
    if (achou) {
        alert("valor existe");
    } else {
        if (grupo != "") {
            valor_htm = "<div id='container" + countgrupo + "'><div id='namegroup" + countgrupo + "'class='group'><span id='spangroup" + countgrupo + "'>" + grupo + "</span></div><p id='itens" + countgrupo + "'></p><div class='form-inline'><input type='text' id='proxitem" + countgrupo + "' class='form-control mt-1' placeholder='Próximo Item'><a href='#' onclick='adicionarItens(" + countgrupo + ")'><i class='fa-solid fa-circle-up fa-lg ml-2'></i></a></div></div>";
            countgrupo++;

            lista_grupo.push(grupo);
            lista_container.push(valor_htm);

            document.getElementById('section').innerHTML += valor_htm;
            document.getElementById("name").value = "";


        }
    }
}

function removerGrupo() {
    var grupo = document.getElementById("name").value.toUpperCase().trim();
    var t = '';
    var achou = false;
    if (grupo != "") {
        for (let i = 0; i < lista_container.length; i++) {
            if (lista_container[i].toString().search(">" + grupo + "<") >= 0) {
                lista_container.splice(i, 1);
                achou = true;
                break;
            }
        }
        for (let i = 0; i < lista_grupo.length; i++) {
            if(lista_grupo[i] == grupo) {
                lista_grupo.splice(i, 1);
                break;
            }
        }
        if (achou) {
            for (let i = 0; i < lista_container.length; i++) {
                t += lista_container[i];
            }
            document.getElementById('section').innerHTML = t;
            document.getElementById("name").value = "";
        } else {
            alert("valor não existe");
        }
    } else {
        alert("valor não existe");
    }

}

function adicionarItens(id) {
    var nameitem = document.getElementById("proxitem" + id).value.toUpperCase().trim();
    
    lista_itens.push(nameitem);

}