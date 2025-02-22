#!/bin/bash

THERAPYCONNECT_DIR="/root/therapyconnect"
ENV_FILE="$THERAPYCONNECT_DIR/.env"
NGINX_CONF="/etc/nginx/sites-available/therapyconnect"

BANNER="""
████████╗██╗  ██╗████████╗███████╗██████╗ ██╗   ██╗ ██████╗███████╗███╗   ██╗████████╗
╚══██╔══╝██║  ██║╚══██╔══╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝████╗  ██║╚══██╔══╝
   ██║   ███████║   ██║   █████╗  ██████╔╝██║   ██║██║     █████╗  ██╔██╗ ██║   ██║   
   ██║   ██╔══██║   ██║   ██╔══╝  ██╔═══╝ ██║   ██║██║     ██╔══╝  ██║╚██╗██║   ██║   
   ██║   ██║  ██║   ██║   ███████╗██║     ╚██████╔╝╚██████╗███████╗██║ ╚████║   ██║   
   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝      ╚═════╝  ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
"""

echo -e "\e[34m$BANNER\e[0m"

autodetect_ports() {
  sudo systemctl stop nginx &>/dev/null
  sudo systemctl stop apache2 &>/dev/null
  sudo ufw allow 80/tcp &>/dev/null
  sudo ufw allow 443/tcp &>/dev/null
}

install_therapyconnect() {
  echo "Installing TherapyConnect..."
  sudo apt update -y && sudo apt upgrade -y
  sudo apt install -y curl socat docker-compose git certbot
  
  read -p "Enter your email: " EMAIL
  read -p "Enter your domain: " DOMAIN
  echo -e "${YELLOW}Cloning TherapyConnect repository...${RESET}"
  git clone https://github.com/NotMmDG/therapyconnect.git "$THERAPYCONNECT_DIR"
  echo "DOMAIN=$DOMAIN" > $ENV_FILE
  echo "EMAIL=$EMAIL" >> $ENV_FILE

  autodetect_ports
  sudo certbot certonly --standalone --preferred-challenges http --email $EMAIL -d $DOMAIN -d www.$DOMAIN || {
    echo "Failed to obtain SSL certificates!"
    exit 1
  }

  echo "Updating configuration files with your domain..."
  sed -i "s|DOMAIN|$DOMAIN|g" $NGINX_CONF

  echo "Starting TherapyConnect..."
  docker-compose -f $THERAPYCONNECT_DIR/docker-compose.yml up -d
  echo "TherapyConnect is now installed and running!"
}

uninstall_therapyconnect() {
  echo "Stopping and removing TherapyConnect..."
  docker-compose -f $THERAPYCONNECT_DIR/docker-compose.yml down
  rm -rf $THERAPYCONNECT_DIR
  sudo rm -f /usr/local/bin/therapyconnect
  echo "TherapyConnect has been uninstalled."
}

start_therapyconnect() {
  docker-compose -f $THERAPYCONNECT_DIR/docker-compose.yml up -d
}

stop_therapyconnect() {
  docker-compose -f $THERAPYCONNECT_DIR/docker-compose.yml down
}

restart_therapyconnect() {
  stop_therapyconnect
  start_therapyconnect
}

update_therapyconnect() {
  stop_therapyconnect
  uninstall_therapyconnect
  install_therapyconnect
}

get_ssl() {
  read -p "Enter your email: " EMAIL
  read -p "Enter your domain: " DOMAIN
  
  sudo certbot certonly --standalone --preferred-challenges http --email $EMAIL -d $DOMAIN -d www.$DOMAIN
}

help_menu() {
  echo "\e[32mAvailable Commands:\e[0m"
  echo " install        - Install TherapyConnect"
  echo " uninstall      - Uninstall TherapyConnect"
  echo " start          - Start TherapyConnect"
  echo " stop           - Stop TherapyConnect"
  echo " restart        - Restart TherapyConnect"
  echo " update         - Update TherapyConnect"
  echo " get-ssl        - Obtain SSL certificates"
  echo " help           - Show available commands"
}

if [ "$1" == "install" ]; then
  install_therapyconnect
elif [ "$1" == "uninstall" ]; then
  uninstall_therapyconnect
elif [ "$1" == "start" ]; then
  start_therapyconnect
elif [ "$1" == "stop" ]; then
  stop_therapyconnect
elif [ "$1" == "restart" ]; then
  restart_therapyconnect
elif [ "$1" == "update" ]; then
  update_therapyconnect
elif [ "$1" == "get-ssl" ]; then
  get_ssl
else
  help_menu
fi

# Add to system path
sudo cp "$0" /usr/local/bin/therapyconnect
sudo chmod +x /usr/local/bin/therapyconnect
