const fs = require('fs');

const ptBR = JSON.parse(fs.readFileSync('messages/pt-BR.json', 'utf8'));

// Fourth pass final translation mapping
const translations = {
  "LoginPage.descWelcome": "Entre na sua conta para continuar",
  "LoginPage.noAccount": "Não tem uma conta?",
  "LoginPage.createAccount": "Criar conta",
  "Dashboard.activityFeed.viewAll": "Ver tudo →",
  "Dashboard.activityFeed.noActivity": "Nenhuma atividade recente",
  "Dashboard.pipelineDonut.noOpenDealsHint": "Crie negócios em Pipelines para visualizar o gráfico aqui.",
  "Inbox.page.whatsappNotConnected": "O WhatsApp® não está conectado. Acesse Configurações para conectar sua conta.",
  "Inbox.conversationList.searchPlaceholder": "Pesquisar conversas...",
  "Inbox.conversationList.noMessagesYet": "Nenhuma mensagem ainda",
  "Inbox.messageThread.backToConversations": "Voltar para conversas",
  "Inbox.messageThread.noMessagesYet": "Nenhuma mensagem ainda",
  "Inbox.messageThread.selectConversation": "Selecione uma conversa",
  "Inbox.messageThread.selectConversationHint": "Escolha uma conversa à esquerda para iniciar o atendimento",
  "Inbox.composer.draftHint": "Toque em ✨ para rascunhar uma resposta com IA — você pode editar antes de enviar",
  "Inbox.composer.cancel": "Cancelar",
  "Inbox.composer.addCaption": "Adicionar legenda…",
  "Inbox.composer.removeAttachment": "Remover anexo",
  "Inbox.composer.quickRepliesEmpty": "Nenhuma resposta rápida cadastrada. Adicione em Configurações → Respostas Rápidas.",
  "Inbox.composer.saveAsQuickReply": "Salvar como resposta rápida",
  "Inbox.composer.quickReplySaveError": "Não foi possível salvar a resposta rápida.",
  "Inbox.actions.delete": "Excluir",
  "Inbox.replyQuote.cancelReply": "Cancelar resposta",
  "Inbox.templatePicker.noApprovedTemplatesHint": "Aprove um modelo no Gerenciador do WhatsApp Meta e sincronize em Configurações → Modelos.",
  "Inbox.templatePicker.cancel": "Cancelar",
  "Inbox.sidebar.addNotePlaceholder": "Adicionar nota...",
  "Inbox.aiBanner.updateError": "Não foi possível atualizar o assistente de IA.",
  "Contacts.page.subtitle": "Gerencie a sua base de clientes. {count} contatos cadastrados.",
  "Contacts.page.subtitleZero": "Gerencie a sua base de clientes.",
  "Contacts.page.addContactBtn": "Adicionar Contato",
  "Contacts.page.searchPlaceholder": "Pesquisar por nome, telefone ou e-mail...",
  "Contacts.page.noTagsYet": "Nenhuma tag cadastrada ainda.",
  "Contacts.page.deleteSelected": "Excluir selecionados",
  "Contacts.page.noContactsYet": "Nenhum contato cadastrado ainda.",
  "Contacts.page.addFirstContact": "Adicionar seu primeiro contato",
  "Contacts.page.editAction": "Editar"
};

function applyTranslations(obj, prefix = '') {
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (translations[fullKey]) {
      obj[key] = translations[fullKey];
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      applyTranslations(obj[key], fullKey);
    }
  }
}

applyTranslations(ptBR);

fs.writeFileSync('messages/pt-BR.json', JSON.stringify(ptBR, null, 2), 'utf8');
fs.writeFileSync('messages/pt.json', JSON.stringify(ptBR, null, 2), 'utf8');
fs.writeFileSync('messages/en.json', JSON.stringify(ptBR, null, 2), 'utf8');

console.log('Successfully completed 4th final pass translation update!');
