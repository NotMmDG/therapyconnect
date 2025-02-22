#!/bin/bash

# TherapyConnect CLI
# Automates installation, management, and SSL setup for TherapyConnect

PROJECT_DIR="$HOME/therapyconnect"
NGINX_CONF="$PROJECT_DIR/nginx.conf"
DOCKER_COMPOSE_FILE="$PROJECT_DIR/docker-compose.yml"

# Colors
GREEN="\e[32m"
CYAN="\e[36m"
YELLOW="\e[33m"
RED="\e[31m"
RESET="\e[0m"

# TherapyConnect ASCII Banner (THTEPVCEOO style)
display_banner() {
    echo -e "${CYAN}"
    echo " ████████╗██╗  ██╗████████╗███████╗██████╗ ██╗   ██╗██████╗ ██████╗ ███████╗ ██████╗ ██████╗ "
    echo " ╚══██╔══╝██║  ██║╚══██╔══╝██╔════╝██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔══██╗"
    echo "    ██║   ███████║   ██║   █████╗  ██████╔╝██║   ██║██████╔╝██████╔╝█████╗  ██║   ██║██████╔╝"
    echo "    ██║   ██╔══██║   ██║   ██╔══╝  ██╔═══╝ ╚██╗ ██╔╝██╔═══╝ ██╔═══╝ ██╔══╝  ██║   ██║██╔══██╗"
    echo "    ██║   ██║  ██║   ██║   ███████╗██║      ╚████╔╝ ██║     ██║     ███████╗╚██████╔╝██║  ██║"
    echo "    ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝       ╚═══╝  ╚═╝     ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝"
    echo -e "${RESET}"
}

# Install TherapyConnect
install() {
    display_banner
    echo -e "${GREEN}Installing TherapyConnect...${RESET}"

    # Update and install necessary dependencies
    echo -e "${YELLOW}Updating system and installing dependencies...${RESET}"
    sudo apt update && sudo apt upgrade -y
    sudo apt install -y curl socat docker-compose git
    
    # Ask for user input
    echo -e "${CYAN}Enter your email for SSL certificate:${RESET}"
    read EMAIL
    echo -e "${CYAN}Enter your domain (e.g., therapyconnect.info):${RESET}"
    read DOMAIN

    # Clone project
    echo -e "${YELLOW}Cloning TherapyConnect repository...${RESET}"
    git clone https://github.com/NotMmDG/therapyconnect.git "$PROJECT_DIR"

    # Generate SSL Certificates
    get_ssl

    # Update config files with domain
    echo -e "${YELLOW}Updating configuration files with your domain...${RESET}"
    sed -i "s/therapyconnect.info/$DOMAIN/g" "$NGINX_CONF"
    sed -i "s/therapyconnect.info/$DOMAIN/g" "$DOCKER_COMPOSE_FILE"

    # Start TherapyConnect
    echo -e "${GREEN}Starting TherapyConnect...${RESET}"
    (cd "$PROJECT_DIR" && docker-compose up -d --build)

    echo -e "${GREEN}TherapyConnect is now installed and running!${RESET}"
}

# Uninstall TherapyConnect
uninstall() {
    display_banner
    echo -e "${RED}Uninstalling TherapyConnect...${RESET}"
    (cd "$PROJECT_DIR" && docker-compose down)
    sudo rm -rf "$PROJECT_DIR"
    echo -e "${RED}TherapyConnect has been removed.${RESET}"
}

# Start TherapyConnect
start() {
    display_banner
    echo -e "${GREEN}Starting TherapyConnect...${RESET}"
    (cd "$PROJECT_DIR" && docker-compose up -d)
}

# Stop TherapyConnect
stop() {
    display_banner
    echo -e "${YELLOW}Stopping TherapyConnect...${RESET}"
    (cd "$PROJECT_DIR" && docker-compose down)
}

# Restart TherapyConnect
restart() {
    display_banner
    echo -e "${CYAN}Restarting TherapyConnect...${RESET}"
    stop
    start
}

# Update TherapyConnect
update() {
    display_banner
    echo -e "${YELLOW}Updating TherapyConnect...${RESET}"
    stop
    sudo rm -rf "$PROJECT_DIR"
    install
}

# Get SSL Certificate
get_ssl() {
    echo -e "${YELLOW}Getting SSL certificates for $DOMAIN...${RESET}"
    sudo docker run --rm -v certbot-ssl:/etc/letsencrypt certbot/certbot certonly \
        --standalone --agree-tos --no-eff-email \
        -m "$EMAIL" -d "$DOMAIN" -d "www.$DOMAIN"
    echo -e "${GREEN}SSL certificates obtained successfully!${RESET}"
}

# Help Command
help() {
    display_banner
    echo -e "${YELLOW}Available Commands:${RESET}"
    echo -e "${CYAN}therapyconnect install${RESET}   - Install TherapyConnect and configure SSL"
    echo -e "${CYAN}therapyconnect uninstall${RESET} - Uninstall TherapyConnect completely"
    echo -e "${CYAN}therapyconnect start${RESET}     - Start TherapyConnect services"
    echo -e "${CYAN}therapyconnect stop${RESET}      - Stop TherapyConnect services"
    echo -e "${CYAN}therapyconnect restart${RESET}   - Restart TherapyConnect services"
    echo -e "${CYAN}therapyconnect update${RESET}    - Update TherapyConnect to the latest version"
    echo -e "${CYAN}therapyconnect get-ssl${RESET}   - Generate new SSL certificates"
    echo -e "${CYAN}therapyconnect help${RESET}      - Show this help menu"
}

# Add CLI to /usr/local/bin for global use
setup_global_command() {
    echo -e "${YELLOW}Setting up global command...${RESET}"
    sudo cp "$0" /usr/local/bin/therapyconnect
    sudo chmod +x /usr/local/bin/therapyconnect
    echo -e "${GREEN}You can now use 'therapyconnect' from anywhere!${RESET}"
}

# Main CLI logic
case "$1" in
    install) install ;;
    uninstall) uninstall ;;
    start) start ;;
    stop) stop ;;
    restart) restart ;;
    update) update ;;
    get-ssl) get_ssl ;;
    help) help ;;
    setup) setup_global_command ;;
    *)
        display_banner
        echo -e "${RED}Error: Invalid command '${1}'${RESET}"
        help
        exit 1
        ;;
esac
