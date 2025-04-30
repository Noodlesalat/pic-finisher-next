#!/bin/bash
sysctl -w net.ipv4.conf.tailscale0.route_localnet=1
# comfyui
iptables -t nat -A PREROUTING -i tailscale0 -p tcp --dport 8188 -j DNAT --to-destination 127.0.0.1:8188
#sysctl -w net.ipv4.conf.tailscale0.route_localnet=0
#iptables -t nat -D PREROUTING -i tailscale0 -p tcp --dport 8188 -j DNAT --to-destination 127.0.0.1:8188
