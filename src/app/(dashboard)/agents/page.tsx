'use client';

import { useEffect, useState } from 'react';
import { Bot, Sparkles, Settings2, BarChart3, Plus, Trash2, Edit3, CheckCircle2, Zap, Globe, Calendar, FileText, Database, Link2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AiPlayground } from '@/components/agents/ai-playground';
import { AiUsageCard } from '@/components/agents/ai-usage';
import { AiConfig } from '@/components/settings/ai-config';
import { useAuth } from '@/hooks/use-auth';
import { canEditSettings } from '@/lib/auth/roles';
import Link from 'next/link';

type Tab = 'agents' | 'playground' | 'setup' | 'usage';

export default function AgentsPage() {
  const { accountRole } = useAuth();
  const canViewUsage = accountRole ? canEditSettings(accountRole) : false;
  const [tab, setTab] = useState<Tab>('agents');
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/ai/config');
        const data = await res.json().catch(() => ({}));
        if (!cancelled) setDecided(true);
      } catch {
        if (!cancelled) setDecided(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Meus Agentes
        </h1>
        <p className="mt-0.5 text-xs text-slate-500 font-medium">
          Gerencie as inteligências da sua equipe. O cérebro executa integrações quando as instruções abaixo pedirem.{' '}
          <Link href="/automations" className="text-emerald-600 hover:underline">
            Automações
          </Link>{' '}
          — gatilhos e mensagens fixas.
        </p>
      </div>

      {/* Brain Capabilities Banner (Image 2 style) */}
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-xs font-bold text-slate-900">
            O que o cérebro pode fazer nesta conta
          </h2>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">
          Escreva no prompt do agente quando usar cada item — o backend executa, não é só texto.
        </p>

        {/* Integration Chips */}
        <div className="mt-3.5 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>WhatsApp (Ev...</span>
            <span className="rounded-md bg-emerald-100 px-1 py-0.2 text-[9px] font-extrabold text-emerald-700">
              ATIVO
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Google Calen...</span>
            <span className="rounded-md bg-emerald-100 px-1 py-0.2 text-[9px] font-extrabold text-emerald-700">
              ATIVO
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span>Google S...</span>
            <span className="rounded-md bg-slate-100 px-1 py-0.2 text-[9px] font-extrabold text-slate-600">
              DISPONÍVEL
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>CRM (tags, es...</span>
            <span className="rounded-md bg-emerald-100 px-1 py-0.2 text-[9px] font-extrabold text-emerald-700">
              ATIVO
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span>Webhooks...</span>
            <span className="rounded-md bg-slate-100 px-1 py-0.2 text-[9px] font-extrabold text-slate-600">
              DISPONÍVEL
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span>APIs / HT...</span>
            <span className="rounded-md bg-slate-100 px-1 py-0.2 text-[9px] font-extrabold text-slate-600">
              DISPONÍVEL
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Site da empresa</span>
            <span className="rounded-md bg-emerald-100 px-1 py-0.2 text-[9px] font-extrabold text-emerald-700">
              ATIVO
            </span>
          </div>
        </div>

        <div className="mt-3 text-[10px] font-medium text-slate-400">
          Recursos disponíveis — configure quando quiser:{' '}
          <Link href="/settings" className="underline hover:text-slate-600">
            Configurações
          </Link>{' '}
          •{' '}
          <Link href="/settings?tab=api" className="underline hover:text-slate-600">
            Integrações
          </Link>{' '}
          •{' '}
          <Link href="/settings?tab=whatsapp" className="underline hover:text-slate-600">
            Conexões
          </Link>
        </div>
      </div>

      {/* Agents List & Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList className="bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="agents" className="rounded-lg text-xs font-semibold">
            <Bot className="mr-1.5 h-3.5 w-3.5" /> Meus Agentes
          </TabsTrigger>
          <TabsTrigger value="playground" className="rounded-lg text-xs font-semibold">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Testar no Playground
          </TabsTrigger>
          <TabsTrigger value="setup" className="rounded-lg text-xs font-semibold">
            <Settings2 className="mr-1.5 h-3.5 w-3.5" /> Chaves & Configurações
          </TabsTrigger>
          {canViewUsage && (
            <TabsTrigger value="usage" className="rounded-lg text-xs font-semibold">
              <BarChart3 className="mr-1.5 h-3.5 w-3.5" /> Métricas / Consumo
            </TabsTrigger>
          )}
        </TabsList>

        {/* Tab 1: Meus Agentes Cards Grid */}
        <TabsContent value="agents" className="mt-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Existing Agent Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs transition-all hover:shadow-sm">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-bold text-sm">
                      L
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Lotai</h3>
                      <p className="text-xs text-slate-400 font-medium">Vendedor</p>
                    </div>
                  </div>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-100">
                    @ DeepSeek V3
                  </span>
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
                    ⚡ Transbordo
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-500 line-clamp-2 italic">
                  &quot;Você é o Lotai, assistente virtual da Lotai Barbearia...&quot;
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTab('setup')}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-slate-800 transition-all"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Editar
                </button>
              </div>
            </div>

            {/* Dotted "Criar Novo Agente" Card */}
            <div
              onClick={() => setTab('setup')}
              className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center transition-all hover:border-emerald-500/50 hover:bg-emerald-50/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-teal-700 shadow-2xs mb-3">
                <Plus className="h-6 w-6 stroke-[3]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Criar Novo Agente
              </h3>
              <p className="mt-1 text-xs text-slate-400 font-medium">
                Adicione uma nova inteligência
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Playground */}
        <TabsContent value="playground" className="mt-5">
          <AiPlayground onGoToSetup={() => setTab('setup')} />
        </TabsContent>

        {/* Tab 3: Setup */}
        <TabsContent value="setup" className="mt-5">
          <AiConfig />
        </TabsContent>

        {/* Tab 4: Usage */}
        {canViewUsage && (
          <TabsContent value="usage" className="mt-5">
            <AiUsageCard />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
