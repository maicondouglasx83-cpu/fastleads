'use client';

import { useEffect, useState } from 'react';
import { Bot, Sparkles, Settings2, BarChart3, Plus, Lock, Pencil, Zap, Calendar, Table, Tags, Webhook, Code2, Globe } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AiPlayground } from '@/components/agents/ai-playground';
import { AiUsageCard } from '@/components/agents/ai-usage';
import { AiConfig } from '@/components/settings/ai-config';
import { useAuth } from '@/hooks/use-auth';
import { canEditSettings } from '@/lib/auth/roles';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type Tab = 'playground' | 'setup' | 'usage';

export default function AgentsPage() {
  const { accountRole } = useAuth();
  const canViewUsage = accountRole ? canEditSettings(accountRole) : false;
  const [tab, setTab] = useState<Tab>('playground');
  const [decided, setDecided] = useState(false);
  const [activeAgent, setActiveAgent] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/ai/config');
        const data = await res.json().catch(() => ({}));
        if (!cancelled) setTab(data?.configured ? 'playground' : 'setup');
      } catch {
        if (!cancelled) setTab('setup');
      } finally {
        if (!cancelled) setDecided(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Meus Agentes
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Gerencie as inteligências da sua equipe. O cérebro executa integrações quando as instruções abaixo pedirem. <span className="text-slate-700 dark:text-slate-300 underline font-medium">Automações</span> = gatilhos e mensagens fixas.
        </p>
      </div>

      {/* Top Banner Card: O que o cérebro pode fazer nesta conta */}
      <Card className="p-5 border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            O que o cérebro pode fazer nesta conta
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Escreva no prompt do agente quando usar cada item — o backend executa, não é só texto.
        </p>

        {/* Integration Badges Horizontal Scroll Grid */}
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
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Google S...
              </span>
              <Badge variant="info" className="text-[9px] px-1.5 py-0">DISPONÍVEL</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Desligado</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> CRM (tags...
              </span>
              <Badge variant="success" className="text-[9px] px-1.5 py-0">ATIVO</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Sempre disponível</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Webhook...
              </span>
              <Badge variant="info" className="text-[9px] px-1.5 py-0">DISPONÍVEL</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Crie em Webhooks</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> APIs / HT...
              </span>
              <Badge variant="info" className="text-[9px] px-1.5 py-0">DISPONÍVEL</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Crie em Integrações</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/60 shadow-xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Site empresa
              </span>
              <Badge variant="success" className="text-[9px] px-1.5 py-0">ATIVO</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">Referência no prompt</span>
          </div>
        </div>
      </Card>

      {/* Agents Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Active Agent Card */}
        <Card className="p-5 flex flex-col justify-between border-border/80 shadow-xs hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Lotal</h3>
                  <p className="text-xs text-muted-foreground font-medium">Vendedor</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveAgent(!activeAgent)}
                className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${activeAgent ? 'bg-amber-400 justify-end' : 'bg-slate-300 justify-start'}`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs"></span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                DeepSeek V3
              </Badge>
              <Badge variant="purple">
                Transbordo
              </Badge>
            </div>

            <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
              Você é o Lotal, assistente virtual da Lotal Barbearia...
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-500 dark:bg-rose-950/40">
              <Lock className="h-4 w-4" />
            </div>
            <button
              type="button"
              onClick={() => setTab('setup')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary dark:text-primary-foreground text-xs font-semibold transition-colors"
            >
              <span>Editar</span>
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        </Card>

        {/* Create New Agent Card */}
        <div
          onClick={() => setTab('setup')}
          className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-card/40 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-50/10 transition-all duration-200 min-h-[200px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-400 mb-3">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Criar Novo Agente</h3>
          <p className="text-xs text-muted-foreground mt-1">Adicione uma nova inteligência</p>
        </div>
      </div>

      {/* Main Tabs (Playground, Setup, Usage) */}
      {decided && (
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as Tab)}
          className="mt-8"
        >
          <TabsList className="bg-card border border-border/80 p-1 rounded-xl">
            <TabsTrigger value="playground" className="rounded-lg text-xs font-medium">
              <Sparkles className="mr-1.5 h-4 w-4 text-emerald-500" /> Playground
            </TabsTrigger>
            <TabsTrigger value="setup" className="rounded-lg text-xs font-medium">
              <Settings2 className="mr-1.5 h-4 w-4" /> Setup
            </TabsTrigger>
            {canViewUsage && (
              <TabsTrigger value="usage" className="rounded-lg text-xs font-medium">
                <BarChart3 className="mr-1.5 h-4 w-4" /> Usage
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="playground" className="mt-4">
            <AiPlayground onGoToSetup={() => setTab('setup')} />
          </TabsContent>

          <TabsContent value="setup" className="mt-4">
            <AiConfig />
          </TabsContent>

          {canViewUsage && (
            <TabsContent value="usage" className="mt-4">
              <AiUsageCard />
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
}
