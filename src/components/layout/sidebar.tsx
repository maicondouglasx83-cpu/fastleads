"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useTotalUnread } from "@/hooks/use-total-unread";
import { useUnreadNotifications } from "@/hooks/use-unread-notifications";
import {
  Bell,
  Bot,
  BookOpen,
  Crown,
  GitBranch,
  Globe,
  LayoutDashboard,
  Link2,
  LogOut,
  Megaphone,
  MessageSquare,
  Puzzle,
  Radio,
  Settings,
  Shield,
  User,
  UserCog,
  UsersRound,
  Webhook,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import type { AccountRole } from "@/lib/auth/roles";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

const ROLE_CHIP: Record<
  AccountRole,
  { icon: typeof Crown; labelKey: string; className: string }
> = {
  owner: {
    icon: Crown,
    labelKey: "roleOwner",
    className: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  admin: {
    icon: Shield,
    labelKey: "roleAdmin",
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  agent: {
    icon: UserCog,
    labelKey: "roleAgent",
    className: "border-slate-200 bg-slate-100 text-slate-700",
  },
  viewer: {
    icon: User,
    labelKey: "roleViewer",
    className: "border-slate-200 bg-slate-50 text-slate-500",
  },
};

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  beta?: boolean;
  unreadCount?: number;
}

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const { profile, profileLoading, account, accountRole, signOut } = useAuth();
  const totalUnread = useTotalUnread();
  const unreadNotifications = useUnreadNotifications();

  const showAccountStrip =
    !profileLoading &&
    !!account?.name &&
    account.name !== profile?.full_name;

  useEffect(() => {
    onClose?.();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const mainNavItems: NavItem[] = [
    { href: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
    { href: "/agents", label: "Meus Agentes", icon: Bot },
    { href: "/inbox", label: "Chat ao Vivo", icon: MessageSquare, unreadCount: totalUnread },
    { href: "/flows", label: "Conhecimento", icon: BookOpen },
    { href: "/pipelines", label: "CRM", icon: GitBranch },
  ];

  const toolsNavItems: NavItem[] = [
    { href: "/settings?tab=whatsapp", label: "Conexões", icon: Link2 },
    { href: "/automations", label: "Automações", icon: Zap },
    { href: "/broadcasts", label: "Campanhas (Massa)", icon: Megaphone },
    { href: "/settings?tab=webhooks", label: "Webhooks", icon: Webhook },
    { href: "/settings?tab=api", label: "Integrações", icon: Puzzle },
    { href: "/settings", label: "Configurações & API", icon: Settings },
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-col border-r border-slate-200/80 bg-white shadow-xs",
          "transition-transform duration-200 ease-out will-change-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:z-0 lg:w-60 lg:translate-x-0 lg:transition-none"
        )}
        aria-label="Navegação Principal"
      >
        {/* Header / Logo FastLeads */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <Zap className="h-5 w-5 fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                FASTLEADS
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4">
          <ul className="flex flex-col gap-1">
            {mainNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all",
                      isActive
                        ? "bg-slate-100 text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-600" : "text-slate-500")} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.unreadCount && item.unreadCount > 0 ? (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
                        {item.unreadCount}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Category divider */}
          <div className="mt-6 mb-2 px-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CANAIS & FERRAMENTAS
            </span>
          </div>

          <ul className="flex flex-col gap-1">
            {toolsNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                      isActive
                        ? "bg-slate-100 text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-600" : "text-slate-400")} />
                    <span className="flex-1 truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / User Profile & Language */}
        <div className="shrink-0 border-t border-slate-100 p-3 bg-slate-50/50">
          <div className="mb-2.5 flex items-center justify-between px-2 text-[11px] font-medium text-slate-500">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 transition-colors">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>PT-BR</span>
              <span className="text-[9px]">▲</span>
            </div>
            {showAccountStrip && account?.name ? (
              <span className="truncate max-w-[100px] text-[10px] bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded-full" title={account.name}>
                {account.name}
              </span>
            ) : null}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200/60 bg-white p-2 text-left transition-all hover:border-slate-300 hover:shadow-2xs focus:outline-none">
              <Avatar className="size-8 shrink-0 rounded-lg">
                {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name ?? "Usuário"} />
                ) : null}
                <AvatarFallback className="bg-emerald-100 text-xs font-bold text-emerald-800 rounded-lg">
                  {profile?.full_name?.charAt(0)?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-800">
                  {profile?.full_name ?? "João Pedro"}
                </p>
                <p className="truncate text-[10px] text-emerald-600 font-medium">
                  Plano Anual ✓
                </p>
              </div>
              <LogOut className="h-4 w-4 text-slate-400 hover:text-slate-600 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" sideOffset={6} className="min-w-52 rounded-xl bg-white p-1 shadow-lg ring-1 ring-slate-200">
              <DropdownMenuItem render={<Link href="/settings?tab=profile" onClick={onClose} className="text-xs font-medium text-slate-700 hover:bg-slate-50" />}>
                <User className="mr-2 size-4 text-slate-400" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/settings" onClick={onClose} className="text-xs font-medium text-slate-700 hover:bg-slate-50" />}>
                <Settings className="mr-2 size-4 text-slate-400" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem onClick={signOut} className="text-xs font-medium text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 size-4 text-red-500" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}
