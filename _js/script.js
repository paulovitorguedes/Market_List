// lista_grupo : contem o nome do grupo
// lista_container_grupo : contem os elementos HTML para criação dos grupos sem os itens
// lista_container_iten: contem os elementos HTML para criação dos itens em seus respectivos grupos

// Cada grupo criado receberá um indice no array (1º grupo = recebe 0, 2º grupo recebe 1 ...), esse indice será o mesmo das nomenclaturas dos ids HTML
// Na remoção de um grupo, o indice receberá vazio, não sendo apagado para não perder a sequencia de numeração da criação dos grupos

var lista_grupo = Array();
var lista_container_grupo = Array();
var lista_container_itens = Array();
var valor_htm = "";
var item_html = "";
var countgrupo = 0;

//console.log(document.getElementById(lista_container_itens[-1]));

// Função para adição de grupos
function adicionarGrupo() {
    console.log("Adicionar Grupo");
    // recupera o nome do grupo no input 
    var grupo = document.getElementById("name").value.toUpperCase().trim();

    // verifica de o valor digitado já existe no array
    var achou = false;
    for (let i = 0; i < lista_grupo.length; i++) {
        if (lista_grupo[i] == grupo) {
            achou = true;
            break;
        }
    }

    // se o valor digitado foi encontrado no array, exibe um alert com valor existe
    if (achou) {
        alert("Grupo já encontra-se na lista");

    } else {
        // se não existir o valor digitado no array, verifica se o campo está vazio
        if (grupo != "") {
            console.log("Valor Adicionado: " + grupo);
            // se o valor digitado for válido
            // variável valor_htm vai receber os elementos e atributos HTML para a criação do contener do grupo inserido
            // Cada id de cada elemento vai receber seu valor finalizado com uma numeração para indicação do grupo
            // O grupo será inserido no elemento span com o id spangroup + contador
            valor_htm = "<div id='container" + countgrupo + "'><div id='namegroup" + countgrupo + "'class='group'><span id='spangroup" + countgrupo + "'>" + grupo + "</span><span id='spanum" + countgrupo + "' class='apaga'>" + countgrupo + "</span></div><p id='itens" + countgrupo + "'><ol id='olitens" + countgrupo + "'></ol></p><div class='form-inline'><input type='text' id='proxitem" + countgrupo + "' class='form-control mt-1' placeholder='Próximo Item'><a href='#' onclick='adicionarItens(" + countgrupo + ")'><i class='fa-solid fa-circle-up fa-lg ml-2'></i></a></div></div>";

            // o countgrupo é uma variavel sendo complementada (+1)  em cada grupo criado
            countgrupo++;


            // adiciona o nome do grupo no array
            lista_grupo.push(grupo);

            // adiciona a string com os elementos e atributos HTML no array
            lista_container_grupo.push(valor_htm);

            //Adiciono as tags a atributos HTML à section
            document.getElementById('section').innerHTML += valor_htm;

            // Apaga o valor digitado no campo para adição de grupos
            document.getElementById("name").value = "";
        }
    }
}



// Função para remoção de grupos
function removerGrupo() {
    console.log("Remover Grupo");
    var t = "";
    var achou = false;

    // recupera o nome do grupo no input
    var grupo = document.getElementById("name").value.toUpperCase().trim();

    var num_grupo = -1;

    if (grupo != "") {
        console.log("Valor Digitado: " + grupo);

        // verifica se o grupo inserido existe no array
        for (let i = 0; i < lista_grupo.length; i++) {
            if (lista_grupo[i] == grupo) {
                console.log("valor " + grupo + " indice " + i + " encontrado");
                achou = true;
                num_grupo = i;
                break;
            }
        }

        // verifica se existe itens inseridos no grupo no qual será removido
        //caso exista algum item, a remoção será negada
        if (achou) {
            if (lista_container_itens[num_grupo] == "" || lista_container_itens[num_grupo] == undefined) {
                console.log("Grupo sem itens - iniciar remoção");

                //od indices referente ao grupo acionado recebe o valor vazio
                lista_container_grupo[num_grupo] = "";
                lista_grupo[num_grupo] = "";

                // Remonta os elementos e atributos HTML para a criação do contrner do grupo após a remoção do grupo solicitado
                for (let i = 0; i < lista_container_grupo.length; i++) {
                    if (lista_container_grupo[i] != "") {
                        t += lista_container_grupo[i];
                    }
                }

                document.getElementById('section').innerHTML = t;
                document.getElementById("name").value = "";

                // Remonta os elementos e atributos HTML dos itens de cada grupo após a remoção do grupo solicitado
                for (let i = 0; i < lista_container_itens.length; i++) {
                    if (lista_container_itens[i] != "") {
                        document.getElementById("olitens" + i).innerHTML = lista_container_itens[i];
                    }
                }

            } else {
                alert("Grupo não pode ser removido, pois contém itens");
            }
        } else {
            alert("Valor não existe");
        }
    } else {
        alert("O campo não foi preenchdo corretamente");
    }

}



