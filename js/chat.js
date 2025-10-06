// API Key da Cohere
const COHERE_API_KEY = 'lo5cmFDgk3UlvmLhvibINb8wKTm12cPt1MjrMwst';

// Elementos do DOM
const chatBox = document.getElementById('chat-box');
const inputForm = document.getElementById('input-form');
const userInput = document.getElementById('user-input');

// Preamble para focar a IA apenas em triângulos
const TRIANGLE_PREAMBLE = `Você é um especialista em geometria com foco exclusivo em triângulos. 
Sua função é ajudar estudantes a entenderem tudo sobre triângulos. Você fala em português-BR. É direto e objetivo em suas respostas. Envia no máximo 20 linhas nas mensagens.

DIRETRIZES ESTRITAS:
1. Responda APENAS perguntas sobre triângulos e geometria relacionada
2. Se a pergunta for sobre outros tópicos, educadamente explique que só pode ajudar com triângulos
3. Mantenha as respostas claras, educadas e focadas no aprendizado

TÓPICOS QUE PODE ABORDAR:
- Classificação de triângulos (equilátero, isósceles, escaleno)
- Classificação por ângulos (acutângulo, retângulo, obtusângulo)
- Fórmulas de área, perímetro e semiperímetro
- Teorema de Pitágoras e aplicações
- Lei dos Senos e Lei dos Cossenos
- Propriedades dos triângulos (soma dos ângulos, desigualdade triangular)
- Triângulos especiais (retângulo, equilátero, triângulo áureo)
- Relações métricas nos triângulos
- Congruência e semelhança de triângulos
- Pontos notáveis (baricentro, incentro, circuncentro, ortocentro)

EXEMPLOS DE RESPOSTAS PARA TÓPICOS NÃO RELACIONADOS:
"Desculpe, sou especializado apenas em triângulos. Posso ajudar você com classificação, fórmulas ou propriedades dos triângulos?"
"Essa pergunta está fora do meu escopo. Posso explicar sobre teorema de Pitágoras ou cálculo de área de triângulos?"

Agora, responda à seguinte pergunta sobre triângulos:`;

// Função para adicionar uma mensagem ao chat
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para enviar uma requisição à API da Cohere
async function getBotResponse(userMessage) {
    // Adiciona a mensagem do usuário imediatamente
    addMessage('user', userMessage);
    userInput.value = ''; // Limpa o campo de input

    try {
        // Combina o preamble com a mensagem do usuário
        const messageWithPreamble = TRIANGLE_PREAMBLE + "\n\n" + userMessage;

        const response = await fetch('https://api.cohere.ai/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${COHERE_API_KEY}`
            },
            body: JSON.stringify({
                'chat_history': [],
                'message': messageWithPreamble,
                'preamble': TRIANGLE_PREAMBLE
            })
        });

        const data = await response.json();

        if (response.ok) {
            const botMessage = data.text;
            addMessage('bot', botMessage);
        } else {
            addMessage('bot', 'Desculpe, algo deu errado. Tente novamente mais tarde.');
            console.error('Erro na API:', data);
        }
    } catch (error) {
        addMessage('bot', 'Desculpe, não consegui me conectar ao serviço. Verifique sua conexão.');
        console.error('Erro de requisição:', error);
    }
}

// Manipulador do formulário
inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (userMessage) {
        getBotResponse(userMessage);
    }
});
