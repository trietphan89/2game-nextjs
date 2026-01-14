#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

show_status() {
    echo -e "${BLUE}=========================================="
    echo "📊 2GAME.VN Services Status"
    echo -e "==========================================${NC}"
    echo ""
    echo -e "${YELLOW}Frontend (2GAME.VN):${NC}"
    sudo systemctl status 2game-frontend.service --no-pager -l | head -10
    echo ""
    echo -e "${YELLOW}Backend (Admin CMS):${NC}"
    sudo systemctl status 2game-backend.service --no-pager -l | head -10
    echo ""
}

start_all() {
    echo -e "${YELLOW}Starting all services...${NC}"
    sudo systemctl start 2game-frontend.service
    sudo systemctl start 2game-backend.service
    sleep 2
    echo -e "${GREEN}✓ Services started${NC}"
    show_status
}

stop_all() {
    echo -e "${YELLOW}Stopping all services...${NC}"
    sudo systemctl stop 2game-frontend.service
    sudo systemctl stop 2game-backend.service
    sleep 2
    echo -e "${GREEN}✓ Services stopped${NC}"
}

restart_all() {
    echo -e "${YELLOW}Restarting all services...${NC}"
    sudo systemctl restart 2game-frontend.service
    sudo systemctl restart 2game-backend.service
    sleep 2
    echo -e "${GREEN}✓ Services restarted${NC}"
    show_status
}

show_logs() {
    echo -e "${BLUE}=========================================="
    echo "📋 Service Logs"
    echo -e "==========================================${NC}"
    echo ""
    echo "Choose which logs to view:"
    echo "  1) Frontend logs"
    echo "  2) Backend logs"
    echo "  3) Both (split view)"
    echo ""
    read -p "Choice (1-3): " choice

    case $choice in
        1)
            echo -e "${YELLOW}Frontend logs (Ctrl+C to exit):${NC}"
            sudo journalctl -u 2game-frontend -f
            ;;
        2)
            echo -e "${YELLOW}Backend logs (Ctrl+C to exit):${NC}"
            sudo journalctl -u 2game-backend -f
            ;;
        3)
            echo -e "${YELLOW}Recent logs from both services:${NC}"
            echo ""
            echo -e "${BLUE}=== Frontend ===${NC}"
            sudo journalctl -u 2game-frontend -n 20 --no-pager
            echo ""
            echo -e "${BLUE}=== Backend ===${NC}"
            sudo journalctl -u 2game-backend -n 20 --no-pager
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            ;;
    esac
}

show_help() {
    echo -e "${BLUE}=========================================="
    echo "🔧 2GAME.VN Service Manager"
    echo -e "==========================================${NC}"
    echo ""
    echo "Usage: ./manage-services.sh [command]"
    echo ""
    echo "Commands:"
    echo "  status      Show service status"
    echo "  start       Start all services"
    echo "  stop        Stop all services"
    echo "  restart     Restart all services"
    echo "  logs        View service logs"
    echo "  help        Show this help"
    echo ""
    echo "URLs:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:30001/admin"
    echo ""
}

# Main script
case "$1" in
    status)
        show_status
        ;;
    start)
        start_all
        ;;
    stop)
        stop_all
        ;;
    restart)
        restart_all
        ;;
    logs)
        show_logs
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        show_help
        ;;
esac
