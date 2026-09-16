# Portalnect Intelligence

Protótipo de um painel de comportamento e reengajamento de fornecedores, feito para o Hackathon Petronect.

**Acesse:** https://petronect-seven.vercel.app

---

## Telas

**Site público e login**

- **Landing page** — apresentação do produto para quem ainda não conhece.
- **Login** — entrada no sistema, por senha ou código por e-mail.
- **Esqueci minha senha** — recuperação de acesso pelo e-mail.
- **Cadastro** — cadastro de um novo fornecedor.

**Painel**

- **Visão geral** — resumo do dia: acessos, tráfego humano x bot, editais mais acessados e maiores barreiras.
- **Jornada do fornecedor** — funil mostrando em que etapa cada fornecedor trava e por quê.
- **Jornada do cliente** — a mesma lógica de funil aplicada à experiência do cliente final do fornecedor.
- **Qualidade de tráfego** — separa acesso humano de bot/RPA e mostra os IPs bloqueados.
- **Perfis de fornecedor** — agrupa fornecedores por comportamento e permite agir em lote.

**Ação**

- **Agente de Reengajamento** — fila de reengajamento priorizada por score, com diagnóstico automático de cada caso e nudge de "carrinho abandonado" para retomar uma proposta parada.
- **Alertas e ações** — avisos disparados por comportamento (não por volume de cliques), com atribuição de responsável.
- **Comunicação segmentada** — envio de mensagens por grupo de perfil.
- **Automação** — regras configuráveis de gatilho → ação (ex: score alto dispara WhatsApp, prazo curto cria alerta), com integração real a `/api/automacao/regras`.

**Sistema**

- **Arquitetura da solução** — documentação técnica de como o sistema funcionaria por trás das telas (não é uma tela de uso, é o "anexo técnico" do projeto).
- **Integrações & API** — conectores prontos (ERP, Power BI, CRM, WhatsApp Business, Slack, RD Station/Mailchimp) com configuração por conector, teste de conexão e envio de evento real contra o backend (`/api/health`, `/api/webhook/test`).
- **Usuários & Permissões** — cadastro de usuários (com convite por e-mail ou senha) e controle de acesso por tela, marcado individualmente por pessoa (não só por perfil, já que duas pessoas com o mesmo perfil podem precisar de acessos diferentes).
- **Configurações** — preferências do sistema e da conta.

---

## Backend

Há funções serverless reais publicadas na Vercel em `/api`, usadas pelas telas acima (não é tudo simulado no front-end):

- `GET /api/health` — status da API.
- `GET /api/jornada` — dados do funil de jornada.
- `POST /api/webhook/test` — recebe e ecoa um evento de teste.
- `GET /api/automacao/regras` — regras padrão de automação.

---

Todos os dados (fornecedores, CNPJs, editais) são fictícios, usados só para demonstração.
