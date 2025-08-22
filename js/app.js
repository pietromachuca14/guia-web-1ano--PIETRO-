// Gerenciamento de tema
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme){
    if(theme === 'dark'){
        root.setAttribute('data-theme','dark');
        themeToggle.textContent = 'Tema claro';
    } else {
        root.removeAttribute('data-theme');
        themeToggle.textContent = 'Tema escuro';
    }
}

// Carrega preferência
const saved = localStorage.getItem('theme') || 'light';
applyTheme(saved);

themeToggle.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
});

// Busca simples para Tecnologias - se houver página
const searchInput = document.getElementById('search-tech');
if(searchInput){
    searchInput.addEventListener('input', (e)=>{
        const q = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.tech-card');
        let any=false;
        cards.forEach(c=>{
            const text = c.textContent.toLowerCase();
            const show = text.includes(q);
            c.style.display = show ? '' : 'none';
            if(show) any=true;
        });
        if(!any){
            // exibir mensagem de nenhum resultado
            const no = document.getElementById('no-results');
            if(no) no.style.display = '';
        } else {
            const no = document.getElementById('no-results');
            if(no) no.style.display = 'none';
        }
    });
}

// Modal genérico
const modal = document.getElementById('modal');
if(modal){
    modal.addEventListener('click', (e)=>{
        if(e.target===modal || e.target.classList.contains('modal-close')){
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden','true');
        }
    });
    document.addEventListener('keydown', (e)=>{
        if(e.key==='Escape' && modal.classList.contains('open')){
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden','true');
        }
    });
}

// Função auxiliar CSV export
function exportCSV(filename, rows){
    const csv = rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

// Favoritos para tecnologia
function toggleFavorite(id){
    const favs = JSON.parse(localStorage.getItem('favs')||'[]');
    const idx = favs.indexOf(id);
    if(idx===-1) favs.push(id); else favs.splice(idx,1);
    localStorage.setItem('favs', JSON.stringify(favs));
    updateFavUI(id);
}
function updateFavUI(id){
    const btn = document.querySelector('[data-fav="'+id+'"]');
    const favs = JSON.parse(localStorage.getItem('favs')||'[]');
    if(!btn) return;
    if(favs.includes(id)) btn.classList.add('is-fav'); else btn.classList.remove('is-fav');
}

// Inicializar favoritos
document.querySelectorAll('[data-fav]').forEach(el=>{
    const id = el.getAttribute('data-fav');
    updateFavUI(id);
    el.addEventListener('click', ()=> toggleFavorite(id));
});

// atalhos: '/' para focar busca, Alt+M para menu
document.addEventListener('keydown', (e)=>{
    if(e.key==='/' && document.activeElement.tagName !== 'INPUT'){
        const el = document.getElementById('search-tech');
        if(el){ e.preventDefault(); el.focus(); }
    }
    if(e.altKey && (e.key.toLowerCase()==='m')){
        const nav = document.querySelector('nav ul');
        if(nav){ nav.querySelector('a')?.focus(); }
    }
});
