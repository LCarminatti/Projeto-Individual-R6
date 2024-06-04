var formSignin = document.querySelector('#signin')
var formSignup = document.querySelector('#signup')
var btnColor = document.querySelector('.btnColor')

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    formSignin.style.left = "25px"
    formSignup.style.left = "450px"
    btnColor.style.left = "0px"
  })

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    formSignin.style.left = "-450px"
    formSignup.style.left = "25px"
    btnColor.style.left = "110px"
  })


  
var msgErro = document.getElementById("msg_error")
var divErro = document.getElementById("div_error")

function exibirErro() {
  divErro.style.display = 'flex'
  setTimeout(function () {
    divErro.style.display = 'none';
  }, 1500);
}


function cadastrar(event) {
  event.preventDefault();
  var nomeVar = document.getElementById("input_nome").value;
  var emailVar = document.getElementById("input_email").value;
  var senhaVar = document.getElementById("input_senha").value;
  var confirmacaoSenhaVar = document.getElementById("input_senha2").value;

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {
    mensagem = "Preencha todos os campos";
    msgErro.innerHTML = mensagem
    return false;
  } else if (emailVar.indexOf("@") == -1) {
    exibirErro()
    mensagem = "Email inválido!";
    msgErro.innerHTML = mensagem;
    return false;
  } else if (emailVar.indexOf(".") == -1) {
    exibirErro()
    mensagem = "Email inválido!";
    msgErro.innerHTML = mensagem;
    return false;
  } else if (senhaVar.length < 7) {
    exibirErro()
    mensagem = "Senha inválida!";
    msgErro.innerHTML = mensagem;
    return false;
  } else if (confirmacaoSenhaVar != senhaVar) {
    exibirErro()
    mensagem = "Confirmação inválida!";
    msgErro.innerHTML = mensagem;
    return false;
  }

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        alert(
          "Cadastro realizado com sucesso! Redirecionando para tela de Login..."
        );
        setTimeout(() => {
          window.location = "/cadastro-login.html";
        }, 2000);
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function entrar(event) {
  event.preventDefault();
  var emailVar = document.getElementById("email_log").value;
  var senhaVar = document.getElementById("senha_log").value;

  if (emailVar == "" || senhaVar == "") {
    exibirErro()
    mensagem = "Preencha todos os campos";
    msgErro.innerHTML = mensagem
    return false;
  }

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;

          setTimeout(function () {
            window.location = "dashboard/dashboardR6.html";
          }, 2000);
        });
      } else {
        exibirErro()
        mensagem = "Email ou Senha inválidos"
        msgErro.innerHTML = mensagem
        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}

function sumirMensagem() {
  document.getElementById("div_error").style.display = "none";
}