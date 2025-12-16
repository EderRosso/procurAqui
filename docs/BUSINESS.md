# Estrutura de Negócio - procurAqui

Este documento detalha o modelo de negócios, estratégia e visão para o **procurAqui**.

## 1. Modelo de Negócios (MVP)

O modelo é **Freemium**.
*   **Produto Gratuito:** Geração ilimitada de procurações funcionais, mas com uma marca d'água "procurAqui - Grátis" na lateral ou fundo, e rodapé promocional.
*   **Produto Premium (Upsell):** Taxa única (micro-transação) para remover a marca d'água e desbloquear formatação "limpa/executiva".
    *   **Preço Sugerido:** R$ 4,90 a R$ 9,90 por documento.
    *   **Meio de Pagamento:** Pix (via API como Mercado Pago ou Stripe).

## 2. Estratégia de Monetização Futura
*   **Assinatura para Advogados:** R$ 29,90/mês para geração ilimitada sem marca d'água e salvamento de modelos na nuvem.
*   **Assinatura "Whitelabel":** Para escritórios colocarem o próprio logo no cabeçalho.
*   **Lead Generation:** Vender leads de quem precisa de "Procuração para Divórcio" para advogados parceiros (OAB permite com restrições, verificar ética local).

## 3. Plano de SEO (Search Engine Optimization)
O objetivo é capturar tráfego de cauda longa (long tail).

### Palavras-chave Alvo:
*   "Modelo de procuração para imprimir"
*   "Gerador de procuração online grátis"
*   "Procuração ad judicia simples"
*   "Fazer procuração em pdf"

### Ações On-Page:
*   **Títulos Dinâmicos:** Usar `<h1>` diferente para cada seção.
*   **Conteúdo Rico:** Criar um Blog (`/blog`) futuramente com artigos: "Para que serve uma procuração ad judicia?", "Como revogar uma procuração?".
*   **Performance:** O fato do site ser estático e leve garante pontuação alta no Google PageSpeed (Core Web Vitals).

## 4. Sugestão de Funil de Aquisição
1.  **Topo (Atração):**
    *   Google Ads (Busca): "Modelo procuração word grátis".
    *   SEO Orgânico.
2.  **Meio (Engajamento):**
    *   Usuário preenche o formulário (barreira de entrada zero, sem login).
    *   Visualiza o PDF (com marca d'água) imediatamente.
3.  **Fundo (Conversão):**
    *   Ao clicar em "Baixar", oferecer: "Deseja remover a marca d'água por apenas R$ 4,90?".
    *   Botão "Sim, quero profissional" vs "Não, quero baixar com marca".

## 5. Análise de Viabilidade do Nome "procurAqui"
*   **Pontos Fortes:**
    *   **Sonoridade:** Remete a "Procuração" + "Aqui". Fácil de lembrar.
    *   **Ação:** Instiga imediatismo.
    *   **Disponibilidade:** Verificar domínios `.com.br` e redes sociais.
*   **Pontos de Atenção:**
    *   Pode confundir com "Procurar Aqui" (busca de coisas em geral), mas o contexto jurídico elimina a dúvida rapidamente.

## 6. Próximos Passos (Roadmap)
1.  Integração com Gateway de Pagamento (Mercado Pago).
2.  Login de usuário para salvar histórico.
3.  Envio do PDF por WhatsApp direto da plataforma.
