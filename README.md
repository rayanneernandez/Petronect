# Portalnect Intelligence

Protótipo de um painel de comportamento e reengajamento de fornecedores para o Portal de Compras da Petrobras (Petronect) — desenvolvido para o Hackathon Petronect.

> Identifica quem trava na jornada, entende onde e por quê, e aciona o Copiloto de IA para reengajar o fornecedor certo — em vez de depender só de métricas agregadas de pageview.

**Deploy:** https://petronect-seven.vercel.app

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Telas do protótipo](#telas-do-protótipo)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Como rodar localmente](#como-rodar-localmente)
- [Deploy (Vercel)](#deploy-vercel)
- [Segurança e limitações do protótipo](#segurança-e-limitações-do-protótipo)
- [Dados do protótipo](#dados-do-protótipo)

---

## Sobre o projeto

O Portalnect Intelligence acompanha a jornada do fornecedor dentro do Portal de Compras — do primeiro acesso até o envio da proposta — separando tráfego humano de bot/RPA, identificando em qual etapa e por qual motivo cada fornecedor abandona, e usando um Copiloto de IA para priorizar e automatizar o reengajamento (e-mail, WhatsApp ou alerta no CRM).

Um guia completo com o objetivo e uma captura de cada tela está em [`Portalnect-Guia-de-Telas.docx`](./Portalnect-Guia-de-Telas.docx).

## Telas do protótipo

**Site público e autenticação**
| Tela | Objetivo |
|---|---|
| Landing page | Apresentação institucional do produto |
| Login | Autenticação por senha ou código por e-mail |
| Esqueci minha senha | Recuperação de acesso via e-mail |
| Cadastro | Cadastro de novo fornecedor |
| Verificação em duas etapas | Confirmação por código (MFA) |

**Painel interno**
| Tela | Objetivo |
|---|---|
| Visão geral | KPIs consolidados, evolução de acessos, tráfego humano x bot |
| Jornada do fornecedor | Funil de conversão com detalhamento por etapa de abandono |
| Qualidade de tráfego | Filtro de bots/RPA na camada de borda (WAF) |
| Perfis de fornecedor | Ação em lote por categoria de comportamento |
| Copiloto de IA | Fila de reengajamento priorizada por score de necessidade de contato |
| Alertas e ações | Notificações disparadas por padrão de comportamento |
| Comunicação segmentada | Disparo de mensagens por grupo de perfil |
| Arquitetura da solução | Documentação técnica: fases do pipeline, contrato de eventos, mapeamento de riscos (CWE) e stack proposta |
| Configurações | Preferências do sistema e da conta |

## Estrutura do projeto

```
hackathon/
├── portalnect-sistema-completo.html   # Aplicação inteira (HTML + CSS + JS em um único arquivo)
├── assets/
│   ├── logo-petronect.jpg
│   ├── mascote-portalnect.png
│   ├── portalnect-banner.jpg
│   └── portalnect-produto.jpg
├── vercel.json                        # Rewrite de "/" para o HTML principal
└── Portalnect-Guia-de-Telas.docx      # Guia de apresentação de cada tela
```

O protótipo é uma SPA (single page application) client-side: todas as "telas" são `<div>`s que são mostradas/escondidas via JavaScript (não há build step, framework ou backend real). Os gráficos usam [Chart.js](https://www.chartjs.org/) e os ícones vêm do [Font Awesome](https://fontawesome.com/), ambos carregados via CDN.

## Tecnologias

- HTML5, CSS3 e JavaScript puro (vanilla) — sem framework, sem bundler
- [Chart.js 4.4.1](https://www.chartjs.org/) para os gráficos
- [Font Awesome 6.5.1](https://fontawesome.com/) para os ícones
- [Vercel](https://vercel.com/) para hospedagem/deploy estático

## Como rodar localmente

Não precisa de instalação — é um HTML estático. Duas opções:

**1. Abrir direto no navegador**
```
Basta dar duplo clique em portalnect-sistema-completo.html
```

**2. Servir por um servidor local** (recomendado, evita restrições de `file://` em alguns navegadores)
```bash
npx serve .
# ou
python -m http.server 8080
```
depois acesse `http://localhost:8080/portalnect-sistema-completo.html`.

## Deploy (Vercel)

O projeto está conectado ao GitHub (`main` branch) com deploy automático a cada push. O arquivo [`vercel.json`](./vercel.json) redireciona a rota raiz `/` para `portalnect-sistema-completo.html`, já que não existe um `index.html` na raiz:

```json
{
  "rewrites": [
    { "source": "/", "destination": "/portalnect-sistema-completo.html" }
  ]
}
```

## Segurança e limitações do protótipo

Este é um **protótipo estático de front-end**, sem backend, autenticação real ou dados sensíveis — os logins, CNPJs e e-mails exibidos são todos fictícios (ver aviso "Protótipo — Hackathon Petronect" nas próprias telas).

Por ser um site estático, o navegador precisa baixar e executar o HTML/CSS/JS para renderizar a página — por isso **não existe forma de esconder completamente o código-fonte de quem abre o DevTools (F12)**. Isso vale para qualquer site puramente front-end, não só este projeto. O que foi feito para reduzir a exposição casual:

- Bloqueio do menu de clique direito e dos atalhos mais comuns de inspeção (`F12`, `Ctrl+Shift+I/J/C`, `Ctrl+U`);
- Aviso no console alertando sobre o uso indevido de comandos ali digitados.

Essas medidas dificultam o acesso casual, mas **não impedem** alguém com conhecimento técnico de ver o código (via `view-source:`, aba Network, extensões de navegador, etc.). Como não há dado real em jogo neste protótipo, isso não representa risco de segurança — apenas reduz a exposição do código/design para quem só quer "testar por curiosidade".

Se no futuro este produto virar algo real, com dados de fornecedores de verdade, a proteção precisa vir de um **backend** (autenticação de servidor, API com autorização, dados nunca embutidos no HTML) — nenhuma técnica no front-end substitui isso.

## Dados do protótipo

Todos os números, fornecedores, CNPJs, editais e mensagens são simulados para fins de demonstração no hackathon. Nenhum dado real da Petrobras/Petronect é utilizado.

---

Hackathon Petronect · Protótipo de demonstração
