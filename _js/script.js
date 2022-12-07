var lista_grupo = Array();
var lista_container_grupo = Array();
var lista_container_itens = Array();
var valor_htm = "";
var item_html = "";
var countgrupo = 1;

// console.log(document.getElementById("spanum1").innerHTML);

function adicionarGrupo() {
    // recupera o nome do grupo no input 
    var grupo = document.getElementById("name").value.toUpperCase().trim();

    // verifica de o valor digitado já existe no array
    var achou = false;
    for (let i = 0; i < lista_grupo.length; i++) {
        if (lista_grupo[i] == grupo) {
            achou = true;
        }
    }

    // se o valor digitado foi encontrado no array, exibe um alert com valor existe
    if (achou) {
        alert("valor existe");

    } else {
        // se nao existir o valor digitado no array, verifica se o campo está vazio
        if (grupo != "") {

            // se o valor digitado for válido
            // valor_htm vai receber os elementos e atributos HTML para a criação do contrner do grupo inserido
            // Para cada id de cada elementos vai receber seu nome numerado iniciando com 1
            // O grupo será inserido no elementos span com o id spangroup + contador
            valor_htm = "<div id='container" + countgrupo + "'><div id='namegroup" + countgrupo + "'class='group'><span id='spangroup" + countgrupo + "'>" + grupo + "</span><span id='spanum" + countgrupo + "' class='apaga'>" + countgrupo + "</span></div><p id='itens" + countgrupo + "'><ol id='olitens" + countgrupo + "'></ol></p><div class='form-inline'><input type='text' id='proxitem" + countgrupo + "' class='form-control mt-1' placeholder='Próximo Item'><a href='#' onclick='adicionarItens(" + countgrupo + ")'><i class='fa-solid fa-circle-up fa-lg ml-2'></i></a></div></div>";
            countgrupo++;

        
            // adiciona o nome do grupo no array
            lista_grupo.push(grupo);

            // adiciona a string com os elementos e atributos HTML no array
            lista_container_grupo.push(valor_htm);

            document.getElementById('section').innerHTML += valor_htm;
            document.getElementById("name").value = "";
        }
    }
}




function removerGrupo() {
    var t = "";
    var achou = false;

    // recupera o nome do grupo no input
    var grupo = document.getElementById("name").value.toUpperCase().trim();


    if (grupo != "") {
        for (let i = 0; i < lista_container_grupo.length; i++) {
            // No array lista_container_grupo contém os elementos e atributos HTML para a criação do contrner do grupo inserido e cada indice referencia-se a um grupo
            // Utilizado o comando search() para realizar uma busca da string ( >nome do grupo<), se a busca for positiva retorna a posição da string, caso contrário retorna -1
            // Caso exista o grupo no array o indice refenrente será apagado
            if (lista_container_grupo[i].toString().search(">" + grupo + "<") >= 0) {
                // lista_container_grupo.splice(i, 1);
                lista_container_grupo[i] = "";
                lista_container_itens[i + 1] = "";
                achou = true;
                break;
            }
        }


        if (achou) {
            // Deleta do Array lista_grupo no nome do grupo caso a busca anterior for positiva
            for (let i = 0; i < lista_grupo.length; i++) {
                if (lista_grupo[i] == grupo) {
                    // lista_grupo.splice(i, 1);
                    lista_grupo[i] = "";
                    break;
                }
            }

            // Remonta os elementos e atributos HTML para a criação do contrner do grupo após a remoção do grupo solicitado
            for (let i = 0; i < lista_container_grupo.length; i++) {
                if(lista_container_grupo[i] != "") {
                    t += lista_container_grupo[i];
                }
            }

            // Remonta os elementos e atributos HTML dos itens de cada grupo após a remoção do grupo solicitado
            for (let i = 0; i < lista_container_itens.length; i++) {
                lista_container_itens[0] = "";
                if(lista_container_itens[i] != "") {
                    let v = lista_container_itens[i];
                    document.getElementById("olitens" + i).innerHTML = v;
                    console.log(document.getElementById("olitens" + i).innerHTML);
                }
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



// Adiciona itens com numeração do id e grupo como parâmetros 
function adicionarItens(id) {
    var nameitem = document.getElementById("proxitem" + id).value.toUpperCase().trim();
    if(lista_container_itens.length > id && lista_container_itens[id] != ""){
        lista_container_itens[id] += "<li>" + nameitem + "<a href='#' onclick='riscarItens(" + nameitem + ")'><i class='fa-solid fa-check fa-lg ml-2'></i></a><a href='#' onclick='apagarItens(" + nameitem + ")'><i class='fa-solid fa-trash ml-2'></i></a></li>";
    } else {
        lista_container_itens[id] = "<li>" + nameitem + "<a href='#' onclick='riscarItens(" + nameitem + ")'><i class='fa-solid fa-check fa-lg ml-2'></i></a><a href='#' onclick='apagarItens(" + nameitem + ")'><i class='fa-solid fa-trash ml-2'></i></a></li>";
    }
    document.getElementById("olitens" + id).innerHTML = lista_container_itens[id];
    document.getElementById("proxitem" + id).value = "";

}