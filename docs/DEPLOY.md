# Manual de Deploy - procurAqui (Versão Full Stack)

Este guia cobre a versão com **Backend Serverless** (Vercel Functions).

## Estrutura
```
/procurAqui
  ├── package.json       (Novo)
  ├── api/              (Novo - Backend)
  │   ├── checkout.js
  │   ├── webhook.js
  │   └── download.js
  ├── index.html
  └── ...
```

---

## Passo 1: Configurar Mercado Pago
1.  Acesse [dev.mercadopago.com.br](https://www.mercadopago.com.br/developers/pt)
2.  Crie uma aplicação.
3.  Pegue o **Access Token** de Produção ou Teste.

## Passo 2: Deploy na Vercel
1.  Importe o projeto na Vercel.
2.  Vá em **Settings > Environment Variables**.
3.  Adicione as variáveis:
    *   `MP_ACCESS_TOKEN`: `seu_token_aqui`
    *   `BASE_URL`: `https://seu-projeto.vercel.app` (URL final do site)
4.  Faça o Deploy.
    *   A Vercel detectará automaticamente as "Serverless Functions" na pasta `/api`.

## Passo 3: Webhook (Opcional para Confirmação Real)
1.  No painel do Mercado Pago, configure a URL de notificação:
    *   `https://seu-projeto.vercel.app/api/webhook`

## Resumo dos Endpoints
*   `POST /api/checkout`: Cria o pagamento.
*   `POST /api/download`: (Opcional) Gera PDF no server.
*   `POST /api/webhook`: Recebe status do pagamento.

---

## Modo Frontend vs Integrado
Se não quiser usar o backend, basta deletar a pasta `api` e `package.json` e voltar a usar o Link de Pagamento direto no JS.
