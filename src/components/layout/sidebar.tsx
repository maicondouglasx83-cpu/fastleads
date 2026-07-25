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
  Crown,
  GitBranch,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Radio,
  Settings,
  Shield,
  User,
  UserCog,
  Users,
  UsersRound,
  Webhook,
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
    className: "border-primary/40 bg-primary/10 text-primary",
  },
  agent: {
    icon: UserCog,
    labelKey: "roleAgent",
    className: "border-border bg-muted text-foreground",
  },
  viewer: {
    icon: User,
    labelKey: "roleViewer",
    className: "border-border bg-card text-muted-foreground",
  },
};

interface NavItem {
  href: string;
  labelKey: string;
  fallbackLabel?: string;
  icon: typeof LayoutDashboard;
  beta?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: "/dashboard", labelKey: "dashboard", fallbackLabel: "Visão Geral", icon: LayoutDashboard },
  { href: "/agents", labelKey: "aiAgents", fallbackLabel: "Meus Agentes", icon: Bot },
  { href: "/inbox", labelKey: "inbox", fallbackLabel: "Chat ao Vivo", icon: MessageSquare },
  { href: "/notifications", labelKey: "notifications", fallbackLabel: "Conhecimento", icon: Bell },
  { href: "/contacts", labelKey: "contacts", fallbackLabel: "CRM", icon: Users },
  { href: "/pipelines", labelKey: "pipelines", fallbackLabel: "Pipelines", icon: GitBranch },
];

const channelNavItems: NavItem[] = [
  { href: "/settings?tab=whatsapp", labelKey: "connections", fallbackLabel: "Conexões", icon: Radio },
  { href: "/automations", labelKey: "automations", fallbackLabel: "Automações", icon: Zap },
  { href: "/broadcasts", labelKey: "broadcasts", fallbackLabel: "Campanhas (Massa)", icon: Radio },
  { href: "/flows", labelKey: "flows", fallbackLabel: "Webhooks / Fluxos", icon: Webhook, beta: true },
  { href: "/settings", labelKey: "settings", fallbackLabel: "Configurações & API", icon: Settings },
];

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

  const renderNavList = (items: NavItem[]) => (
    <ul className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && item.href !== "/settings" && pathname.startsWith(item.href));

        const showUnreadDot =
          item.href === "/inbox" && totalUnread > 0 && !isActive;

        const showNotificationBadge =
          item.href === "/notifications" && unreadNotifications > 0;

        let label = item.fallbackLabel || item.labelKey;
        try {
          label = t(item.labelKey as string);
        } catch {
          // Fallback if key is missing in translation namespace
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3.5 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400 group-hover:text-slate-900" />
              <span className="flex-1 truncate">{label}</span>
              {item.beta && (
                <span
                  aria-label={t("beta")}
                  className="rounded-full border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-300"
                >
                  {t("beta")}
                </span>
              )}
              {showUnreadDot && (
                <span
                  aria-label={t("unreadConversations", { count: totalUnread })}
                  className="relative flex h-2 w-2"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
              )}
              {showNotificationBadge && (
                <span
                  aria-label={t("unreadNotifications", { count: unreadNotifications })}
                  className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
                >
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <button
        type="button"
        aria-label={t("closeMenu")}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-col border-r border-border bg-sidebar",
          "transition-transform duration-200 ease-out will-change-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:z-0 lg:w-60 lg:translate-x-0 lg:transition-none",
        )}
        aria-label="Primary"
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-primary dark:text-primary-foreground shadow-xs">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground">
                FastLeads
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("closeMenu")}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation body */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {renderNavList(mainNavItems)}

          <div className="pt-2">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
              CANAIS & FERRAMENTAS
            </div>
            {renderNavList(channelNavItems)}
          </div>
        </nav>

        {/* Footer section: Language & User Profile */}
        <div className="shrink-0 border-t border-border p-3 space-y-2 bg-sidebar">
          {showAccountStrip && account?.name ? (
            <div className="flex items-center gap-2 px-3 text-xs text-muted-foreground">
              <UsersRound className="size-3.5 shrink-0" />
              <span className="truncate" title={account.name}>
                {account.name}
              </span>
              {accountRole ? (
                (() => {
                  const meta = ROLE_CHIP[accountRole];
                  const Icon = meta.icon;
                  return (
                    <span
                      className={`ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${meta.className}`}
                    >
                      <Icon className="size-3" />
                      {t(meta.labelKey as string)}
                    </span>
                  );
                })()
              ) : null}
            </div>
          ) : null}

          {/* Language selector indicator */}
          <div className="px-2">
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>PT-BR</span>
              <span className="text-[10px]">▲</span>
            </button>
          </div>

          {/* User Profile Card */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-xl border border-border/80 bg-background/50 p-2 text-left transition-colors hover:bg-muted/80 focus:outline-none">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="size-8 shrink-0 rounded-lg">
                  {profile?.avatar_url ? (
                    <AvatarImage
                      src={profile.avatar_url}
                      alt={profile.full_name ?? t("defaultAvatar")}
                    />
                  ) : null}
                  <AvatarFallback className="bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold rounded-lg">
                    {profile?.full_name?.charAt(0)?.toUpperCase() ??
                      profile?.email?.charAt(0)?.toUpperCase() ??
                      "J"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {profile?.full_name ?? t("defaultUser")}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground font-medium">
                    Plano Anual ✓
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  signOut();
                }}
                title={t("menuSignOut")}
                className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <LogOut className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={6}
              className="min-w-56 bg-popover text-popover-foreground ring-border"
            >
              <DropdownMenuItem
                render={
                  <Link
                    href="/settings?tab=profile"
                    onClick={onClose}
                    className="text-popover-foreground focus:bg-accent focus:text-accent-foreground"
                  />
                }
              >
                <User className="size-4" />
                {t("menuProfile")}
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    href="/settings?tab=whatsapp"
                    onClick={onClose}
                    className="text-popover-foreground focus:bg-accent focus:text-accent-foreground"
                  />
                }
              >
                <Settings className="size-4" />
                {t("menuSettings")}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={signOut}
                className="text-popover-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <LogOut className="size-4" />
                {t("menuSignOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}
