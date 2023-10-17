const envelope = document.querySelector(".sliderEnvelope");
const menuItens = document.querySelectorAll(".menuItens");

const produtos = [
  {
    id: 1,
    titulo: "Caminha",
    preco: 100,
    cores: [
      {
        code: "black",
        img: "./img/cama.png",
      },
      {
        code: '#FE979A',
        img: "./img/cama2.png",
      },
    ],
  },
  {
    id: 2,
    titulo: "Bola Interativa",
    preco: 120,
    cores: [
      {
        code: "#FE979A",
        img: "./img/brinquedo.png",
      },
      {
        code: "#96CFE0",
        img: "./img/brinquedo2.png",
      },
    ],
  },
  {
    id: 3,
    titulo: "Bag",
    preco: 150,
    cores: [
      {
        code: "black",
        img: "./img/bag.png",
      },
      {
        code: "#FE979A",
        img: "./img/bag2.png",
      },
    ],
  },
  {
    id: 4,
    titulo: "Edredom",
    preco: 159,
    cores: [
      {
        code: "white",
        img: "./img/humano.png",
      },
      {
        code: "#FE979A",
        img: "./img/humano2.png",
      },
    ],
  }
];

let produtoEscolhido = produtos[0];

const produtoImgAtual = document.querySelector(".produtoImg");
const produtoTituloAtual = document.querySelector(".produtoTitulo");
const produtoPrecoAtual = document.querySelector(".produtoPreco");
const produtoCorAtual = document.querySelectorAll(".cor");
const produtoTamanhoAtual = document.querySelectorAll(".tamanho");

menuItens.forEach((item, index) => {
  item.addEventListener("click", () => {
    // muda o slide atual
    envelope.style.transform = `translateX(${-100 * index}vw)`;

    // muda o produto escolhido
    produtoEscolhido = produtos[index];

    //mudar informações do produto atual
    produtoTituloAtual.textContent = produtoEscolhido.titulo;
    produtoPrecoAtual.textContent = "R$" + produtoEscolhido.preco;
    produtoImgAtual.src = produtoEscolhido.cores[0].img;

    // mudar a cor do produto
    produtoCorAtual.forEach((cores, index) => {
      cores.style.backgroundColor = produtoEscolhido.cores[index].code;
    });
  });
});

// mudar imagem pela cor escolhida
produtoCorAtual.forEach((cores, index) => {
  cores.addEventListener("click", () => {
    produtoImgAtual.src = produtoEscolhido.cores[index].img;
  });
});

// mudar cor do tamanho quando for selecionado
produtoTamanhoAtual.forEach((tamanho, index) => {
  tamanho.addEventListener("click", () => {
    produtoTamanhoAtual.forEach((tamanho) => {
      tamanho.style.backgroundColor = "white";
      tamanho.style.color = "black";
    });
    tamanho.style.backgroundColor = "black";
    tamanho.style.color = "white";
  });
});

const produtoBotao = document.querySelector(".produtoBtn");
const pagamento = document.querySelector(".pagamento");
const fechar = document.querySelector(".fechar");

produtoBotao.addEventListener("click", () => {
  pagamento.style.display = "flex";
});

fechar.addEventListener("click", () => {
  pagamento.style.display = "none";
});


document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('checkout-form');
  const finalizarCompraButton = document.getElementById('finalizarCompra');
  const successModal = document.getElementById('success-modal');
  const closeModalButton = document.getElementById('close-modal');

  finalizarCompraButton.addEventListener('click', function (e) {
    e.preventDefault();

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const celularInput = document.getElementById('celular');
    const numeroCartaoInput = document.getElementById('numeroCartao');
    const mesValidadeInput = document.getElementById('mesValidade');
    const anoValidadeInput = document.getElementById('anoValidade');
    const cvvInput = document.getElementById('cvv');
    const cupomInput = document.getElementById('cupom');

    // Função de validação do email
    function validarEmail(email) {
      const re = /^\S+@\S+\.\S+$/;
      return re.test(email);
    }

    // Validação dos campos vazios
    if (nomeInput.value === '' || emailInput.value === '' || celularInput.value === '' ||
      numeroCartaoInput.value === '' || mesValidadeInput.value === '' || anoValidadeInput.value === '' || cvvInput.value === '' || cupomInput.value === '') {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    // Validação do nome (apenas texto)
    if (!/^[a-zA-Z\s]+$/.test(nomeInput.value)) {
      alert('O campo Nome e Sobrenome deve conter apenas letras e espaços.');
      return;
    }

    // Validação do email
    if (!validarEmail(emailInput.value)) {
      alert('O campo Email deve ser um endereço de email válido.');
      return;
    }

    // Validação do celular (apenas números)
    if (!/^\d{10,}$/.test(celularInput.value)) {
      alert('O campo Celular deve conter apenas números e no mínimo 10 dígitos.');
      return;
    }

    // Validação do número do cartão (apenas números)
    if (!/^\d{16}$/.test(numeroCartaoInput.value)) {
      alert('O campo Número do Cartão deve conter exatamente 16 dígitos.');
      return;
    }

    // Validação do mês de validade (01-12)
    const mes = parseInt(mesValidadeInput.value);
    if (mes < 1 || mes > 12 || isNaN(mes) || mesValidadeInput.value.length !== 2 || /^0[1-9]$|1[0-2]$/.test(mesValidadeInput.value) === false) {
      alert('O mês de validade do cartão deve estar no formato MM e deve ser um número entre 01 e 12.');
      return;
    }

    // Validação do ano de validade (4 dígitos)
    const anoAtual = new Date().getFullYear();
    if (parseInt(anoValidadeInput.value) < anoAtual) {
      alert('O ano de validade do cartão deve ser igual ou maior que o ano atual.');
      return;
    }

    // Validação do CVV (3 dígitos)
    if (!/^\d{3}$/.test(cvvInput.value)) {
      alert('O campo CVV deve conter exatamente 3 dígitos numéricos.');
      return;
    }

    // Valiação do cupom
    if (!/^[A-Z0-9]{7}$/.test(cupomInput.value)) {
      alert('O campo de cupom deve conter exatamente 7 caracteres, com apenas letras maiúsculas e números.');
      return;
    }

    // Exibir o modal de sucesso
    successModal.style.display = 'block';
  });

  closeModalButton.addEventListener('click', function () {
    // Fechar o modal de sucesso
    successModal.style.display = 'none';

    // Limpar o formulário
    form.reset();
  });
});