const templates = {
    geral: {
        title: "PROCURAÇÃO GERAL",
        text: `PROCURAÇÃO

OUTORGANTE: {nome}, nacionalidade brasileira, estado civil {estado_civil}, profissão {profissao}, inscrito(a) no CPF sob o nº {cpf}, portador(a) do RG nº {rg}, residente e domiciliado(a) à {endereco}.

OUTORGADO: {nome_procurador}, advogado(a), inscrito(a) na OAB/{oab_uf} sob o nº {oab}, com escritório profissional à {endereco_procurador}.

PODERES: Por este instrumento particular de procuração, o(a) Outorgante nomeia e constitui o(a) Outorgado(a) como seu(sua) bastante procurador(a), conferindo-lhe amplos e gerais poderes para o foro em geral, com a cláusula "ad judicia et extra", em qualquer Juízo, Instância ou Tribunal, podendo propor contra quem de direito, as ações competentes e defendê-lo(a) nas contrárias, seguindo umas e outras, até final decisão, usando os recursos legais e acompanhando-os, conferindo-lhe ainda, poderes especiais para receber citação, confessar, reconhecer a procedência do pedido, transigir, desistir, renunciar ao direito sobre o qual se funda a ação, receber, dar quitação, firmar compromisso e substabelecer esta a outrem, com ou sem reserva de iguais poderes, bem como para {poderes_especificos}.

{cidade}, {data}.

__________________________________________________
{nomeupper}`
    },
    especifica: {
        title: "PROCURAÇÃO PARA FINS ESPECÍFICOS",
        text: `PROCURAÇÃO

OUTORGANTE: {nome}, nacionalidade brasileira, estado civil {estado_civil}, profissão {profissao}, inscrito(a) no CPF sob o nº {cpf}, portador(a) do RG nº {rg}, residente e domiciliado(a) à {endereco}.

OUTORGADO: {nome_procurador}, inscrito(a) no CPF sob o nº {oab} (ou RG), residente e domiciliado(a) em {endereco_procurador}.

PODERES: Amplos poderes, específicos e exclusivos para representar o(a) Outorgante junto a(o) {poderes_especificos}, podendo para tanto requerer, assinar, retirar documentos, pagar taxas e emolumentos, dar recibo e quitação, e praticar todos os demais atos necessários ao fiel cumprimento deste mandato.

{cidade}, {data}.

__________________________________________________
{nomeupper}`
    },
    previdenciaria: {
        title: "PROCURAÇÃO PREVIDENCIÁRIA (INSS)",
        text: `PROCURAÇÃO AD JUDICIA E EXTRA JUDICIA

OUTORGANTE: {nome}, nacionalidade brasileira, estado civil {estado_civil}, profissão {profissao}, inscrito(a) no CPF sob o nº {cpf}, portador(a) do RG nº {rg}, residente e domiciliado(a) à {endereco}.

OUTORGADO: {nome_procurador}, advogado(a), inscrito(a) na OAB/{oab_uf} sob o nº {oab}, com escritório profissional à {endereco_procurador}.

PODERES: Pelo presente instrumento o(a) outorgante confere ao(à) outorgado(a) amplos poderes para o foro em geral, com a cláusula "ad judicia et extra", em qualquer Juízo, Instância ou Tribunal, para propor contra o INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS ações, medidas competentes e defendê-lo(a) nas contrárias, especificamente para requerer, acompanhar e recorrer de benefícios previdenciários e assistenciais. Poderá ainda receber valores, requerer e assinar declarações de hipossuficiência, e tudo o mais praticar para o bom e fiel desempenho deste mandato, inclusive {poderes_especificos}.

{cidade}, {data}.

__________________________________________________
{nomeupper}`
    },
    administrativa: {
        title: "PROCURAÇÃO ADMINISTRATIVA",
        text: `PROCURAÇÃO

OUTORGANTE: {nome}, nacionalidade brasileira, estado civil {estado_civil}, profissão {profissao}, inscrito(a) no CPF sob o nº {cpf}, portador(a) do RG nº {rg}, residente e domiciliado(a) à {endereco}.

OUTORGADO: {nome_procurador}, residente à {endereco_procurador}, portador do documento nº {oab}.

PODERES: Para representar o(a) Outorgante perante repartições públicas federais, estaduais e municipais, autarquias e empresas de economia mista, podendo protocolar e retirar documentos, impugnar exigências, pagar taxas e impostos, requerer certidões, e praticar todos os atos necessários para a defesa dos interesses do(a) Outorgante, notadamente para {poderes_especificos}.

{cidade}, {data}.

__________________________________________________
{nomeupper}`
    }
};

window.templates = templates;
