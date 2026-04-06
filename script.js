// ===== POP-UP BOAS-VINDAS =====
const modalBemVindo = document.getElementById('modalBemVindo');
const fecharBemVindo = document.getElementById('fecharBemVindo');
const fecharBemVindoBtn = document.getElementById('fecharBemVindoBtn');

// Abre o pop-up após 1 segundo
setTimeout(() => {
    modalBemVindo.removeAttribute('hidden');
}, 1000);

// Fecha ao clicar no X
fecharBemVindo.addEventListener('click', () => {
    modalBemVindo.setAttribute('hidden', '');
});

// Fecha ao clicar no botão
fecharBemVindoBtn.addEventListener('click', () => {
    modalBemVindo.setAttribute('hidden', '');
});

// Fecha ao clicar fora do pop-up
modalBemVindo.addEventListener('click', (e) => {
    if (e.target === modalBemVindo) {
        modalBemVindo.setAttribute('hidden', '');
    }
});

// Fecha com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalBemVindo.setAttribute('hidden', '');
    }
});


// aqui estão os scripts do site, como o tema claro/escuro, o menu hambúrguer, a sombra da navbar ao 
// rolar, a máscara de telefone e a validação do formulário de encomenda.
//é basicamente o JavaScript localizando os elementos do HTML antes de fazer qualquer coisa com eles, 
// e depois adicionando os comportamentos desejados, como alternar o tema, abrir o menu, validar os 
// campos do formulário, etc.

//  TEMA CLARO / ESCURO

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label',
        theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'
    );
    localStorage.setItem('theme', theme);
}

// Carrega preferência salva ou usa preferência do sistema
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});


//aqui é as definições do menu hambúrguer, onde o JavaScript localiza os elementos do menu e adiciona 
// um evento de clique para alternar a classe "open" no menu, o que faz com que ele apareça ou desapareça
//utilizado para criar um menu responsivo que se adapta a diferentes tamanhos de tela, especialmente em dispositivos móveis.
//  MENU HAMBÚRGUER (DOM)
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

//utilizado para criar um menu responsivo que se adapta a diferentes tamanhos de tela, 
// especialmente em dispositivos móveis.
// Fecha menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});


//aqui detecta quando o usuário rola a página e adiciona uma sombra ao cabeçalho para dar um efeito de profundidade

// NAVBAR — sombra ao rolar
const siteHeader = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        siteHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        siteHeader.style.boxShadow = 'none';
    }
});

//o JavaScript alterando o valor do campo enquanto o usuário digita

// MÁSCARA DE TELEFONE (DOM)
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length <= 2) {
        val = val;
    } else if (val.length <= 7) {
        val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length <= 11) {
        val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else {
        val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7, 11)}`;
    }
    e.target.value = val;
});

// aqui é a validação do formulário, onde o JavaScript verifica se os campos estão preenchidos corretamente 
// antes de permitir o envio do formulário. Ele mostra mensagens de erro específicas para cada campo que não 
// atende aos critérios de validação, como nome com menos de 3 caracteres, e-mail em formato inválido, 
// telefone sem DDD, data de entrega no passado, etc. Se todos os campos estiverem válidos, ele simula 
// o envio do formulário e exibe uma mensagem de sucesso.

// VALIDAÇÃO DO FORMULÁRIO
const form = document.getElementById('formEncomenda');
const btnSubmit = document.getElementById('btnSubmit');
const formSuccess = document.getElementById('formSuccess');


// Helper: mostra erro
function showError(inputId, errId, msg) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    input.classList.add('invalid');
    err.textContent = msg;
    return false;
}


// Helper: limpa erro
function clearError(inputId, errId) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    input.classList.remove('invalid');
    err.textContent = '';
}


// Limpa erro ao digitar
['nome', 'email', 'telefone', 'produto', 'data'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
        el.classList.remove('invalid');
        const errEl = document.getElementById(id + 'Err');
        if (errEl) errEl.textContent = '';
    });
});


// Data mínima = amanhã
const dataInput = document.getElementById('data');
const hoje = new Date();
hoje.setDate(hoje.getDate() + 1);
dataInput.min = hoje.toISOString().split('T')[0];

// Submissão
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;



    //  Validação 1: Nome (mínimo 3 letras, não pode ter números)
    const nome = document.getElementById('nome').value.trim();
    clearError('nome', 'nomeErr');
    if (nome.length < 3) {
        showError('nome', 'nomeErr', 'Por favor, informe seu nome completo (mínimo 3 caracteres).');
        valid = false;
    } else if (/\d/.test(nome)) {
        showError('nome', 'nomeErr', 'O nome não pode conter números.');
        valid = false;
    }

    // Validação 2: E-mail (formato válido)
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    clearError('email', 'emailErr');
    if (!email) {
        showError('email', 'emailErr', 'Informe seu e-mail.');
        valid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'emailErr', 'E-mail inválido. Ex: nome@email.com');
        valid = false;
    }

    // Validação 3: Telefone (mínimo 14 chars com máscara)
    const telefone = document.getElementById('telefone').value.trim();
    clearError('telefone', 'telefoneErr');
    if (telefone.replace(/\D/g, '').length < 10) {
        showError('telefone', 'telefoneErr', 'Informe um telefone válido com DDD. Ex: (11) 90000-0000');
        valid = false;
    }

    //  Validação 4: Produto selecionado
    const produto = document.getElementById('produto').value;
    clearError('produto', 'produtoErr');
    if (!produto) {
        showError('produto', 'produtoErr', 'Selecione um produto.');
        valid = false;
    }

    // Validação 5: Data (deve ser futura)
    const data = document.getElementById('data').value;
    clearError('data', 'dataErr');
    if (!data) {
        showError('data', 'dataErr', 'Informe a data de entrega desejada.');
        valid = false;
    } else {
        const chosen = new Date(data + 'T00:00:00');
        const minDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        if (chosen <= minDate) {
            showError('data', 'dataErr', 'A data de entrega deve ser pelo menos amanhã.');
            valid = false;
        }
    }

    // Validação 6: Checkbox LGPD
    const lgpd = document.getElementById('lgpd');
    const lgpdErr = document.getElementById('lgpdErr');
    lgpd.classList.remove('invalid');
    lgpdErr.textContent = '';
    if (!lgpd.checked) {
        lgpd.classList.add('invalid');
        lgpdErr.textContent = 'Você precisa aceitar o uso dos dados para continuar.';
        valid = false;
    }

    // Se válido: simula envio
    if (valid) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando... ⏳';

        setTimeout(() => {
            form.reset();
            formSuccess.hidden = false;
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Enviar Encomenda 🎂';

            // Esconde success após 6s
            setTimeout(() => {
                formSuccess.hidden = true;
            }, 6000);
        }, 1200);
    } else {
        // Foca no primeiro campo com erro
        const firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
    }
});


// ANIMAÇÃO DE ENTRADA (Intersection Observer)
const animItems = document.querySelectorAll(
    '.highlight-card, .produto-card, .sobre-img-col, .sobre-text-col'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger delay baseado no índice
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

animItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