// Adiciona itens com numeração do indice do grupo como parâmetros 
function adicionarItens(id) {


    // recebe o valor digitado para adicionar itens
    var nameitem = document.getElementById("proxitem" + id).value.toUpperCase().trim();

    //Verifica se o valor digitado for diferente de vazio
    if (nameitem != "") {
        
        // if (lista_container_itens[id].search(">" + nameitem + "<")) {
            
        // }
        
        // verifica se o array lista_container_itens já teve informações inseridas e se essas informações sejam diferentes de vazia.
        // se existir informações no array, adiciona um item concatenando com a anterior
        if (lista_container_itens.length > id && (lista_container_itens[id] != "" || lista_container_itens[id] != undefined)) {
            if (lista_container_itens[id].search(">" + nameitem + "<") >= 0) {
                console.log("O item já encontra-se no grupo selecionado");
                alert("O item já encontra-se no grupo selecionado");
                return false;
            }
            lista_container_itens[id] += '<li>' + nameitem + '<a href=' + '"#"' + 'onclick=' + "'riscarItens(" + '"' + nameitem + '",' + id + ")'" + '><i class="fa-solid fa-check fa-lg ml-2"></i></a><a href="#"' + 'onclick=' + "'apagarItens(" + '"' + nameitem + '",' + id + ")'" + '><i class="fa-solid fa-trash ml-2"></i></a></li>';
            console.log("Adicionar Iten " + nameitem + " para: " + lista_grupo[id]);

        } else {
            console.log("Adicionar Iten " + nameitem + " para: " + lista_grupo[id]);
            lista_container_itens[id] = '<li>' + nameitem + '<a href=' + '"#"' + 'onclick=' + "'riscarItens(" + '"' + nameitem + '",' + id + ")'" + '><i class="fa-solid fa-check fa-lg ml-2"></i></a><a href="#"' + 'onclick=' + "'apagarItens(" + '"' + nameitem + '",' + id + ")'" + '><i class="fa-solid fa-trash ml-2"></i></a></li>';
        }
    } else {
        alert("O campo não foi preenchdo corretamente");
    }

    document.getElementById("olitens" + id).innerHTML = lista_container_itens[id];
    document.getElementById("proxitem" + id).value = "";

}



//Função para remoção de itens
function apagarItens(item, id) {
    console.log("Apagar Item: " + item + " no indice: " + id);

    var item_split = Array();

    // (valor) recebe toda a lista referente ao grupo representado pelo id
    var valor = lista_container_itens[id];

    // cada item sera adicionado em um indice do array item_split
    item_split = valor.split("</li>");

    // Procura o item em cada indice 
    // Exclui o indice encontrado no array
    for (let i = 0; i < item_split.length; i++) {
        if (item_split[i].search(">" + item + "<") >= 0) {
            item_split.splice(i, 1);

            // o split cria o ultimo indice como vazio, o comando abaixo deleta esse indice
            item_split.splice(item_split.length - 1, 1);
            console.log("Remover Item: " + item);
        }
    }

    // Remonta a String com todos os elementos do grupo 
    valor = "";
    for (let i = 0; i < item_split.length; i++) {
        valor += item_split[i] + "</li>";
    }
    lista_container_itens[id] = valor;
    document.getElementById("olitens" + id).innerHTML = valor;
}



// Função para riscar itens
function riscarItens(item, id) {

    // (valor) recebe toda a lista referente ao grupo representado pelo id
    var valor = lista_container_itens[id];

    // cada item será adicionado em um indice do array item_split
    var item_split = valor.split("</li>");

    // Procura o item em cada indice 
    // Altera o indice encontrado no array onde a tag <li> recebe a classe risca
    for (let i = 0; i < item_split.length; i++) {
        if (item_split[i].search(">" + item + "<") >= 0) {
            //Verifica se já existe a classe (risca-item). Se não existe entçao será adicionado, caso exita, será removida
            if (item_split[i].search("risca-item") < 0) {
                item_split[i] = '<li class="risca-item" >' + item + '<a href=' + '"#"' + 'onclick=' + "'riscarItens(" + '"' + item + '",' + id + ")'" + '><i class="fa-solid fa-check fa-lg ml-2"></i></a><a href="#"' + 'onclick=' + "'apagarItens(" + '"' + item + '",' + id + ")'" + '><i class="fa-solid fa-trash ml-2"></i></a>';

                console.log("Riscou item: " + item);

            } else {
                item_split[i] = '<li>' + item + '<a href=' + '"#"' + 'onclick=' + "'riscarItens(" + '"' + item + '",' + id + ")'" + '><i class="fa-solid fa-check fa-lg ml-2"></i></a><a href="#"' + 'onclick=' + "'apagarItens(" + '"' + item + '",' + id + ")'" + '><i class="fa-solid fa-trash ml-2"></i></a>';

                console.log("Retornou item: " + item);
            }
        }
    }

    // Remonta a String com todos os elementos do grupo 
    valor = "";
    for (let i = 0; i < item_split.length; i++) {
        if (item_split[i] != "") {
            valor += item_split[i] + "</li>";
        }
    }
    lista_container_itens[id] = valor;
    document.getElementById("olitens" + id).innerHTML = valor;
}
