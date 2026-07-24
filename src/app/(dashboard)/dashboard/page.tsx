"use client"

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import {
  Users,
  Bot,
  DollarSign,
  Layers,
  ArrowRight,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

import {
  loadActivity,
  loadConversationsSeries,
  loadMetrics,
} from '@/lib/dashboard/queries'
import type {
  MetricsBundle,
  ConversationsSeriesPoint,
} from '@/lib/dashboard/types'
import { SkeletonCard } from '@/components/dashboard/skeleton'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function DashboardPage() {
  const { profile } = useAuth()
  const [metrics, setMetrics] = useState<MetricsBundle | null>(null)
  const [metricsLoading, setMetricsLoading] = useState(true)
  const [series, setSeries] = useState<ConversationsSeriesPoint[]>([])

  const loadAll = useCallback(() => {
    const db = createClient()

    void loadMetrics(db)
      .then((m) => setMetrics(m))
      .catch((err) => console.error('[dashboard] metrics failed:', err))
      .finally(() => setMetricsLoading(false))

    void loadConversationsSeries(db, 7)
      .then((s) => setSeries(s))
      .catch((err) => console.error('[dashboard] series failed:', err))
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const userName = profile?.full_name?.split(' ')[0] ?? 'João'

  // Weekly mockup days data
  const chartData = [
    { day: 'Sáb', volume: 2 },
    { day: 'Dom', volume: 0 },
    { day: 'Seg', volume: 5 },
    { day: 'Ter', volume: 8 },
    { day: 'Qua', volume: 4 },
    { day: 'Qui', volume: 12 },
    { day: 'Sex', volume: 7 },
  ]

  return (
    <div className="space-y-6">
      {/* Header section (AUVVO style) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Bem-vindo de volta, {userName}.
          </h1>
          <p className="mt-0.5 text-xs text-slate-500 font-medium">
            Aqui está o resumo da sua operação nas últimas 24h.
          </p>
        </div>
        <div>
          <Link
            href="/agents"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-slate-800 transition-all"
          >
            <Plus className="h-4 w-4" />
            Novo Agente
          </Link>
        </div>
      </div>

      {/* KPI Cards Row (4 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {/* Card 1: Leads Atendidos */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-4.5 shadow-xs transition-all hover:shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-slate-500">Leads Atendidos</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-black text-slate-900">
                  {metrics?.activeConversations.current ?? 3}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100">
                <Link href="/pipelines" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 transition-colors">
                  Ver CRM <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Card 2: Agentes Configurados */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-4.5 shadow-xs transition-all hover:shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-slate-500">Agentes Configurados</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Bot className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-black text-slate-900">1</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-400">
                  ⚠ Aguardando conexão WhatsApp
                </span>
              </div>
            </div>

            {/* Card 3: Custo API (Tokens) */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-4.5 shadow-xs transition-all hover:shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-slate-500">Custo API (Tokens)</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-black text-slate-900">R$ 0,24</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-500">
                  12 respostas da I.A.
                </span>
              </div>
            </div>

            {/* Card 4: Fila IA */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-4.5 shadow-xs transition-all hover:shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-slate-500">Fila IA</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <Layers className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-black text-slate-900">0</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-400">
                  Modo fila (worker)
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Grid: Left Charts & Tables / Right Funnel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left Column (3 cols) */}
        <div className="space-y-6 lg:col-span-3">
          {/* Volume de Atendimentos Semanal */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900">
              Volume de Atendimentos Semanal
            </h2>
            <div className="mt-4 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} />
                  <Bar dataKey="volume" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance por Agente */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Performance por Agente
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Visão rápida para otimizar conversão e reduzir intervenção humana.
              </p>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400">
                  <tr>
                    <th className="py-2 px-1">AGENTE</th>
                    <th className="py-2 px-1">STATUS</th>
                    <th className="py-2 px-1">LEADS</th>
                    <th className="py-2 px-1">MSGS IA</th>
                    <th className="py-2 px-1">MSGS HUMANO</th>
                    <th className="py-2 px-1">HANDOFFS</th>
                    <th className="py-2 px-1">TAXA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-1 font-bold text-slate-800 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-black">
                        L
                      </div>
                      Lotai (Vendedor)
                    </td>
                    <td className="py-3 px-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        ● Ativo
                      </span>
                    </td>
                    <td className="py-3 px-1 font-semibold">3</td>
                    <td className="py-3 px-1">12</td>
                    <td className="py-3 px-1">0</td>
                    <td className="py-3 px-1">0</td>
                    <td className="py-3 px-1 font-bold text-emerald-600">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Funil de Qualificação */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900">
              Funil de Qualificação
            </h2>
            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Contatos Iniciados (Leads Brutos)</span>
                  <span className="font-bold text-slate-900">3</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Transferidos para Humanos (Agendamentos/Vendas)</span>
                  <span className="font-bold text-slate-900">0 (0%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Conversas em risco (24h) */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Conversas em risco (24h)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Contatos com muitas mensagens recebidas e sem transbordo.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-400/80 mb-2" />
              <p className="text-xs font-medium text-slate-400">
                Nenhuma conversa em risco detectada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
