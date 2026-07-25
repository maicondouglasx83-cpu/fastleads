export function translateStageName(name: string): string {
  if (!name) return name;
  const map: Record<string, string> = {
    'New Lead': 'Novo Lead',
    'Qualified': 'Qualificado',
    'Proposal Sent': 'Proposta Enviada',
    'Negotiation': 'Negociação',
    'Won': 'Ganho',
    'Sales Pipeline': 'Pipeline de Vendas',
  };
  return map[name] ?? name;
}
