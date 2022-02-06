let seuVotoPara = document.querySelector('.div-1-1 span');
let cargo = document.querySelector('.div-1-2 span');
let descricao = document.querySelector('.div-1-4');
let aviso = document.querySelector('.div-2');
let lateral = document.querySelector('.div-1-right');
let numeros = document.querySelector('.div-1-3');

let etapaAtual =0;
let numeroDigitado ='';
let votobranco = true;
let votos = [];


function comecarEtapas(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numeroDigitado = '';
    votobranco = false;

    for(let i=0; i<etapa.numeros; i++){
        if(i ===0 ){
            numeroHtml = '<div class="num pisca"></div>'
        }else{
            numeroHtml += '<div class="num"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = '';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaTela(){
    let etapa = etapas[etapaAtual];
    let canditado = etapa.candidatos.filter((item) =>{
        if(item.numero === numeroDigitado){
            return true;
        }else{
            return false;
        }
    });
    if(canditado.length > 0){
        canditado = canditado[0];
        seuVotoPara.style.display = 'block';
        cargo.innerHTML = etapa.titulo;
        descricao.innerHTML = `Nome: ${canditado.nome}<br>Partido: ${canditado.partido}<br>`;
        aviso.style.display = 'block';
       
        

        let fotosHtml = '';
        for(let i in canditado.fotos){
            if(canditado.fotos[i].small){
                fotosHtml += `<div class="div-1-img small"><img src="${canditado.fotos[i].url}" alt="">${canditado.vice} <br> ${canditado.fotos[i].legenda} </div>`
            }else{
                fotosHtml += `<div class="div-1-img"><img src="${canditado.fotos[i].url}" alt="">${canditado.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function Clicou(n){
    let elementoNumero = document.querySelector('.num.pisca');
    if(elementoNumero !== null){
        elementoNumero.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;

        elementoNumero.classList.remove('pisca');
        if(elementoNumero.nextElementSibling !== null){
            elementoNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaTela();
        }
        
    }
}

function Branco(n){
        votobranco =true;
        numeroDigitado = '';
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    
}

function Corrige(){
    comecarEtapas();
}

function Confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votobranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numeroDigitado.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numeroDigitado
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapas();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gg pisca">FIM</div>';
        }
        console.log(votos);
    }
}

comecarEtapas();