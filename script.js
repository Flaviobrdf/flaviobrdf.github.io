function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    target.scrollIntoView({ behavior: 'smooth' });
}


let lastClickedDiv = null;

function changeLinkColors(clickedDiv) {
    const links = document.querySelectorAll('.full-width-link');

    if (lastClickedDiv && lastClickedDiv !== clickedDiv) {
        const lastLinks = lastClickedDiv.querySelectorAll('.full-width-link');
        lastLinks.forEach(link => {
            link.classList.remove('btn-red');
        });
    }

    lastClickedDiv = clickedDiv;
    const currentLinks = clickedDiv.querySelectorAll('.full-width-link');
    currentLinks.forEach(link => {
        link.classList.add('btn-red');
    });
}





function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function checkEmail() {
    const email = document.getElementById('email').value;
    const nextBtn = document.getElementById('next-btn');

    if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    nextBtn.style.display = 'none';  // Oculta o botão "Próximo"

    if (localStorage.getItem(email)) {
        document.getElementById('login-fields').style.display = 'block';
        document.getElementById('register-fields').style.display = 'none';
    } else {
        document.getElementById('register-fields').style.display = 'block';
        document.getElementById('login-fields').style.display = 'none';
    }
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não correspondem.');
        return;
    }

    const user = {
        email: email,
        password: password
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert('Cadastro realizado com sucesso!');
    window.location.reload();
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('login-password').value;
    const user = JSON.parse(localStorage.getItem(email));

    if (user.password === password) {
        localStorage.setItem('greetingMessage', email);
        localStorage.setItem('isLoggedIn', true);
        alert('Login realizado com sucesso!');
        window.location.href = 'index.html';
    } else {
        alert('Senha incorreta.');
        localStorage.setItem('isLoggedIn', false);
    }
}


window.onload = function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const greetingMessage = localStorage.getItem('greetingMessage');

    if (isLoggedIn === 'true') {
        document.getElementById('logon').textContent = "Olá, " + greetingMessage;
        document.getElementById('entrar-sair').textContent = 'SAIR';
    }
};

document.getElementById('entrar-sair').onclick = function () {

    const elemento = document.getElementById('entrar-sair');
    const texto = elemento.textContent || elemento.innerText;

    if (texto.trim() === 'SAIR') {
        localStorage.setItem('isLoggedIn', false);
        window.location.reload();
    } else {
        window.location.href = 'login.html';
    }
};


document.getElementById('botaoDominio').onclick = function () {

    const dominio = document.getElementById('dominio').value;
    verificarDominio(dominio);
};

function verificarDominio(dominio) {
    const dominiosIndisponiveis = ['www.google.com.br', 'www.facebook.com.br'];
    const dominioDisponivel = !dominiosIndisponiveis.includes(dominio)
    if (dominioDisponivel) {
        alert(`Esse domínio ${dominio} está disponível. Entre em contato conosco e adquira agora mesmo.`)
    } else {
        alert(`Esse domínio ${dominio} não está disponível. Vamos tentar um outro?`)
    }
}


document.getElementById('sSend').onclick = function () {
    const nome = document.getElementById('sNome').value.trim();
    const email = document.getElementById('sEmail').value.trim();
    const texto = document.getElementById('sTexto').value.trim();

    if (!nome || !email || !texto) {
        alert (`Todos os campos precisam ser preenchidos.`);
    } else {
        alert(`Olá, ${nome}. Agradecemos seu interesse. Em breve vamos responder sua mensagem no e-mail informado ${email}.`)
    }

};
