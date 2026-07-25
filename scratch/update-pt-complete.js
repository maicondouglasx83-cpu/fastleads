const fs = require('fs');

const ptBRFull = {
  "Sidebar": {
    "title": "FastLeads CRM",
    "dashboard": "Visão Geral",
    "inbox": "Chat ao Vivo",
    "notifications": "Conhecimento",
    "contacts": "CRM / Contatos",
    "pipelines": "Pipelines de Vendas",
    "broadcasts": "Campanhas (Massa)",
    "automations": "Automações",
    "flows": "Fluxos de Automação",
    "aiAgents": "Meus Agentes",
    "connections": "Conexões",
    "settings": "Configurações & API",
    "beta": "Beta",
    "unreadConversations": "{count} {count, plural, =1 {conversa não lida} other {conversas não lidas}}",
    "unreadNotifications": "{count} {count, plural, =1 {notificação não lida} other {notificações não lidas}}",
    "roleOwner": "Proprietário",
    "roleAdmin": "Administrador",
    "roleAgent": "Agente",
    "roleViewer": "Visualizador",
    "closeMenu": "Fechar menu",
    "defaultUser": "Usuário",
    "defaultAvatar": "Avatar",
    "menuProfile": "Perfil",
    "menuSettings": "Configurações",
    "menuSignOut": "Sair"
  },
  "Header": {
    "dashboard": "Visão Geral",
    "inbox": "Chat ao Vivo",
    "notifications": "Conhecimento",
    "contacts": "CRM / Contatos",
    "pipelines": "Pipelines de Vendas",
    "broadcasts": "Campanhas (Massa)",
    "automations": "Automações",
    "settings": "Configurações & API",
    "connections": "Conexões",
    "openMenu": "Abrir menu",
    "openAccountMenu": "Abrir menu da conta",
    "defaultUser": "Usuário",
    "defaultAvatar": "Avatar",
    "menuProfile": "Perfil",
    "menuSettings": "Configurações",
    "menuSignOut": "Sair"
  },
  "Settings": {
    "pageTitle": "Configurações & API",
    "pageDesc": "Tudo em um só lugar — sua conta e seu espaço de trabalho. Escolha uma seção para gerenciar.",
    "sections": {
      "overview": "Visão Geral",
      "profile": "Seu Perfil",
      "security": "Login e Segurança",
      "appearance": "Aparência",
      "whatsapp": "WhatsApp",
      "templates": "Modelos Meta",
      "quick-replies": "Respostas Rápidas",
      "fields": "Campos e Tags",
      "deals": "Negócios e Moeda",
      "members": "Membros da Equipe",
      "api": "Chaves de API"
    },
    "groups": {
      "account": "CONTA",
      "workspace": "ESPAÇO DE TRABALHO"
    },
    "overview": {
      "notSetup": "Não configurado ainda",
      "connected": "Conectado",
      "needsReconnecting": "Precisa reconectar",
      "viewTeamMembers": "Ver membros da equipe",
      "membersCount": "{count} {count, plural, =1 {membro} other {membros}}",
      "pendingInvites": "{count} convite pendente",
      "manageTemplates": "Gerenciar modelos de mensagens",
      "templatesCount": "{count} {count, plural, =1 {modelo} other {modelos}}",
      "pendingReview": "{count} em análise",
      "tagsAndFields": "Tags e campos personalizados",
      "tagsCount": "{count} {count, plural, =1 {tag} other {tags}}",
      "fieldsCount": "{count} campos personalizados",
      "appearance": "Modo {mode} · Destaque {theme}",
      "yourAccount": "Sua conta",
      "loading": "Carregando…"
    },
    "whatsapp": {
      "title": "Conexão com WhatsApp",
      "description": "Conecte sua API do WhatsApp Business oficial da Meta. Credenciais, webhook e instruções de configuração.",
      "tokenCorrupted": "O token armazenado não pôde ser descriptografado",
      "resetting": "Redefinindo...",
      "resetConfig": "Redefinir Configuração",
      "credentialsValid": "Credenciais Válidas",
      "notConnected": "Não Conectado",
      "connectedDesc": "Seu token de acesso está autenticado na Meta. Veja o status abaixo para verificar o recebimento de mensagens.",
      "notConnectedDesc": "Configure suas credenciais da API Meta abaixo para conectar sua conta do WhatsApp Business.",
      "registered": "Registrado — A Meta enviará eventos para o FastLeads",
      "notRegistered": "Não registrado — A Meta não enviará eventos",
      "verifyWithMeta": "Verificar com a Meta",
      "subscribedSince": "Inscrito desde {date}. Clique em Verificar com a Meta se as mensagens pararem de chegar.",
      "unknownDate": "desconhecido",
      "lastAttemptFailed": "Última tentativa falhou com: ",
      "retryHint": "Informe o PIN de 2 etapas abaixo e clique em Salvar Configuração para tentar novamente.",
      "noRegistrationHint": "Este número foi salvo antes do rastreamento de registro. Informe o PIN abaixo e clique em Salvar.",
      "diagnosticLastRun": "Diagnóstico — última execução: ",
      "live": "online",
      "notLive": "offline",
      "apiCredentialsTitle": "Credenciais da API Meta",
      "apiCredentialsDesc": "Informe as credenciais da API do WhatsApp Business da Meta.",
      "phoneNumberId": "ID do Número de Telefone (Phone Number ID)",
      "wabaId": "ID da Conta WhatsApp Business (WABA ID)",
      "accessToken": "Token de Acesso Permanente (Permanent Access Token)",
      "accessTokenPlaceholder": "Cole o seu token de acesso permanente",
      "tokenHidden": "O token está oculto por segurança. Digite-o novamente para atualizar a configuração.",
      "webhookVerifyToken": "Token de Verificação do Webhook (Verify Token)",
      "webhookVerifyTokenPlaceholder": "Crie um token de verificação personalizado",
      "webhookVerifyTokenHint": "Uma string personalizada criada por você. Deve ser idêntica ao Token informado no painel da Meta.",
      "twoStepPin": "PIN de verificação em duas etapas",
      "optional": "(opcional)",
      "pinPlaceholder": "PIN de 6 dígitos configurado no Meta WhatsApp Manager",
      "pinHint": "Necessário para registrar o recebimento de mensagens em número de produção.",
      "webhookTitle": "Configuração do Webhook",
      "webhookDesc": "Use esta URL como Callback do Webhook no Painel do Desenvolvedor Meta.",
      "webhookUrl": "URL Callback do Webhook",
      "saving": "Salvando...",
      "saveConfig": "Salvar Configuração",
      "testing": "Testando...",
      "testConnection": "Testar Conexão com API",
      "setupInstructions": "Instruções de Configuração",
      "setupInstructionsDesc": "Siga estes passos para conectar sua API do WhatsApp Business.",
      "step1": "1. Criar um App na Meta",
      "step1_1": "Acesse developers.facebook.com",
      "step1_2": "Clique em \"Meus Aplicativos\" e depois em \"Criar Aplicativo\"",
      "step1_3": "Selecione \"Empresarial\" como tipo de aplicativo",
      "step1_4": "Preencha os detalhes e crie o aplicativo",
      "step2": "2. Adicionar o produto WhatsApp",
      "step2_1": "No painel do app, clique em \"Adicionar Produto\"",
      "step2_2": "Encontre \"WhatsApp\" e clique em \"Configurar\"",
      "step2_3": "Siga o assistente para vincular sua empresa",
      "step3": "3. Obter Credenciais da API",
      "step3_1": "Vá em WhatsApp > Configuração da API",
      "step3_2": "Copie o seu <strong class=\"text-foreground\">ID do número de telefone</strong>",
      "step3_3": "Copie o seu <strong class=\"text-foreground\">ID da Conta do WhatsApp Business</strong>",
      "step3_4": "Gere um <strong class=\"text-foreground\">Token de Acesso Permanente</strong> em Configurações do Negócio > Usuários do Sistema",
      "step4": "4. Configurar Webhooks",
      "step4_1": "Vá em WhatsApp > Configuração",
      "step4_2": "Clique em \"Editar\" na seção Webhook",
      "step4_3": "Cole a <strong class=\"text-foreground\">URL Callback do Webhook</strong> acima",
      "step4_4": "Informe o mesmo <strong class=\"text-foreground\">Token de Verificação</strong> definido aqui",
      "step4_5": "Marque o campo \"messages\" do webhook",
      "metaDocs": "Documentação Oficial da API do WhatsApp Meta"
    },
    "profile": {
      "title": "Seu perfil",
      "description": "Como você é exibido no sistema. Seu avatar e nome aparecem no cabeçalho, barra lateral e onde seus colegas o veem.",
      "changePhoto": "Alterar foto",
      "uploadPhoto": "Enviar foto",
      "remove": "Remover",
      "photoHint": "PNG, JPG, WebP ou GIF. Até 2 MB.",
      "displayName": "Nome de exibição",
      "email": "E-mail",
      "accountDetails": "Detalhes da conta",
      "role": "Função",
      "joined": "Membro desde",
      "userId": "ID do usuário",
      "loading": "Carregando seu perfil…",
      "saving": "Salvando…",
      "saveChanges": "Salvar alterações",
      "passwordTitle": "Senha",
      "passwordDesc": "Use pelo menos {min} caracteres para manter sua conta segura.",
      "currentPassword": "Senha atual",
      "newPassword": "Nova senha",
      "confirmPassword": "Confirmar nova senha",
      "updating": "Atualizando…",
      "updatePassword": "Atualizar senha",
      "sessionsTitle": "Sessões ativas",
      "sessionsDesc": "Desconectar de todos os dispositivos onde você está logado.",
      "signOutAll": "Sair de todos os dispositivos"
    },
    "appearance": {
      "title": "Aparência",
      "description": "Escolha o modo claro/escuro e a cor de destaque do sistema.",
      "mode": "Modo",
      "useMode": "Usar modo {mode}",
      "active": "Ativo",
      "accentColor": "Cor de destaque",
      "useTheme": "Usar tema {name}"
    },
    "security": {
      "title": "Login & Segurança",
      "description": "Altere sua senha e gerencie os dispositivos conectados para manter sua conta segura."
    },
    "members": {
      "title": "Membros da equipe",
      "description": "Pessoas com acesso a esta conta. As funções controlam o que cada usuário pode fazer.",
      "inviteMember": "Convidar membro",
      "online": "online",
      "away": "ausente",
      "offline": "offline",
      "memberCount": "{count} {count, plural, =1 {membro} other {membros}}",
      "you": "Você"
    },
    "aiConfig": {
      "title": "Configuração do Agente IA",
      "description": "Traga sua chave própria da OpenAI, Anthropic ou DeepSeek. O FastLeads chama o provedor diretamente — sem taxas extras por usuário.",
      "providerAndKey": "Provedor & Chave de API",
      "provider": "Provedor",
      "model": "Modelo",
      "apiKey": "Chave de API (API Key)",
      "testKey": "Testar chave",
      "testSuccess": "Chave funcionando com sucesso!",
      "testRejected": "O provedor recusou a chave informada.",
      "testNetworkError": "Não foi possível conectar ao provedor.",
      "behaviour": "Instruções do Agente",
      "behaviourDesc": "Instrua seu assistente sobre a sua empresa — produtos, tom de voz e regras de atendimento.",
      "businessContext": "Contexto do negócio e regras do prompt",
      "promptPlaceholder": "Ex: Somos a empresa X. Responda com cordialidade e agilidade. Para orçamentos específicos, faça transbordo para a equipe.",
      "enableAssistant": "Ativar assistente de IA",
      "enableAssistantDesc": "Habilita o botão de 'Rascunhar com IA' no chat ao vivo.",
      "autoReply": "Resposta automática para mensagens recebidas",
      "autoReplyDesc": "O agente de IA responde automaticamente a novos leads no WhatsApp.",
      "save": "Salvar Configuração",
      "saveSuccess": "Configuração do Agente IA salva com sucesso!",
      "saveFailed": "Falha ao salvar configuração."
    }
  }
};

function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

let existingPtBR = {};
try {
  existingPtBR = JSON.parse(fs.readFileSync('messages/pt-BR.json', 'utf8'));
} catch (e) {}

mergeDeep(existingPtBR, ptBRFull);

fs.writeFileSync('messages/pt-BR.json', JSON.stringify(existingPtBR, null, 2), 'utf8');
fs.writeFileSync('messages/pt.json', JSON.stringify(existingPtBR, null, 2), 'utf8');
fs.writeFileSync('messages/en.json', JSON.stringify(existingPtBR, null, 2), 'utf8');

console.log('Successfully updated pt-BR, pt, and en translation files!');
