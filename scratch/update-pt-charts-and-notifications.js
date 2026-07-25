const fs = require('fs');

const ptBR = JSON.parse(fs.readFileSync('messages/pt-BR.json', 'utf8'));

ptBR.Dashboard = {
  ...ptBR.Dashboard,
  quickActions: {
    newContact: "Novo Contato",
    newDeal: "Novo Negócio",
    newBroadcast: "Nova Campanha",
    newAutomation: "Nova Automação"
  },
  conversationsChart: {
    title: "Conversas ao Longo do Tempo",
    description: "Volume diário de mensagens por direção",
    days: "{count} dias",
    noActivity: "Nenhuma mensagem no período",
    noActivityHint: "Envie ou receba mensagens no WhatsApp para popular o gráfico.",
    incoming: "Recebidas",
    outgoing: "Enviadas"
  },
  pipelineDonut: {
    title: "Valor do Pipeline",
    description: "Negócios abertos por estágio",
    noOpenDeals: "Nenhum negócio aberto ainda",
    noOpenDealsHint: "Crie negócios em Pipelines para visualizar o gráfico aqui.",
    dealCount: "{count} {count, plural, =1 {negócio} other {negócios}}"
  },
  responseTimeChart: {
    title: "Tempo Médio de Primeiras Respostas",
    description: "Minutos para responder ao primeiro contato do cliente, por dia da semana",
    target: "meta {minutes}m",
    thisWeek: "Esta semana:",
    lastWeek: "Semana passada:",
    noReplies: "Nenhuma resposta registrada ainda",
    noRepliesHint: "Responda a clientes no Chat ao Vivo para visualizar métricas de tempo.",
    category: "Média (min)"
  }
};

ptBR.Notifications = {
  title: "Notificações",
  description: "Conversas que outros membros da equipe atribuírem a você aparecerão aqui.",
  markAllRead: "Marcar tudo como lido",
  noNotifications: "Nenhuma notificação ainda",
  noNotificationsHint: "Você receberá um alerta aqui quando alguém lhe atribuir uma conversa.",
  retry: "Tentar novamente",
  toastMarkReadFailed: "Falha ao marcar notificação como lida",
  toastMarkAllReadFailed: "Falha ao marcar todas como lidas"
};

ptBR.Pipelines = {
  ...ptBR.Pipelines,
  board: {
    ...ptBR.Pipelines?.board,
    dropDealHere: "Arraste um negócio para cá",
    addDeal: "Novo Negócio"
  },
  analytics: {
    ...ptBR.Pipelines?.analytics,
    totalDeals: "TOTAL DE NEGÓCIOS",
    pipelineValue: "VALOR DO PIPELINE",
    avgDealSize: "TICKET MÉDIO",
    weightedValue: "VALOR PONDERADO",
    wonThisMonth: "GANHOS ESTE MÊS",
    lostThisMonth: "PERDIDOS ESTE MÊS",
    totalDealsTooltip: "Total de negócios no pipeline excluindo os marcados como Perdidos.",
    pipelineValueTooltip: "Soma do valor em dinheiro de todos os negócios no pipeline.",
    avgDealSizeTooltip: "Valor do Pipeline dividido pelo Total de Negócios.",
    weightedValueTooltip: "Receita estimada multiplicada pela probabilidade de cada estágio.",
    wonThisMonthTooltip: "Negócios marcados como Ganho este mês.",
    lostThisMonthTooltip: "Negócios marcados como Perdido este mês.",
    howCalculated: "Como {label} é calculado"
  }
};

fs.writeFileSync('messages/pt-BR.json', JSON.stringify(ptBR, null, 2), 'utf8');
fs.writeFileSync('messages/pt.json', JSON.stringify(ptBR, null, 2), 'utf8');
fs.writeFileSync('messages/en.json', JSON.stringify(ptBR, null, 2), 'utf8');

console.log('Successfully updated Dashboard, Notifications, and Pipelines chart translations!');
