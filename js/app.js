// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verifica o tema salvo no localStorage ao carregar a página
    const checkSavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
        }
    };

    // Executa a verificação inicial
    checkSavedTheme();

    // Adiciona o evento de clique ao botão de toggle
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            // Remove o tema escuro
            body.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            // Ativa o tema escuro
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});
