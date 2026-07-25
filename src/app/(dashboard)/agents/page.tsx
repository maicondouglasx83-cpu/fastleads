'use client';

import { useEffect, useState, useCallback } from 'react';
import { Bot, Sparkles, Settings2, BarChart3, Plus, Lock, Pencil, Zap, Play, CheckCircle2, XCircle, KeyRound, MessageSquare } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AiPlayground } from '@/components/agents/ai-playground';
import { AiUsageCard } from '@/components/agents/ai-usage';
import { AiConfig } from '@/components/settings/ai-config';
import { useAuth } from '@/hooks/use-auth';
import { canEditSettings } from '@/lib/auth/roles';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type Tab = 'agent' | 'playground' | 'setup' | 'usage';

interface AiConfigState {
  configured: boolean;
  has_key?: boolean;
  provider?: 'openai' | 'anthropic';
  model?: string;
  system_prompt?: string | null;
  is_active?: boolean;
  auto_reply_enabled?: boolean;
  auto_reply_max_per_conversation?: number;
  handoff_agent_id?: string | null;
}

export default function AgentsPage() {
  const { accountRole } = useAuth();
  const canViewUsage = accountRole ? canEditSettings(accountRole) : false;
  const [tab, setTab] = useState<Tab>('agent');
  const [loading, setLoading] = useState(true);
  const [aiConfig, setAiConfig] = useState<AiConfigState>({ configured: false });
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchAiConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/ai/config');
      const data = await res.json().catch(() => ({ configured: false }));
      if (res.ok && data) {
        setAiConfig(data);
      }
    } catch (err) {
      console.error('[AgentsPage] error fetching ai config:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAiConfig();
  }, [fetchAiConfig]);

  const handleToggleActive = async (nextActiveState: boolean) => {
    if (!aiConfig.has_key) {
      toast.error('Configure a chave de API nas Configurações antes de ativar o agente.');
      setTab('setup');
      return;
    }

    setUpdatingStatus(true);
    // Optimistic UI update
    setAiConfig((prev) => ({ ...prev, is_active: nextActiveState }));

    try {
      const res = await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: aiConfig.provider || 'openai',
          model: aiConfig.model || 'gpt-4o',
          system_prompt: aiConfig.system_prompt || null,
          is_active: nextActiveState,
          auto_reply_enabled: aiConfig.auto_reply_enabled ?? true,
          auto_reply_max_per_conversation: aiConfig.auto_reply_max_per_conversation ?? 3,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(nextActiveState ? 'Agente IA ativado com sucesso!' : 'Agente IA pausado.');
        void fetchAiConfig();
      } else {
        // Rollback
        setAiConfig((prev) => ({ ...prev, is_active: !nextActiveState }));
        toast.error(data.error || 'Falha ao atualizar status do agente.');
      }
    } catch {
      setAiConfig((prev) => ({ ...prev, is_active: !nextActiveState }));
      toast.error('Erro de conexão ao atualizar agente.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const modelDisplay = aiConfig.model
    ? aiConfig.model
    : aiConfig.provider === 'anthropic'
    ? 'Claude 3.5 Sonnet'
    : 'OpenAI GPT-4o';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Meus Agentes FastLeads
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Gerencie a inteligência artificial da sua empresa. O assistente FastLeads atende leads no WhatsApp, responde dúvidas e faz transbordo humano.
        </p>
      </div>

      {/* Top Banner Card: O que a inteligência FastLeads pode fazer nesta conta */}
      <Card className="p-5 border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            O que a inteligência FastLeads pode fazer nesta conta
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Defina o prompt do seu agente — o sistema analisa o contexto das conversas e executa automações em tempo real.
        </p>

        {/* Integration Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> WhatsApp
              </span>
              <Badge variant="success" className="text-[9px] px-1.5 py-0">ATIVO</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Conexão por agente</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Google Cal...
              </span>
              <Badge variant="success" className="text-[9px] px-1.5 py-0">ATIVO</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">OAuth conectado</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Google Sheets
              </span>
              <Badge variant="info" className="text-[9px] px-1.5 py-0">DISPONÍVEL</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Registro de leads</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> CRM Tags
              </span>
              <Badge variant="success" className="text-[9px] px-1.5 py-0">ATIVO</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Sempre disponível</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Webhooks
              </span>
              <Badge variant="info" className="text-[9px] px-1.5 py-0">DISPONÍVEL</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Crie em Webhooks</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> APIs / HTTP
              </span>
              <Badge variant="info" className="text-[9px] px-1.5 py-0">DISPONÍVEL</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Preset de integrações</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Base da Empresa
              </span>
              <Badge variant="success" className="text-[9px] px-1.5 py-0">ATIVO</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Conhecimento IA</span>
          </div>
        </div>
      </Card>

      {/* Main Tabs Navigation */}
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as Tab)}
        className="w-full"
      >
        <TabsList className="bg-card border border-border/80 p-1 rounded-xl">
          <TabsTrigger value="agent" className="rounded-lg text-xs font-semibold">
            <Bot className="mr-1.5 h-4 w-4 text-emerald-500" /> Agente Principal
          </TabsTrigger>
          <TabsTrigger value="playground" className="rounded-lg text-xs font-semibold">
            <Sparkles className="mr-1.5 h-4 w-4 text-amber-500" /> Testar no Playground
          </TabsTrigger>
          <TabsTrigger value="setup" className="rounded-lg text-xs font-semibold">
            <Settings2 className="mr-1.5 h-4 w-4" /> Configurar Chaves & Prompt
          </TabsTrigger>
          {canViewUsage && (
            <TabsTrigger value="usage" className="rounded-lg text-xs font-semibold">
              <BarChart3 className="mr-1.5 h-4 w-4" /> Consumo de Tokens
            </TabsTrigger>
          )}
        </TabsList>

        {/* Tab 1: Agent Card View */}
        <TabsContent value="agent" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Real Dynamic AI Agent Card */}
            <Card className="p-5 flex flex-col justify-between border-border/80 shadow-xs hover:shadow-md transition-all duration-200">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        Agente FastLeads
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        Atendimento & Vendas
                      </p>
                    </div>
                  </div>

                  {/* Active Toggle Switch */}
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleToggleActive(!aiConfig.is_active)}
                    title={aiConfig.is_active ? 'Pausar Agente' : 'Ativar Agente'}
                    className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      aiConfig.is_active
                        ? 'bg-emerald-500 justify-end'
                        : 'bg-slate-300 dark:bg-slate-700 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-xs"></span>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {modelDisplay}
                  </Badge>

                  {aiConfig.has_key ? (
                    aiConfig.is_active ? (
                      <Badge variant="success">ATIVO</Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-500">PAUSADO</Badge>
                    )
                  ) : (
                    <Badge variant="purple">AGUARDANDO CHAVE</Badge>
                  )}

                  {aiConfig.auto_reply_enabled && (
                    <Badge variant="purple">Transbordo Automático</Badge>
                  )}
                </div>

                <p className="mt-3 text-xs text-muted-foreground line-clamp-3 italic bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-border/60">
                  {aiConfig.system_prompt
                    ? aiConfig.system_prompt
                    : 'Prompt padrão: "Você é o assistente virtual da empresa, atenda o cliente de forma rápida e cordial..."'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setTab('playground')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <Play className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Testar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab('setup')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary dark:text-primary-foreground text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Editar Agente</span>
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>

            {/* Quick Configure Card */}
            <div
              onClick={() => setTab('setup')}
              className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-card/40 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-50/10 transition-all duration-200 min-h-[220px]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-400 mb-3">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Configurar Parâmetros do Agente</h3>
              <p className="text-xs text-muted-foreground mt-1">Altere o prompt, chaves OpenAI / Anthropic e opções de resposta</p>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Playground */}
        <TabsContent value="playground" className="mt-6">
          <AiPlayground onGoToSetup={() => setTab('setup')} />
        </TabsContent>

        {/* Tab 3: Setup / Configuration */}
        <TabsContent value="setup" className="mt-6">
          <AiConfig />
        </TabsContent>

        {/* Tab 4: Usage */}
        {canViewUsage && (
          <TabsContent value="usage" className="mt-6">
            <AiUsageCard />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
