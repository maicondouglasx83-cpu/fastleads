"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Menu, Settings as SettingsIcon, User } from "lucide-react";
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
import { ModeToggle } from "@/components/layout/mode-toggle";
import { useTranslations } from "next-intl";

const pageTitles: Record<string, string> = {
  "/dashboard": "Visão Geral",
  "/agents": "Meus Agentes",
  "/inbox": "Chat ao Vivo",
  "/notifications": "Conhecimento",
  "/contacts": "CRM / Contatos",
  "/pipelines": "Pipelines de Vendas",
  "/broadcasts": "Campanhas (Massa)",
  "/automations": "Automações",
  "/flows": "Fluxos de Automação",
  "/settings": "Configurações & API",
};

function getPageTitleKey(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const match = Object.entries(pageTitles).find(([path]) =>
    pathname.startsWith(path),
  );
  return match ? match[1] : "Visão Geral";
}

interface HeaderProps {
  onOpenSidebar?: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  const titleText = getPageTitleKey(pathname);

  const initial =
    profile?.full_name?.charAt(0)?.toUpperCase() ??
    profile?.email?.charAt(0)?.toUpperCase() ??
    "J";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-background/90 backdrop-blur-md px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label={t("openMenu")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="truncate text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {titleText}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-2.5 py-1.5 transition-all hover:bg-muted/70 focus:outline-none"
            aria-label={t("openAccountMenu")}
          >
            <Avatar className="size-7 rounded-lg">
              {profile?.avatar_url ? (
                <AvatarImage
                  src={profile.avatar_url}
                  alt={profile.full_name ?? t("defaultAvatar")}
                />
              ) : null}
              <AvatarFallback className="bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold rounded-lg">
                {initial}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-xs font-semibold text-foreground sm:inline truncate max-w-[120px]">
              {profile?.full_name ?? t("defaultUser")}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="min-w-56 rounded-xl bg-popover text-popover-foreground ring-border shadow-md"
          >
            <div className="px-3 py-2">
              <p className="truncate text-xs font-bold text-foreground">
                {profile?.full_name ?? t("defaultUser")}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                {profile?.email ?? ""}
              </p>
            </div>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              render={
                <Link
                  href="/settings?tab=profile"
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
                  className="text-popover-foreground focus:bg-accent focus:text-accent-foreground"
                />
              }
            >
              <SettingsIcon className="size-4" />
              {t("menuSettings")}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={signOut}
              className="text-popover-foreground focus:bg-accent focus:text-accent-foreground text-rose-600 dark:text-rose-400"
            >
              <LogOut className="size-4" />
              {t("menuSignOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
