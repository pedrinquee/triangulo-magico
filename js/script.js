// Navegação mobile
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Sistema de autenticação (simulação)
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabButtons = document.querySelectorAll('.tab-button');
    const switchLinks = document.querySelectorAll('.switch-link');

    // Alternar entre login e cadastro
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const tab = this.getAttribute('data-tab');

                // Atualizar botões ativos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Mostrar formulário correspondente
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                document.getElementById(`${tab}-form`).classList.add('active');
            });
        });
    }

    // Links para alternar entre formulários
    if (switchLinks.length > 0) {
        switchLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');

                // Atualizar botões ativos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector(`.tab-button[data-tab="${target}"]`).classList.add('active');

                // Mostrar formulário correspondente
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                document.getElementById(`${target}-form`).classList.add('active');
            });
        });
    }

    // Processar formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Simulação de autenticação
            if (email && password) {
                // Salvar dados de usuário (simulação)
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);

                // Redirecionar para o dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Processar formulário de cadastro
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;

            // Validação básica
            if (!name || !email || !password || !confirm) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            if (password !== confirm) {
                alert('As senhas não coincidem.');
                return;
            }

            // Simulação de cadastro
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);

            // Redirecionar para o dashboard
            window.location.href = 'dashboard.html';
        });
    }

    // Verificar se o usuário está logado (no dashboard)
    if (window.location.pathname.includes('dashboard.html')) {
        const isLoggedIn = localStorage.getItem('userLoggedIn');

        if (!isLoggedIn || isLoggedIn !== 'true') {
            // Redirecionar para a página de login se não estiver logado
            window.location.href = 'login.html';
        }

        // Botão de logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();

                // Limpar dados de login
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');

                // Redirecionar para a página inicial
                window.location.href = 'index.html';
            });
        }
    }

    // Sistema de tabs no dashboard
    const contentTabs = document.querySelectorAll('.content-tab');
    const calcTabs = document.querySelectorAll('.calc-tab');

    // Tabs de conteúdo (explicações)
    if (contentTabs.length > 0) {
        contentTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const contentId = this.getAttribute('data-content');

                // Atualizar tabs ativas
                contentTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Mostrar conteúdo correspondente
                document.querySelectorAll('.content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(contentId).classList.add('active');
            });
        });
    }

    // Tabs da calculadora
    if (calcTabs.length > 0) {
        calcTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const calcId = this.getAttribute('data-calc');

                // Atualizar tabs ativas
                calcTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Mostrar calculadora correspondente
                document.querySelectorAll('.calc-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${calcId}-calc`).classList.add('active');
            });
        });
    }

    // Calculadora de área
    const calcularAreaBtn = document.getElementById('calcular-area');
    if (calcularAreaBtn) {
        calcularAreaBtn.addEventListener('click', function () {
            const base = parseFloat(document.getElementById('base').value);
            const altura = parseFloat(document.getElementById('altura').value);

            if (isNaN(base) || isNaN(altura)) {
                alert('Por favor, insira valores válidos para base e altura.');
                return;
            }

            const area = (base * altura) / 2;
            document.getElementById('resultado-area').textContent = area.toFixed(2);
        });
    }

    // Calculadora de perímetro
    const calcularPerimetroBtn = document.getElementById('calcular-perimetro');
    if (calcularPerimetroBtn) {
        calcularPerimetroBtn.addEventListener('click', function () {
            const ladoA = parseFloat(document.getElementById('ladoA').value);
            const ladoB = parseFloat(document.getElementById('ladoB').value);
            const ladoC = parseFloat(document.getElementById('ladoC').value);

            if (isNaN(ladoA) || isNaN(ladoB) || isNaN(ladoC)) {
                alert('Por favor, insira valores válidos para todos os lados.');
                return;
            }

            const perimetro = ladoA + ladoB + ladoC;
            document.getElementById('resultado-perimetro').textContent = perimetro.toFixed(2);
        });
    }

    // Calculadora do teorema de pitágoras
    const calcularPitagorasBtn = document.getElementById('calcular-pitagoras');
    if (calcularPitagorasBtn) {
        calcularPitagorasBtn.addEventListener('click', function () {
            const catetoA = parseFloat(document.getElementById('catetoA').value);
            const catetoB = parseFloat(document.getElementById('catetoB').value);
            const calcHipotenusa = document.getElementById('calc-hipotenusa').checked;

            if (isNaN(catetoA) || isNaN(catetoB)) {
                alert('Por favor, insira valores válidos para os catetos.');
                return;
            }

            let resultado;

            if (calcHipotenusa) {
                // Calcular hipotenusa
                resultado = Math.sqrt(catetoA * catetoA + catetoB * catetoB);
                document.getElementById('resultado-pitagoras').textContent = `Hipotenusa: ${resultado.toFixed(2)}`;
            } else {
                // Calcular cateto (assumindo que catetoA é o cateto conhecido e catetoB é a hipotenusa)
                if (catetoB <= catetoA) {
                    alert('A hipotenusa deve ser maior que o cateto.');
                    return;
                }
                resultado = Math.sqrt(catetoB * catetoB - catetoA * catetoA);
                document.getElementById('resultado-pitagoras').textContent = `Cateto: ${resultado.toFixed(2)}`;
            }
        });
    }

    // Sistema de Quiz
    const startQuizBtn = document.getElementById('start-quiz');
    const nextQuestionBtn = document.getElementById('next-question');
    const restartQuizBtn = document.getElementById('restart-quiz');

    let currentQuestion = 0;
    let score = 0;

    // Perguntas do quiz
    const quizQuestions = [
        {
            question: "Quantos lados tem um triângulo?",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "Qual é a soma dos ângulos internos de um triângulo?",
            options: ["90°", "180°", "270°", "360°"],
            correct: 1
        },
        {
            question: "Qual tipo de triângulo tem todos os lados iguais?",
            options: ["Isósceles", "Escaleno", "Equilátero", "Retângulo"],
            correct: 2
        },
        {
            question: "Qual tipo de triângulo tem um ângulo de 90°?",
            options: ["Acutângulo", "Obtusângulo", "Retângulo", "Equilátero"],
            correct: 2
        },
        {
            question: "Qual é a fórmula para calcular a área de um triângulo?",
            options: ["base × altura", "(base × altura) / 2", "lado²", "π × raio²"],
            correct: 1
        },
        {
            question: "Qual é o nome do triângulo que tem todos os ângulos agudos?",
            options: ["Retângulo", "Obtusângulo", "Acutângulo", "Isósceles"],
            correct: 2
        },
        {
            question: "Qual é o teorema que relaciona os lados de um triângulo retângulo?",
            options: ["Teorema de Tales", "Teorema de Pitágoras", "Lei dos Senos", "Lei dos Cossenos"],
            correct: 1
        },
        {
            question: "Qual tipo de triângulo tem dois lados iguais?",
            options: ["Equilátero", "Isósceles", "Escaleno", "Retângulo"],
            correct: 1
        },
        {
            question: "Qual é a fórmula para calcular o perímetro de um triângulo?",
            options: ["base × altura", "lado¹ + lado² + lado³", "(base × altura) / 2", "lado × 3"],
            correct: 1
        },
        {
            question: "Qual tipo de triângulo tem um ângulo maior que 90°?",
            options: ["Acutângulo", "Retângulo", "Obtusângulo", "Equilátero"],
            correct: 2
        }
    ];

    // Iniciar quiz
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function () {
            document.getElementById('quiz-start').classList.remove('active');
            document.getElementById('quiz-questions').classList.add('active');
            currentQuestion = 0;
            score = 0;
            updateScore();
            showQuestion();
        });
    }

    // Próxima pergunta
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function () {
            // Verificar se uma opção foi selecionada
            const selectedOption = document.querySelector('.option.selected');
            if (!selectedOption) {
                alert('Por favor, selecione uma resposta.');
                return;
            }

            // Verificar se a resposta está correta
            const optionIndex = parseInt(selectedOption.getAttribute('data-index'));
            if (optionIndex === quizQuestions[currentQuestion].correct) {
                score++;
                updateScore();
            }

            // Avançar para a próxima pergunta ou mostrar resultados
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                showQuestion();
            } else {
                showResults();
            }
        });
    }

    // Reiniciar quiz
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', function () {
            document.getElementById('quiz-results').classList.remove('active');
            document.getElementById('quiz-questions').classList.add('active');
            currentQuestion = 0;
            score = 0;
            updateScore();
            showQuestion();
        });
    }

    // Mostrar pergunta atual
    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('current-question').textContent = currentQuestion + 1;
        document.getElementById('total-questions').textContent = quizQuestions.length;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.setAttribute('data-index', index);

            optionElement.addEventListener('click', function () {
                // Remover seleção anterior
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Selecionar esta opção
                this.classList.add('selected');
            });

            optionsContainer.appendChild(optionElement);
        });
    }

    // Atualizar pontuação
    function updateScore() {
        document.getElementById('quiz-score').textContent = score;
    }

    // Mostrar resultados
    function showResults() {
        document.getElementById('quiz-questions').classList.remove('active');
        document.getElementById('quiz-results').classList.add('active');

        document.getElementById('final-score').textContent = score;

        let message;
        if (score >= 9) {
            message = "Excelente! Você domina o assunto sobre triângulos!";
        } else if (score >= 7) {
            message = "Muito bom! Você tem um bom conhecimento sobre triângulos.";
        } else if (score >= 5) {
            message = "Bom! Continue estudando para melhorar seu conhecimento.";
        } else {
            message = "Estude um pouco mais sobre triângulos e tente novamente!";
        }

        document.getElementById('result-message').textContent = message;
    }
});