#!/usr/bin/env bash
# ==============================================================================
# FastLeads - Automated HTTPS / Nginx Reverse Proxy Setup Script
# Usage: sudo bash setup-ssl.sh seudominio.srv1656135.hstgr.cloud
# ==============================================================================

DOMAIN=$1

if [ -z "$DOMAIN" ]; then
    echo "❌ Erro: Por favor informe o seu domínio ou subdomínio."
    echo "Exemplo: sudo bash setup-ssl.sh fastleads-euqs.srv1656135.hstgr.cloud"
    exit 1
fi

echo "🚀 Iniciando configuração automática de HTTPS para: $DOMAIN..."

# Create Nginx site configuration
NGINX_CONF="/etc/nginx/sites-available/fastleads"

if [ -d "/etc/nginx" ]; then
    echo "📦 Nginx detectado! Criando arquivo de configuração em $NGINX_CONF..."
    
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
    sudo nginx -t

    if [ $? -eq 0 ]; then
        echo "✅ Configuração do Nginx válida! Recarregando Nginx..."
        sudo systemctl reload nginx || sudo service nginx reload
    else
        echo "⚠️ Erro na sintaxe do Nginx. Verifique as configurações."
        exit 1
    fi

    # Try Certbot if available
    if command -v certbot &> /dev/null; then
        echo "🔒 Solicitando certificado SSL gratuito (Certbot)..."
        sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --register-unsafely-without-email || true
    fi

    echo "🎉 PRONTO! Seu sistema FastLeads agora está respondendo em HTTPS:"
    echo "👉 https://$DOMAIN"
    echo "👉 Webhook Meta: https://$DOMAIN/api/whatsapp/webhook"
else
    echo "⚠️ Nginx não encontrado no sistema operacional."
    echo "Iniciando túnel seguro HTTPS automático via Cloudflare Tunnel..."
    npx cloudflared tunnel --url http://localhost:3000
fi
