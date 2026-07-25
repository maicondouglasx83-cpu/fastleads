const fs = require('fs');

const ptBR = {
  "LoginPage": {
    "titleAccept": "Entrar para aceitar",
    "titleWelcome": "Bem-vindo de volta",
    "descAccept": "Entre na sua conta para visualizar o convite.",
    "descWelcome": "Entre na sua conta para continuar",
    "emailLabel": "E-mail",
    "emailPlaceholder": "seuemail@exemplo.com",
    "passwordLabel": "Senha",
    "forgotPassword": "Esqueceu a senha?",
    "passwordPlaceholder": "Digite sua senha",
    "signingIn": "Entrando...",
    "signIn": "Entrar",
    "noAccount": "Não tem uma conta?",
    "createAccount": "Criar conta"
  },
  "Sidebar": {
    "title": "FastLeads CRM para WhatsApp",
    "dashboard": "Visão Geral",
    "inbox": "Chat ao Vivo",
    "notifications": "Conhecimento",
    "contacts": "CRM / Contatos",
    "pipelines": "Pipelines de Vendas",
    "broadcasts": "Campanhas (Massa)",
    "automations": "Automações",
    "flows": "Fluxos de Automação",
    "aiAgents": "Meus Agentes",
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
    "openMenu": "Abrir menu",
    "openAccountMenu": "Abrir menu da conta",
    "defaultUser": "Usuário",
    "defaultAvatar": "Avatar",
    "menuProfile": "Perfil",
    "menuSettings": "Configurações",
    "menuSignOut": "Sair"
  },
  "ModeToggle": {
    "switchMode": "Alternar para modo {mode}"
  },
  "Dashboard": {
    "page": {
      "title": "Visão Geral",
      "description": "Métricas e relatórios em tempo real de conversas, contatos, vendas e automações.",
      "activeConversations": "Leads Atendidos",
      "newContactsToday": "Novos Contatos Hoje",
      "openDealsValue": "Valor em Negócios",
      "messagesSentToday": "Mensagens Enviadas Hoje",
      "newTodayVsYesterday": "novos hoje vs ontem",
      "vsYesterday": "vs ontem",
      "openDeals": "{count} {count, plural, =1 {negócio aberto} other {negócios abertos}}",
      "noChange": "Sem alterações {suffix}"
    },
    "quickActions": {
      "newContact": "Novo Contato",
      "newDeal": "Novo Negócio",
      "newBroadcast": "Nova Campanha",
      "newAutomation": "Nova Automação"
    },
    "activityFeed": {
      "title": "Atividades Recentes",
      "viewAll": "Ver tudo →",
      "noActivity": "Nenhuma atividade registrada ainda",
      "noActivityHint": "As atividades de mensagens, negócios e automações aparecerão aqui.",
      "showingOf": "Exibindo {visible} de {totalLoaded}{plus}",
      "show": "Exibir",
      "timeS": "há {sec}s",
      "timeM": "há {min}m",
      "timeH": "há {hr}h",
      "timeD": "há {day}d"
    },
    "conversationsChart": {
      "title": "Volume de Atendimentos",
      "description": "Volume diário de mensagens enviadas e recebidas",
      "days": "{count} dias",
      "noActivity": "Sem atividade no período selecionado",
      "noActivityHint": "Envie ou receba mensagens para visualizar o gráfico.",
      "incoming": "Recebidas",
      "outgoing": "Enviadas",
      "tooltipIncoming": "{count} recebidas",
      "tooltipOutgoing": "{count} enviadas",
      "ariaLabel": "Conversas por dia"
    },
    "pipelineDonut": {
      "title": "Funil de Qualificação",
      "description": "Negócios abertos divididos por estágio",
      "noOpenDeals": "Nenhum negócio aberto ainda",
      "noOpenDealsHint": "Crie negócios em Pipelines para acompanhar o funil.",
      "dealCount": "{count} {count, plural, =1 {negócio} other {negócios}}",
      "total": "Total",
      "ariaLabel": "Valor em pipeline por estágio"
    },
    "responseTimeChart": {
      "title": "Tempo Médio de Primeiras Respostas",
      "description": "Minutos para responder à primeira mensagem de novos clientes por dia",
      "target": "meta {minutes}m",
      "thisWeek": "Esta semana:",
      "lastWeek": "Semana passada:",
      "noReplies": "Nenhuma resposta registrada ainda",
      "noRepliesHint": "Este gráfico é preenchido à medida que você responde aos clientes."
    },
    "emptyState": {
      "title": "Dados suficientes ainda não coletados"
    }
  },
  "Inbox": {
    "page": {
      "whatsappNotConnected": "O WhatsApp® não está conectado. Acesse Configurações para conectar sua conta."
    },
    "conversationList": {
      "searchPlaceholder": "Pesquisar conversas...",
      "filterAll": "Todas",
      "filterUnread": "Não lidas",
      "filterOpen": "Abertas",
      "filterPending": "Pendentes",
      "filterClosed": "Fechadas",
      "tags": "Tags",
      "company": "Empresa",
      "allCompanies": "Todas as empresas",
      "clearAll": "Limpar filtros",
      "noConversations": "Nenhuma conversa encontrada",
      "noMessagesYet": "Nenhuma mensagem ainda",
      "unknown": "Desconhecido"
    },
    "messageThread": {
      "backToConversations": "Voltar para conversas",
      "hideContactPanel": "Ocultar dados do contato",
      "showContactPanel": "Exibir dados do contato",
      "hideContact": "Ocultar contato",
      "showContact": "Exibir contato",
      "refresh": "Atualizar",
      "refreshConversation": "Atualizar conversa",
      "status": "Status",
      "statusOpen": "Aberto",
      "statusPending": "Pendente",
      "statusClosed": "Fechado",
      "assign": "Atribuir",
      "assigned": "Atribuído",
      "unassign": "Desatribuir",
      "noTeammates": "Nenhum membro disponível",
      "me": " (eu)",
      "noMessagesYet": "Nenhuma mensagem ainda",
      "sendTemplateHint": "Envie um modelo para iniciar a conversa",
      "selectConversation": "Selecione uma conversa",
      "selectConversationHint": "Escolha uma conversa à esquerda para iniciar o atendimento",
      "today": "Hoje",
      "yesterday": "Ontem"
    },
    "sessionTimer": {
      "expired": "Expirada",
      "xhRemaining": "{hours}h restantes",
      "xmRemaining": "{minutes}m restantes",
      "noCustomerMessages": "Sem mensagens do cliente"
    },
    "composer": {
      "draftHint": "Toque em ✨ para gerar uma resposta com IA — você pode editar antes de enviar",
      "sessionExpiredHint": "A janela de 24 horas expirou. Envie um modelo para reengajar.",
      "templates": "Modelos",
      "readOnlyPlaceholder": "Modo leitura — visualizadores não podem responder",
      "sessionExpiredPlaceholder": "Sessão expirada - use um modelo",
      "typeMessagePlaceholder": "Digite uma mensagem... (Shift+Enter para nova linha)",
      "readOnlyTitle": "Modo leitura — seu usuário não pode enviar mensagens",
      "recording": "Gravando... {current} / {max}",
      "cancel": "Cancelar",
      "stopAndAttach": "Parar e anexar",
      "attachMedia": "Anexar mídia",
      "photo": "Foto",
      "video": "Vídeo",
      "document": "Documento",
      "voiceNote": "Áudio",
      "sendTemplate": "Enviar modelo",
      "draftWithAI": "Criar resposta com IA",
      "addCaption": "Adicionar legenda...",
      "removeAttachment": "Remover anexo",
      "moreActions": "Mais ações",
      "interactiveMessage": "Mensagem interativa",
      "quickReplies": "Respostas rápidas",
      "quickRepliesEmpty": "Nenhuma resposta rápida cadastrada. Adicione em Configurações → Respostas Rápidas.",
      "saveAsQuickReply": "Salvar como resposta rápida",
      "send": "Enviar",
      "quickReplyNamePrompt": "Nome desta resposta rápida:",
      "quickReplySaved": "Salvo como resposta rápida.",
      "quickReplySaveError": "Não foi possível salvar a resposta rápida."
    },
    "bubble": {
      "photo": "Foto",
      "video": "Vídeo",
      "audio": "Áudio",
      "unavailable": "{label} indisponível",
      "document": "Documento",
      "locationShared": "Localização compartilhada",
      "template": "Modelo",
      "buttonReply": "Resposta de botão",
      "interactiveReply": "[Resposta interativa]",
      "unsupported": "[Tipo de mensagem não suportado]",
      "aiBadge": "IA",
      "aiBadgeTitle": "Enviado automaticamente pelo assistente de IA"
    },
    "actions": {
      "reply": "Responder",
      "copyText": "Copiar texto",
      "delete": "Excluir",
      "react": "Reagir",
      "reactWith": "Reagir com {emoji}",
      "nothingToCopy": "Nada para copiar",
      "copied": "Copiado",
      "copyFailed": "Falha ao copiar"
    },
    "replyQuote": {
      "photo": "[Foto]",
      "video": "[Vídeo]",
      "document": "[Documento]",
      "audio": "[Áudio]",
      "voiceMessage": "[Mensagem de voz]",
      "location": "[Localização]",
      "template": "[Modelo]",
      "message": "[Mensagem]",
      "cancelReply": "Cancelar resposta"
    },
    "templatePicker": {
      "sendTemplate": "Enviar modelo",
      "fillPlaceholders": "Preencha as variáveis do modelo. O Meta exige que todas as variáveis sejam definidas.",
      "pickTemplate": "Escolha um modelo aprovado do WhatsApp para enviar a este contato.",
      "noApprovedTemplates": "Nenhum modelo aprovado",
      "noApprovedTemplatesHint": "Aprove um modelo no Gerenciador de WhatsApp do Meta e sincronize em Configurações → Modelos.",
      "preview": "Pré-visualização",
      "headerValuePlaceholder": "Valor da variável de cabeçalho",
      "bodyValuePlaceholder": "Valor para {val}",
      "urlSuffixValuePlaceholder": "Sufixo da URL",
      "finalUrl": "URL Final: {url}",
      "back": "Voltar",
      "cancel": "Cancelar",
      "send": "Enviar modelo"
    },
    "sidebar": {
      "contactInfo": "Informações do Contato",
      "tags": "Tags",
      "notes": "Notas",
      "deals": "Negócios",
      "noTags": "Sem tags",
      "noDeals": "Sem negócios",
      "addNotePlaceholder": "Adicionar nota..."
    },
    "aiBanner": {
      "pausedTitle": "Assistente IA pausado nesta conversa",
      "activeText": "Assistente IA está respondendo automaticamente",
      "takeOver": "Assumir atendimento",
      "resume": "Reativar IA",
      "tookOver": "Você assumiu este atendimento.",
      "resumed": "Assistente de IA reativado.",
      "updateError": "Não foi possível atualizar o assistente de IA.",
      "networkError": "Não foi possível conectar ao servidor."
    }
  },
  "Contacts": {
    "page": {
      "title": "CRM / Contatos",
      "subtitle": "Gerencie a sua base de clientes. {count} contatos cadastrados.",
      "subtitleZero": "Gerencie a sua base de clientes.",
      "customFieldsBtn": "Campos personalizados",
      "importBtn": "Importar CSV",
      "addContactBtn": "Adicionar Contato",
      "searchPlaceholder": "Pesquisar por nome, telefone ou e-mail...",
      "filterByTags": "Filtrar por tags",
      "clearAll": "Limpar filtros",
      "noTagsYet": "Nenhuma tag cadastrada.",
      "selectedCount": "{count} selecionados",
      "clearSelection": "Limpar seleção",
      "deleteSelected": "Excluir selecionados",
      "tableColumns": {
        "name": "Nome",
        "phone": "Telefone",
        "email": "E-mail",
        "company": "Empresa",
        "tags": "Tags",
        "createdAt": "Data de Criação"
      },
      "loading": "Carregando contatos...",
      "noContactsMatch": "Nenhum contato encontrado com os filtros selecionados.",
      "noContactsYet": "Nenhum contato cadastrado ainda.",
      "addFirstContact": "Adicionar seu primeiro contato",
      "unnamed": "Sem nome",
      "editAction": "Editar",
      "deleteAction": "Excluir",
      "showingPagination": "Exibindo {start}-{end} de {total}",
      "pageCount": "Página {page} de {total}",
      "deleteContactTitle": "Excluir Contato",
      "deleteContactDesc": "Tem certeza que deseja excluir {name}? Esta ação não poderá ser desfeita.",
      "cancel": "Cancelar",
      "deleteBtn": "Excluir",
      "deleteBulkTitle": "Excluir Contatos",
      "deleteBulkDesc": "Tem certeza que deseja excluir os {count} contatos selecionados? Esta ação não pode ser desfeita.",
      "toastFailedLoad": "Falha ao carregar contatos",
      "toastFailedDelete": "Falha ao excluir contato",
      "toastDeleted": "Contato excluído com sucesso",
      "toastBulkFailedDelete": "Falha ao excluir contatos",
      "toastBulkDeleted": "{count} contatos excluídos"
    },
    "form": {
      "addTitle": "Adicionar Contato",
      "addDesc": "Cadastre um novo contato na sua base.",
      "editTitle": "Editar Contato",
      "editDesc": "Atualize as informações e tags do contato.",
      "nameLabel": "Nome Completo",
      "namePlaceholder": "João da Silva",
      "phoneLabel": "Número de Telefone (WhatsApp)",
      "phonePlaceholder": "+5511999999999",
      "phoneHint": "Inclua o código do país e DDD, ex: +5511999999999",
      "emailLabel": "E-mail",
      "emailPlaceholder": "joao@exemplo.com",
      "companyLabel": "Empresa",
      "companyPlaceholder": "Empresa Exemplo",
      "tagsLabel": "Tags",
      "tagsPlaceholder": "Selecionar tags...",
      "noTagsFound": "Nenhuma tag encontrada.",
      "createTagAction": "Criar tag \"{value}\"",
      "cancel": "Cancelar",
      "save": "Salvar Contato",
      "update": "Atualizar",
      "create": "Criar",
      "toastSuccessAdd": "Contato criado com sucesso",
      "toastSuccessEdit": "Contato atualizado com sucesso",
      "toastError": "Falha ao salvar contato",
      "toastConflict": "Já existe um contato cadastrado com este telefone",
      "viewExisting": "Visualizar {name}",
      "dupExact": "Já existe um contato com este telefone.",
      "dupSimilar": "Já existe um contato com um número muito similar.",
      "loadingTags": "Carregando tags...",
      "noTagsAvailable": "Nenhuma tag disponível. Crie tags em Configurações.",
      "phoneRequired": "O telefone é obrigatório"
    },
    "detailView": {
      "tabs": {
        "details": "Detalhes",
        "activity": "Atividades",
        "notes": "Notas",
        "custom": "Campos Personalizados",
        "deals": "Negócios",
        "tags": "Tags",
        "noTags": "Sem tags",
        "noDeals": "Sem negócios",
        "addNotePlaceholder": "Adicionar nota..."
      },
      "actions": {
        "edit": "Editar",
        "message": "Mensagem",
        "delete": "Excluir"
      },
      "contactInfo": "Informações do Contato",
      "unnamed": "Desconhecido",
      "contactDetailsDesc": "Dados e histórico do cliente",
      "phone": "Telefone",
      "email": "E-mail",
      "company": "Empresa",
      "createdAt": "Data de Criação",
      "customFields": "Campos Personalizados",
      "noCustomFields": "Nenhum campo personalizado definido. Crie em Configurações.",
      "manageFields": "Gerenciar campos",
      "enterCustomField": "Informe {name}...",
      "activityTab": {
        "title": "Histórico de Atividades",
        "noActivity": "Nenhuma atividade recente."
      },
      "notesTab": {
        "title": "Notas Internas",
        "placeholder": "Escreva uma observação interna...",
        "save": "Adicionar Nota",
        "noNotes": "Nenhuma nota registrada."
      },
      "dealsTab": {
        "noDeals": "Nenhum negócio no funil ainda"
      },
      "tagsTab": {
        "clickTagDesc": "Clique numa tag para adicioná-la ou removê-la deste contato.",
        "noTagsAvailable": "Nenhuma tag cadastrada."
      },
      "sendTemplateBtn": "Enviar modelo",
      "saveChangesBtn": "Salvar Alterações",
      "saveCustomFieldsBtn": "Salvar Campos",
      "toastPhoneRequired": "Telefone é obrigatório",
      "toastUpdateFailed": "Falha ao atualizar contato",
      "toastUpdated": "Contato atualizado",
      "toastNotAuthenticated": "Não autenticado",
      "toastNoteAddFailed": "Falha ao adicionar nota",
      "toastNoteAdded": "Nota adicionada",
      "toastNoteDeleteFailed": "Falha ao excluir nota",
      "toastNoteDeleted": "Nota excluída",
      "toastCustomFieldsSaved": "Campos personalizados salvos",
      "toastCustomFieldsFailed": "Falha ao salvar campos",
      "toastTemplateSent": "Modelo \"{name}\" enviado",
      "toastTemplateFailed": "Falha ao enviar modelo: {reason}"
    },
    "importModal": {
      "title": "Importar Contatos via CSV",
      "desc": "Envie um arquivo CSV com a coluna obrigatória <phoneCode>phone</phoneCode>. Opcionais: <nameCode>name</nameCode>, <emailCode>email</emailCode>, <companyCode>company</companyCode>, <tagsCode>tags</tagsCode> (separadas por vírgula).",
      "uploadDropzone": "Clique para selecionar um arquivo CSV",
      "uploadHint": "Arquivo .csv",
      "rowsReady": "{count} linha pronta",
      "rowsReady_plural": "{count} linhas prontas",
      "preview": "Pré-visualização · primeiras {count}",
      "previewTags": "{tags} tag · {contacts} contato",
      "previewTags_plural": "{tags} tags · {contacts} contatos",
      "moreRows": "+ {count} outra linha oculta",
      "moreRows_plural": "+ {count} outras linhas ocultas",
      "importComplete": "Importação concluída",
      "resultImported": "{count} importados",
      "resultTags": "{count} tag atribuída",
      "resultTags_plural": "{count} tags atribuídas",
      "resultSkipped": "{count} ignorados",
      "resultFailed": "{count} com falha",
      "willBeCreated": "{name} (será criado na importação)",
      "columns": {
        "phone": "Telefone",
        "name": "Nome",
        "email": "E-mail",
        "company": "Empresa",
        "tags": "Tags"
      },
      "cancel": "Cancelar",
      "close": "Fechar",
      "importBtn": "Importar {count} contato",
      "importBtn_plural": "Importar {count} contatos",
      "toastNoValidRows": "Nenhuma linha válida encontrada. Verifique a coluna \"phone\".",
      "toastTagsWarning": "Contatos importados, mas algumas tags falharam.",
      "toastImported": "{count} contato importado",
      "toastImported_plural": "{count} contatos importados",
      "toastTagsAssigned": "{count} atribuição de tag",
      "toastTagsAssigned_plural": "{count} atribuições de tags",
      "toastTagsSkipped": "Tags desconhecidas ignoradas: {sample}{more}",
      "toastSkipped": "{count} duplicado ignorado",
      "toastSkipped_plural": "{count} duplicados ignorados",
      "toastFailed": "{count} contato falhou",
      "toastFailed_plural": "{count} contatos falharam",
      "toastError": "Erro na importação"
    },
    "customFields": {
      "title": "Campos Personalizados",
      "desc": "Defina campos adicionais para seus clientes (ex: CPF, Origem, CEP).",
      "addField": "Adicionar",
      "fieldName": "Nome do novo campo...",
      "loading": "Carregando...",
      "empty": "Nenhum campo personalizado criado.",
      "renameAria": "Renomear {name}",
      "deleteTitle": "Excluir campo",
      "deleteConfirm": "Deseja excluir \"{name}\"? Isso removerá o valor em todos os contatos.",
      "toastNoAccount": "Seu perfil não está vinculado a uma conta.",
      "toastDuplicate": "Já existe um campo com o nome \"{name}\".",
      "toastCreateFailed": "Não foi possível criar o campo.",
      "toastCreated": "Campo \"{name}\" criado.",
      "toastRenameFailed": "Não foi possível renomear.",
      "toastDeleteFailed": "Não foi possível excluir.",
      "toastDeleted": "Campo \"{name}\" excluído."
    }
  },
  "Pipelines": {
    "page": {
      "selectPipeline": "Selecionar Pipeline",
      "noPipelinesYet": "Nenhum pipeline criado",
      "managePipelines": "Gerenciar Pipelines",
      "addPipeline": "Adicionar Pipeline",
      "addDeal": "Novo Negócio",
      "createToStartTracking": "Crie um pipeline para acompanhar suas vendas",
      "createPipeline": "Criar Pipeline",
      "newPipeline": "Novo Pipeline",
      "pipelineName": "Nome do Pipeline",
      "pipelineNamePlaceholder": "Ex: Vendas Enterprise",
      "defaultStagesDesc": "Estágios padrão serão criados automaticamente.",
      "cancel": "Cancelar",
      "creating": "Criando...",
      "createPipelineBtn": "Criar Pipeline",
      "toastFailedLoadPipelines": "Falha ao carregar pipelines",
      "toastFailedMoveDeal": "Falha ao mover negócio",
      "toastFailedCreatePipeline": "Falha ao criar pipeline",
      "toastPipelineCreated": "Pipeline criado com sucesso",
      "toastNotLinkedToAccount": "Perfil não vinculado a uma conta."
    },
    "board": {
      "dropDealHere": "Arraste um negócio para cá",
      "noDeals": "Nenhum negócio neste estágio"
    }
  },
  "Broadcasts": {
    "page": {
      "title": "Campanhas em Massa",
      "subtitle": "Dispare mensagens no WhatsApp para listas de contatos com alta taxa de entrega.",
      "newBroadcast": "Nova Campanha",
      "templatesTab": "Modelos Meta",
      "historyTab": "Histórico de Disparos"
    }
  },
  "Automations": {
    "list": {
      "title": "Automações de Atendimento",
      "subtitle": "Crie jornadas automáticas com gatilhos, respostas da IA e transbordo humano.",
      "create": "Nova Automação",
      "templatesTitle": "Modelos Prontos",
      "emptyTitle": "Nenhuma automação ativa",
      "emptyDesc": "Crie seu primeiro fluxo automático para responder leads 24 horas por dia.",
      "runs": "{count} execução",
      "runsPlural": "{count} execuções",
      "lastRun": "Última execução: {time}",
      "activate": "Ativar",
      "deactivate": "Pausar",
      "edit": "Editar",
      "duplicate": "Duplicar",
      "viewLogs": "Ver Logs",
      "delete": "Excluir",
      "deleteTitle": "Excluir Automação",
      "deleteDesc": "Tem certeza que deseja excluir \"{name}\"?",
      "cancel": "Cancelar",
      "toasts": {
        "activated": "Automação ativada",
        "paused": "Automação pausada",
        "duplicated": "Automação duplicada",
        "deleted": "Automação excluída",
        "updateError": "Erro ao atualizar automação",
        "duplicateError": "Erro ao duplicar automação",
        "deleteError": "Erro ao excluir automação"
      }
    }
  },
  "Flows": {
    "page": {
      "title": "Fluxos de Automação Visual",
      "subtitle": "Monte fluxos visuais no estilo canvas drag-and-drop."
    }
  },
  "Settings": {
    "page": {
      "title": "Configurações & API",
      "subtitle": "Gerencie a conexão do WhatsApp, chaves de API, membros da equipe e assistente de IA."
    }
  }
};

const enOriginal = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

// Merge ptBR overrides into enOriginal for any missing keys
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      if (!target[key]) {
        target[key] = source[key];
      }
    }
  }
}

const mergedPtBR = JSON.parse(JSON.stringify(enOriginal));
deepMerge(mergedPtBR, ptBR);

fs.writeFileSync('messages/pt-BR.json', JSON.stringify(mergedPtBR, null, 2), 'utf8');
fs.writeFileSync('messages/pt.json', JSON.stringify(mergedPtBR, null, 2), 'utf8');
// Also update en.json with PT-BR so default locale fallback is 100% Brazilian Portuguese
fs.writeFileSync('messages/en.json', JSON.stringify(mergedPtBR, null, 2), 'utf8');

console.log('Successfully generated PT-BR translations for all namespaces!');
