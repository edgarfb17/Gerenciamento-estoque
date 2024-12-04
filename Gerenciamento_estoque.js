import entradaDados from 'readline-sync'
let estoque = []
let historico_movimentacoes = []
let saida = false
while(saida ==! true){
    console.log("")
    console.log("***SISTEMA DE GERENCIAMENTO DE ESTOQUE***\n")
    console.log("1- Cadastro de produtos")
    console.log("2- Consulta de produtos")
    console.log("3- Atualização de estoque")
    console.log("4- Relatórios")
    console.log("5- Sair\n")
    let funcao_escolhida = Number(entradaDados.question("Digite a função desejada: "))
    console.log("")

    class Produto{
        constructor(nome,categoria,qtd_estoque,preco,localizacao){
            this.nome = nome;
            this.categoria = categoria;
            this.qtd_estoque = qtd_estoque;
            this.preco = preco;
            this.localizacao = localizacao;
        }
    }
    function Cadastro_produto(){
        console.log("Cadastro de Produtos\n")
        let nome = entradaDados.question("Nome: ")
        let qtd_estoque = Number(entradaDados.question("Quantidade: "))
        let preco = Number(entradaDados.question("Preço: R$"))
        console.log("")
        console.log("1- Eletrodomésticos")
        console.log("2- Estética")
        console.log("3- Informática\n")
        let categoria = ""
        let categoriaProduto = Number(entradaDados.question("Escolha a categoria do seu produto: "))
        console.log("")
        switch(categoriaProduto){
            case 1:
                categoria = "Eletrodomésticos"
                categoriaProduto = "A"
            break;
            case 2:
                categoria = "Estética"
                categoriaProduto = "B"
            break;
            default:
                categoria = "Informática"
                categoriaProduto = "C"  
        }
        let localizacao = categoriaProduto + estoque.length
        estoque.push(new Produto(nome, categoria, qtd_estoque, preco, localizacao))
    }

    function Consulta_estoque(){
        console.log("1- Por nome")
        console.log("2- Por categoria\n")
        entradaDados.question("Qual tipo de consulta você deseja: ") == 1 ? Consulta_nome() : Consulta_categoria() 

        function Consulta_nome(){
            let nome_produto_consulta = entradaDados.question("Qual o nome do produto que você deseja consultar: ")
            console.log("")
            let resultado = estoque.find(({ nome }) => nome == nome_produto_consulta);
            console.log(resultado)
        }
        function Consulta_categoria(){
            console.log("")
            console.log("1- Eletrodomésticos")
            console.log("2- Estética")
            console.log("3- Informática\n")
            let categoriaConsultada = ""
            let categoriaEscolhida = Number(entradaDados.question("Escolha a categoria do produto que deseja consultar: "))
            console.log("")
            switch(categoriaEscolhida){
                case 1:
                    categoriaConsultada = "Eletrodomésticos"
                break;
                case 2:
                    categoriaConsultada = "Estética"
                break;
                default:
                    categoriaConsultada = "Informática"      
            }
            for(let produto of estoque){
                if(produto.categoria == categoriaConsultada){
                    console.log(produto)
                }
            }
        }        
    }

    function Atualizacao_estoque(){
        let produto_escolhido = (entradaDados.question("Digite a localizacao do produto á ser movimentado: "))
        console.log("")
        let produto_movimenta = {}
        for(let produto of estoque){
            if(produto.localizacao == produto_escolhido){
                produto_movimenta = produto
                console.log(produto_movimenta)
                break
            }   
        }
        console.log("1- Entrada")
        console.log("2- Saída\n")
        let operacao = 0
        let tipo_movimento = Number(entradaDados.question("Qual o tipo da movimentação: ")) 
        console.log("")
        let qtd_movimento = Number(entradaDados.question("Qual a quantidade á ser movimentada: "))
        console.log("")
        if(tipo_movimento == 1){
            operacao = produto_movimenta.qtd_estoque + qtd_movimento
            tipo_movimento = "+"
        }
        else{
            operacao = produto_movimenta.qtd_estoque - qtd_movimento
            tipo_movimento = "-"
        }
        produto_movimenta.qtd_estoque = operacao
        historico_movimentacoes.push(produto_movimenta.nome + " " + tipo_movimento + " " + qtd_movimento + "un\n")
        console.log(produto_movimenta)
    }

    function Gera_relatorios(){
        console.log("1- Gerar relatório de estado de estoque")
        console.log("2- Gerar relatório de histórico de movimentações\n")
        entradaDados.question("Escolha o relatório a ser gerado: ") == 1 ? Relatorio_estado_estoque() : console.log(historico_movimentacoes)
        console.log("")
        function Relatorio_estado_estoque(){
            for(let produto of estoque){
                if(produto.qtd_estoque > 50){
                    console.log(produto)
                    console.log("*PRODUTO COM EXCESSO DE ESTOQUE*\n")
                }
                else if(produto.qtd_estoque < 10){
                    console.log(produto)
                    console.log("*PRODUTO COM ESTOQUE BAIXO*\n")
                }
                else{
                    console.log(produto)
                    console.log("*ESTOQUE OK*\n")
                }      
            }
        }
    }
    funcao_escolhida == 1 && Cadastro_produto()
    funcao_escolhida == 2 && Consulta_estoque()
    funcao_escolhida == 3 && Atualizacao_estoque()
    funcao_escolhida == 4 && Gera_relatorios()
    funcao_escolhida == 5 ? saida = true : null

}
