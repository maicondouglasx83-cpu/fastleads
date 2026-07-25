#!/usr/bin/env bash
# ==============================================================================
# FastLeads - Automated HTTPS Setup Script for Hostinger / Docker
# ==============================================================================

DOMAIN=$1

echo "🚀 Iniciando configuração automática de HTTPS do FastLeads..."

if [ -d "/etc/nginx" ] && command -v nginx &> /dev/null; then
    echo "📦 Nginx detectado! Criando arquivo de configuração..."
    NGINX_CONF="/etc/nginx/sites-available/fastleads"
    cat <<EOF | sudo tee $NGINX_CONF > /dev/null
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
    sudo ln -sf $NGINX_CONF /etc/nginx/sites-enabled/fastleads
    sudo nginx -t && sudo systemctl reload nginx
    echo "✅ Nginx configurado!"
else
    echo "🐳 Nginx nativo não encontrado. Ativando Túnel HTTPS em container Docker..."
    docker stop fastleads-tunnel 2>/dev/null || true
    docker rm fastleads-tunnel 2>/dev/null || true
    docker run -d --name fastleads-tunnel --network host cloudflare/cloudflared:latest tunnel --url http://localhost:3000

    echo "⏳ Aguardando inicialização do túnel SSL..."
    sleep 5

    TUNNEL_URL=$(docker logs fastleads-tunnel 2>&1 | grep -o 'https://[a-zA-Z0-9-]*\.trycloudflare\.com' | head -n 1)

    if [ -n "$TUNNEL_URL" ]; then
        echo ""
        echo "=========================================================================="
        echo "🎉 TÚNEL HTTPS CRIADO COM SUCESSO!"
        echo "=========================================================================="
        echo "👉 Seu sistema FastLeads: $TUNNEL_URL"
        echo "👉 URL do Webhook na Meta: $TUNNEL_URL/api/whatsapp/webhook"
        echo "=========================================================================="
        echo ""
    else
        echo "ℹ️ O túnel Docker foi iniciado! Veja os logs com: docker logs fastleads-tunnel"
    fi
fi
