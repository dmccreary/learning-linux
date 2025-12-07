---
title: Networking Fundamentals
description: Master IP addresses, DNS, network interfaces, and diagnostic tools like ping, traceroute, and curl
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# Networking Fundamentals

## Summary

This chapter introduces essential networking concepts and commands. You'll learn about IP addresses, DNS, and network interfaces, then master diagnostic tools like ping, traceroute, netstat, and ss. You'll also learn to transfer files with curl and wget. These networking fundamentals are crucial for troubleshooting connectivity issues and working with remote systems.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Network Basics
2. IP Address
3. MAC Address
4. DNS
5. Hostname Resolution
6. Network Interfaces
7. Ifconfig Command
8. Ip Command
9. Ping Command
10. Traceroute Command
11. Netstat Command
12. Ss Command
13. Curl Command
14. Wget Command
15. Network Ports
16. WiFi Configuration
17. Network Troubleshooting

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Getting Started with the Terminal](../02-terminal-basics/index.md)
- [Chapter 3: Basic Shell Commands and Help Systems](../03-shell-commands/index.md)

---

## Welcome to the Network Layer!

Every time you open a website, send a message, or stream a video, your computer is having thousands of tiny conversations with other computers around the world. Understanding networking is like learning to read the mail system of the internet—and trust me, it's WAY more interesting than actual mail!

In this chapter, you'll learn how data travels across networks, how to diagnose problems when things go wrong, and how to become the person everyone calls when "the internet is broken." (Spoiler: it's usually DNS. It's ALWAYS DNS.)

## Network Basics: How Computers Talk

At its core, **network basics** boil down to this: computers need a way to find each other and send messages back and forth. Think of it like a massive postal system, but instead of addresses like "123 Main Street," we use numbers.

Networks are organized in layers, with each layer handling a specific job. This is formalized in the **OSI Model** (Open Systems Interconnection)—a seven-layer cake of networking goodness.

<details markdown="1">
<summary>MicroSim: OSI Seven-Layer Network Stack</summary>
**Description:** Interactive diagram showing the OSI seven-layer networking stack with hover-based explanations.

**Layout:**
- Left side: Vertical stack of 7 colored layers (Application at top, Physical at bottom)
- Right side: Info box that updates when user hovers over each layer
- Each layer should have: name, number, brief description, example protocols, and a real-world analogy

**Layers (top to bottom):**
1. Application (Layer 7) - HTTP, FTP, SMTP - "The app you're using"
2. Presentation (Layer 6) - SSL/TLS, JPEG, ASCII - "Data formatting and encryption"
3. Session (Layer 5) - NetBIOS, RPC - "Managing connections"
4. Transport (Layer 4) - TCP, UDP - "Reliable delivery vs speed"
5. Network (Layer 3) - IP, ICMP - "Routing between networks"
6. Data Link (Layer 2) - Ethernet, WiFi - "Local network communication"
7. Physical (Layer 1) - Cables, Radio waves - "Actual electrical signals"

**Interactivity:**
- Hover over any layer to see detailed explanation in info box
- Info box shows: Layer name, protocols, analogy (e.g., "Like the envelope for your letter")
- Optional: Click to "freeze" info box content
- Visual indication of which layer is currently selected

**Colors:** Use distinct, professional colors for each layer (rainbow gradient works well)

**Skill:** Use microsim-p5 to implement this visualization
</details>

### The Postal Analogy

When you send a letter:

1. You write the message (Application layer)
2. Put it in an envelope with an address (Network layer)
3. The mail carrier picks it up (Data Link layer)
4. Trucks and planes move it physically (Physical layer)

Networks work the same way, just MUCH faster and with more acronyms!

## IP Address: Your Computer's Phone Number

An **IP address** is a unique number that identifies your computer on a network. Without it, other computers wouldn't know where to send data back to you.

There are two versions:

### IPv4 (The Classic)

```
192.168.1.100
```

Four numbers from 0-255, separated by dots. That's 4 billion possible addresses, which seemed like a lot in the 1980s. (Narrator: It was not enough.)

### IPv6 (The Future)

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

Eight groups of hexadecimal numbers. That's 340 undecillion addresses—enough for every grain of sand on Earth to have billions of IP addresses. We're set for a while.

### Special IP Addresses

| Address | Meaning |
|---------|---------|
| `127.0.0.1` | Localhost (your own computer) |
| `192.168.x.x` | Private network (home/office) |
| `10.x.x.x` | Private network (larger organizations) |
| `0.0.0.0` | "Any" address (used in configurations) |
| `255.255.255.255` | Broadcast to everyone on network |

```sh
# Find your IP address
ip addr show
hostname -I

# Your public IP (what the internet sees)
curl ifconfig.me
```

!!! tip "Public vs Private IP"
    Your home network uses private IPs (like 192.168.1.x). Your router has ONE public IP that the whole internet sees. This is called NAT (Network Address Translation)—it's how millions of devices share limited IPv4 addresses.

## MAC Address: The Hardware Fingerprint

A **MAC address** (Media Access Control) is a unique identifier burned into your network card at the factory. It's like a serial number that never changes.

```
00:1A:2B:3C:4D:5E
```

Six pairs of hexadecimal digits. Every network device in the world has a unique one!

```sh
# View your MAC addresses
ip link show
# or
cat /sys/class/net/*/address
```

### IP vs MAC: What's the Difference?

| Feature | IP Address | MAC Address |
|---------|------------|-------------|
| Assigned by | Network/DHCP | Manufacturer |
| Can change? | Yes (dynamic) | No (permanent) |
| Scope | Global routing | Local network only |
| Format | Numbers (IPv4/IPv6) | Hexadecimal pairs |

Think of it this way: your MAC address is like your name (permanent), while your IP address is like your current phone number (can change when you move).

## DNS: The Internet's Phone Book

**DNS** (Domain Name System) translates human-readable names into IP addresses. Because nobody wants to memorize `142.250.80.46` when they can just type `google.com`.

```sh
# Look up a domain's IP address
nslookup google.com
dig google.com
host google.com

# See your DNS servers
cat /etc/resolv.conf

# Flush DNS cache (if using systemd-resolved)
sudo systemd-resolve --flush-caches
```

### How DNS Works

1. You type `example.com` in your browser
2. Your computer asks your router's DNS server
3. That server asks a root DNS server
4. The root server points to the `.com` servers
5. The `.com` server points to `example.com`'s DNS
6. Finally, you get the IP address!

All this happens in milliseconds. DNS is basically magic.

<details markdown="1">
<summary>MicroSim: DNS Resolution Journey</summary>
**Description:** Animated visualization showing a DNS query traveling through the DNS hierarchy.

**Elements:**
- User's computer (left side)
- Local DNS resolver
- Root DNS server (labeled with ".")
- TLD server (labeled ".com", ".org", etc.)
- Authoritative DNS server
- Final response traveling back

**Animation:**
- Packet (small envelope icon) travels from computer to resolver
- Resolver checks cache (show "Cache Miss" or "Cache Hit")
- If miss: packet travels through hierarchy
- Each server responds with "Ask this server instead" until final answer
- Response travels back through chain
- Total time counter showing milliseconds

**Interactivity:**
- Slider to control animation speed
- Dropdown to select different domains to resolve
- Toggle to show/hide cache at each level
- "Break" button to simulate a DNS failure

**Skill:** Use microsim-p5 to implement this visualization
</details>

!!! warning "When the Internet is 'Down'"
    90% of "the internet is broken" problems are actually DNS issues. If you can ping an IP address but not a domain name, DNS is your culprit!

## Hostname Resolution: Local Name Lookups

**Hostname resolution** is the process of turning a name into an IP address. DNS is part of this, but there's also a local file:

```sh
# The hosts file - local DNS override
cat /etc/hosts

# Example contents:
# 127.0.0.1   localhost
# 192.168.1.50   myserver
# 192.168.1.51   printer
```

The `/etc/hosts` file is checked BEFORE DNS. This is useful for:

- Blocking websites (point them to 127.0.0.1)
- Testing local servers with friendly names
- Overriding DNS for development

```sh
# Add a local hostname (requires sudo)
echo "192.168.1.100 mypi" | sudo tee -a /etc/hosts

# Now you can use:
ping mypi
ssh mypi
```

## Network Interfaces: Your Network Connections

**Network interfaces** are the connection points between your computer and networks. Each physical or virtual network connection gets its own interface.

Common interface names:

| Name | Type |
|------|------|
| `eth0`, `enp0s3` | Wired Ethernet |
| `wlan0`, `wlp2s0` | Wireless WiFi |
| `lo` | Loopback (localhost) |
| `docker0` | Docker bridge |
| `virbr0` | Virtual machine bridge |

```sh
# List all interfaces
ip link show
ls /sys/class/net/

# Show interface details
ip addr show eth0
```

The weird names like `enp0s3` are "predictable network interface names"—they describe the hardware location so the name doesn't change if you add more network cards.

## The Ifconfig Command: The Classic Tool

The **ifconfig command** was the original tool for viewing and configuring network interfaces. It's been around since the 1980s!

```sh
# View all interfaces
ifconfig

# View specific interface
ifconfig eth0

# Note: ifconfig is deprecated on modern systems
# Use 'ip' instead, but ifconfig still works!
```

!!! note "Deprecated but Not Dead"
    `ifconfig` is from the `net-tools` package and is considered deprecated. Modern Linux uses `ip` from `iproute2`. However, you'll still see `ifconfig` in tutorials and older scripts everywhere.

## The Ip Command: The Modern Way

The **ip command** is the modern replacement for ifconfig, route, and other network tools. One command to rule them all!

```sh
# Show all addresses
ip addr show
ip a              # Short version

# Show specific interface
ip addr show eth0

# Show only IPv4
ip -4 addr show

# Show link layer info (MAC addresses)
ip link show

# Show routing table
ip route show
ip r              # Short version

# Show neighbors (ARP cache)
ip neigh show
```

### Configuring Interfaces with ip

```sh
# Bring interface up/down
sudo ip link set eth0 up
sudo ip link set eth0 down

# Add an IP address
sudo ip addr add 192.168.1.100/24 dev eth0

# Remove an IP address
sudo ip addr del 192.168.1.100/24 dev eth0

# Add a route
sudo ip route add 10.0.0.0/8 via 192.168.1.1
```

## The Ping Command: Are You There?

The **ping command** sends a small packet to another computer and waits for a response. It's the "Hello? Can you hear me?" of networking.

```sh
# Basic ping
ping google.com

# Ping with count limit
ping -c 4 google.com

# Ping with interval (seconds between pings)
ping -i 0.5 google.com

# Ping with specific packet size
ping -s 1000 google.com

# Ping local network broadcast
ping -b 192.168.1.255
```

### Reading Ping Output

```
PING google.com (142.250.80.46) 56(84) bytes of data.
64 bytes from lga25s71-in-f14.1e100.net: icmp_seq=1 ttl=117 time=12.3 ms
64 bytes from lga25s71-in-f14.1e100.net: icmp_seq=2 ttl=117 time=11.8 ms
64 bytes from lga25s71-in-f14.1e100.net: icmp_seq=3 ttl=117 time=12.1 ms
```

| Field | Meaning |
|-------|---------|
| `64 bytes` | Response packet size |
| `icmp_seq` | Sequence number (should increment) |
| `ttl` | Time To Live (hops remaining) |
| `time` | Round-trip time in milliseconds |

!!! tip "Ping Troubleshooting"
    - **No response**: Host is down, blocking ICMP, or network issue
    - **High time**: Network congestion or long physical distance
    - **Packet loss**: Unreliable network or overloaded server
    - **TTL decreasing**: Normal for different hosts; very low TTL might indicate routing loops

<details markdown="1">
<summary>MicroSim: Ping Packet Journey</summary>
**Description:** Visual simulation of ICMP ping packets traveling through a network.

**Layout:**
- Source computer (left)
- Multiple network hops (routers/switches in middle)
- Destination server (right)
- Path visualization connecting all nodes

**Animation:**
- Packet (small colored dot) travels from source
- Passes through each hop, with hop count decreasing (TTL)
- Arrives at destination
- Response packet travels back (different color)
- Timer shows round-trip time

**Interactivity:**
- Select destination: Local (fast), Same city (medium), International (slow)
- Simulate packet loss checkbox
- Simulate high latency checkbox
- "Break" a hop to show how failures appear
- Counter for packets sent/received/lost

**Failure Modes:**
- Timeout (packet disappears at broken hop)
- Packet loss (random packets vanish)
- High latency (packets slow down visibly)

**Skill:** Use microsim-p5 to implement this visualization
</details>

## The Traceroute Command: Map the Journey

The **traceroute command** shows every hop (router) between you and a destination. It's like GPS tracking for your network packets!

```sh
# Basic traceroute
traceroute google.com

# Use ICMP instead of UDP (may work better through firewalls)
traceroute -I google.com

# Faster with no DNS lookups
traceroute -n google.com

# Limit hops
traceroute -m 15 google.com
```

### Reading Traceroute Output

```
traceroute to google.com (142.250.80.46), 30 hops max
 1  router.local (192.168.1.1)  1.234 ms  1.123 ms  1.456 ms
 2  96.120.104.177  12.345 ms  11.234 ms  12.567 ms
 3  * * *
 4  68.86.143.93  15.678 ms  14.890 ms  15.123 ms
```

Each line is a hop:
- **Number**: Hop count from you
- **Name/IP**: Router at that hop
- **Three times**: Three probe results

The `* * *` means that hop didn't respond (many routers hide from traceroute for security).

<details markdown="1">
<summary>MicroSim: Network Traceroute Visualization</summary>
**Description:** Interactive map showing packet route through multiple network hops.

**Layout:**
- World/network map background
- Nodes representing routers/hops
- Animated packets traveling between nodes
- Timing information displayed at each hop

**Elements:**
- Source node (your computer)
- Multiple intermediate hops (routers)
- Destination node (target server)
- Path lines connecting nodes
- Latency labels on each segment

**Animation:**
- TTL-limited packets sent (stop at each hop)
- Each hop sends back "time exceeded" message
- Build up the complete path progressively
- Show timing for each segment

**Interactivity:**
- Select different destination types (local/regional/international)
- Click on any hop to see detailed info
- Simulate a "dead" hop to show how traceroute reveals failures
- Toggle between geographic view and logical network view

**Skill:** Use microsim-p5 to implement this visualization
</details>

## The Netstat Command: Network Statistics

The **netstat command** displays network connections, routing tables, and interface statistics. It's your network's status dashboard!

```sh
# Show all connections
netstat -a

# Show only listening ports
netstat -l

# Show TCP connections
netstat -t

# Show UDP connections
netstat -u

# Show with process names (requires sudo)
sudo netstat -tulnp

# Show routing table
netstat -r

# Show statistics
netstat -s
```

### Common netstat Combinations

| Command | Shows |
|---------|-------|
| `netstat -tulnp` | TCP/UDP listening ports with processes |
| `netstat -an` | All connections, numeric (no DNS) |
| `netstat -r` | Routing table |
| `netstat -i` | Interface statistics |

!!! note "netstat is Deprecated"
    Like `ifconfig`, `netstat` is from `net-tools` and is deprecated. Use `ss` instead—it's faster and more powerful!

## The Ss Command: Socket Statistics

The **ss command** is the modern replacement for netstat. It's faster and provides more information.

```sh
# Show all sockets
ss -a

# Show listening sockets
ss -l

# Show TCP sockets
ss -t

# Show UDP sockets
ss -u

# Show with process names
ss -p

# Show numeric (no DNS resolution)
ss -n

# The most useful combo: listening TCP ports with processes
sudo ss -tulnp

# Filter by port
ss -t dst :443
ss -t src :22

# Filter by state
ss -t state established
ss -t state listening
```

### Comparing netstat and ss

| netstat | ss | Purpose |
|---------|-----|---------|
| `netstat -tulnp` | `ss -tulnp` | Listening ports |
| `netstat -an` | `ss -an` | All connections |
| `netstat -r` | `ip route` | Routing table |

## Network Ports: The Apartment Numbers

**Network ports** are like apartment numbers in a building. The IP address gets you to the building (computer), and the port number gets you to the specific service.

Ports range from 0-65535:

| Range | Type | Examples |
|-------|------|----------|
| 0-1023 | Well-known (privileged) | 22 (SSH), 80 (HTTP), 443 (HTTPS) |
| 1024-49151 | Registered | 3306 (MySQL), 5432 (PostgreSQL) |
| 49152-65535 | Dynamic/Private | Temporary connections |

### Common Ports to Know

| Port | Service | Description |
|------|---------|-------------|
| 20, 21 | FTP | File Transfer Protocol |
| 22 | SSH | Secure Shell |
| 23 | Telnet | Insecure remote access (don't use!) |
| 25 | SMTP | Email sending |
| 53 | DNS | Domain name resolution |
| 80 | HTTP | Unencrypted web |
| 443 | HTTPS | Encrypted web |
| 3389 | RDP | Windows Remote Desktop |

```sh
# See what's using a specific port
sudo ss -tulnp | grep :80
sudo lsof -i :80

# Check if a port is open on a remote host
nc -zv example.com 80
```

<details markdown="1">
<summary>MicroSim: Network Ports and Firewalls</summary>
**Description:** Visual simulation of how ports and firewalls control network traffic.

**Layout:**
- Client computer (left)
- Firewall wall in the middle with numbered "doors" (ports)
- Server with multiple services (right)

**Elements:**
- Port doors: Some open (green), some closed (red), some filtered (yellow)
- Service icons behind doors: Web server (80/443), SSH (22), Database (3306)
- Packet animations trying to enter through ports

**Animation:**
- Packets approach firewall
- Open ports: Packet passes through
- Closed ports: Packet bounces back with "Connection Refused"
- Filtered ports: Packet disappears (dropped silently)
- Response packets return through same port

**Interactivity:**
- Click ports to open/close them
- Toggle firewall on/off
- Send test packets to different ports
- Show SYN/ACK/RST responses

**Skill:** Use microsim-p5 to implement this visualization
</details>

## The Curl Command: Transfer Data from URLs

The **curl command** transfers data from or to a server. It's incredibly powerful for testing APIs, downloading files, and debugging web issues.

```sh
# Basic GET request
curl https://example.com

# Save output to file
curl -o page.html https://example.com
curl -O https://example.com/file.zip  # Keep original filename

# Follow redirects
curl -L https://example.com

# Show headers only
curl -I https://example.com

# Show headers AND content
curl -i https://example.com

# Verbose mode (see the whole conversation)
curl -v https://example.com

# POST data
curl -X POST -d "name=value" https://api.example.com

# POST JSON
curl -X POST -H "Content-Type: application/json" \
     -d '{"key":"value"}' https://api.example.com

# With authentication
curl -u username:password https://api.example.com

# Download with progress bar
curl -# -O https://example.com/largefile.zip
```

### Curl for API Testing

```sh
# GET request with headers
curl -H "Authorization: Bearer token123" https://api.example.com/data

# PUT request
curl -X PUT -d '{"status":"updated"}' https://api.example.com/item/1

# DELETE request
curl -X DELETE https://api.example.com/item/1

# See timing information
curl -w "@curl-format.txt" -o /dev/null -s https://example.com
```

## The Wget Command: Download Files

The **wget command** is specialized for downloading files. It's simpler than curl but better for recursive downloads and continuing interrupted transfers.

```sh
# Basic download
wget https://example.com/file.zip

# Save with different name
wget -O myfile.zip https://example.com/file.zip

# Continue interrupted download
wget -c https://example.com/largefile.zip

# Download in background
wget -b https://example.com/file.zip

# Download entire website (mirror)
wget -m -p -k https://example.com

# Limit download speed
wget --limit-rate=1m https://example.com/file.zip

# Download multiple files from list
wget -i urls.txt
```

### Curl vs Wget

| Feature | curl | wget |
|---------|------|------|
| Protocols | Many (HTTP, FTP, SFTP, SCP, etc.) | HTTP, HTTPS, FTP |
| Recursive download | No | Yes |
| Resume downloads | Manual | Automatic with -c |
| API testing | Excellent | Basic |
| Output | stdout by default | File by default |

## WiFi Configuration: Wireless Networking

**WiFi configuration** on Linux can be done through various tools depending on your distribution.

### Using NetworkManager (Most Distributions)

```sh
# List available networks
nmcli device wifi list

# Connect to a network
nmcli device wifi connect "NetworkName" password "password123"

# Show saved connections
nmcli connection show

# Disconnect
nmcli device disconnect wlan0

# Show WiFi status
nmcli device status
```

### Using wpa_supplicant (Lower Level)

```sh
# Scan for networks
sudo iwlist wlan0 scan | grep ESSID

# Check wireless interface
iwconfig wlan0

# Show signal strength
watch -n 1 "iwconfig wlan0 | grep Signal"
```

### WiFi Troubleshooting

```sh
# Check if WiFi interface exists
ip link show | grep wlan

# Check driver loaded
lsmod | grep -i wireless

# Restart NetworkManager
sudo systemctl restart NetworkManager

# View connection logs
journalctl -u NetworkManager -f
```

## Network Troubleshooting: Debug Like a Pro

**Network troubleshooting** is a systematic process. When "the internet is broken," here's how to figure out what's actually wrong.

### The Troubleshooting Ladder

Work from bottom to top:

1. **Physical**: Is the cable plugged in? Is WiFi enabled?
2. **Link**: Do you have a connection to the router?
3. **IP**: Do you have an IP address?
4. **Gateway**: Can you reach your router?
5. **Internet**: Can you reach external IPs?
6. **DNS**: Can you resolve domain names?
7. **Application**: Does the specific service work?

### Step-by-Step Network Debugging

Here's a complete example of debugging an internet outage:

```sh
#!/bin/bash
# network-debug.sh - Systematic network troubleshooting

echo "=== Network Troubleshooting ==="
echo ""

# Step 1: Check if network interfaces exist
echo "Step 1: Checking network interfaces..."
ip link show | grep -E "eth|wlan|enp|wlp" | head -5
echo ""

# Step 2: Check for IP address
echo "Step 2: Checking IP addresses..."
ip addr show | grep "inet " | grep -v "127.0.0.1"
if [ $? -ne 0 ]; then
    echo "PROBLEM: No IP address assigned!"
    echo "Try: sudo dhclient eth0"
    exit 1
fi
echo ""

# Step 3: Check default gateway
echo "Step 3: Checking default gateway..."
GATEWAY=$(ip route | grep default | awk '{print $3}')
if [ -z "$GATEWAY" ]; then
    echo "PROBLEM: No default gateway!"
    exit 1
fi
echo "Gateway: $GATEWAY"
echo ""

# Step 4: Ping the gateway
echo "Step 4: Pinging gateway..."
ping -c 2 $GATEWAY > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "PROBLEM: Cannot reach gateway!"
    echo "Check: Physical connection, WiFi signal"
    exit 1
fi
echo "Gateway is reachable"
echo ""

# Step 5: Ping external IP (Google DNS)
echo "Step 5: Pinging external IP (8.8.8.8)..."
ping -c 2 8.8.8.8 > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "PROBLEM: Cannot reach internet!"
    echo "Check: Router configuration, ISP status"
    exit 1
fi
echo "Internet is reachable"
echo ""

# Step 6: Test DNS resolution
echo "Step 6: Testing DNS resolution..."
nslookup google.com > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "PROBLEM: DNS is not working!"
    echo "Try: Change DNS servers in /etc/resolv.conf"
    echo "     nameserver 8.8.8.8"
    echo "     nameserver 1.1.1.1"
    exit 1
fi
echo "DNS is working"
echo ""

# Step 7: Test HTTP connection
echo "Step 7: Testing HTTP connection..."
curl -s --connect-timeout 5 https://google.com > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "PROBLEM: HTTP connections failing!"
    echo "Check: Firewall, proxy settings"
    exit 1
fi
echo "HTTP is working"
echo ""

echo "=== All tests passed! Network is working. ==="
```

### Quick Debug Commands

```sh
# Check everything quickly
ip a                              # Your IP addresses
ip r                              # Your routes
cat /etc/resolv.conf              # Your DNS servers
ping -c 2 8.8.8.8                 # Can reach internet?
ping -c 2 google.com              # DNS working?
curl -I https://google.com        # HTTP working?
```

<details markdown="1">
<summary>MicroSim: Network Troubleshooting Simulator</summary>
**Description:** Interactive simulation where students diagnose network problems.

**Layout:**
- Network diagram: Computer → Switch → Router → Firewall → Internet → DNS → Website
- Control panel to "break" different components
- Terminal panel showing command outputs
- Status indicators for each component

**Scenarios:**
1. Cable unplugged (no link light)
2. No DHCP (no IP address)
3. Wrong gateway (can't reach internet)
4. DNS failure (can ping IP but not domains)
5. Firewall blocking (connection refused/timeout)
6. Website down (everything else works)

**Interactivity:**
- Click components to "break" them
- Type commands in terminal (ping, traceroute, etc.)
- See realistic output based on what's broken
- Hints available for each scenario
- Score/timer for gamification

**Learning Goals:**
- Understand the troubleshooting ladder
- Learn to isolate problems systematically
- Practice reading command output

**Skill:** Use microsim-p5 to implement this visualization
</details>

### The "Wait for Network" Script

Here's a script that beeps when your network comes back up—perfect for when you're waiting for your ISP to fix an outage:

```sh
#!/bin/bash
# wait-for-network.sh - Beep when network comes back up
#
# Usage: ./wait-for-network.sh [host] [interval]
#   host: IP or domain to ping (default: 8.8.8.8)
#   interval: seconds between checks (default: 5)

HOST="${1:-8.8.8.8}"
INTERVAL="${2:-5}"

echo "Waiting for network connection to $HOST..."
echo "Checking every $INTERVAL seconds. Press Ctrl+C to stop."
echo ""

# Counter for attempts
ATTEMPTS=0

while true; do
    ATTEMPTS=$((ATTEMPTS + 1))

    # Try to ping
    if ping -c 1 -W 2 "$HOST" > /dev/null 2>&1; then
        echo ""
        echo "=========================================="
        echo "NETWORK IS BACK UP!"
        echo "Successfully reached $HOST"
        echo "After $ATTEMPTS attempts"
        echo "=========================================="

        # Beep! (multiple methods for compatibility)
        # Method 1: Terminal bell
        echo -e "\a"

        # Method 2: Speaker beep (if available)
        if command -v beep &> /dev/null; then
            beep -f 1000 -l 500 -r 3
        fi

        # Method 3: PulseAudio beep
        if command -v paplay &> /dev/null; then
            paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null
        fi

        # Method 4: macOS specific
        if [[ "$OSTYPE" == "darwin"* ]]; then
            afplay /System/Library/Sounds/Glass.aiff
            say "Network is back up"
        fi

        # Exit successfully
        exit 0
    else
        # Still down, show progress
        printf "\rAttempt $ATTEMPTS: Network still down... "
    fi

    sleep "$INTERVAL"
done
```

Make it executable and run:

```sh
chmod +x wait-for-network.sh

# Wait for Google DNS
./wait-for-network.sh

# Wait for specific host
./wait-for-network.sh example.com

# Check every 2 seconds
./wait-for-network.sh 8.8.8.8 2
```

!!! success "Pro Tip: Background It"
    Run the script in the background while you do other things:
    ```sh
    ./wait-for-network.sh &
    ```
    You'll hear the beep when the network returns!

<details markdown="1">
<summary>MicroSim: Packet Journey Through the Internet</summary>
**Description:** Comprehensive animated visualization showing how data travels across the internet.

**Layout:**
- Full network diagram with multiple paths
- Your computer → Local network → ISP → Internet backbone → Destination
- Multiple potential routes shown
- Firewalls, routers, DNS servers all visible

**Journey Steps:**
1. Application creates data
2. Data broken into packets
3. Packets get IP headers
4. ARP resolves gateway MAC
5. Packets sent to gateway
6. Router forwards based on routing table
7. Packets traverse multiple hops
8. NAT translation occurs
9. Packets reach destination
10. Response travels back

**Interactivity:**
- Follow a single packet (highlight its journey)
- Speed control (slow-mo to understand, fast to see volume)
- Click any node to see its routing table
- Inject failures at any point
- Toggle encryption visualization (HTTPS wrapping)
- Show/hide different protocol layers

**Failure Simulations:**
- DNS server unreachable
- Router failure (show alternate routing)
- Firewall blocks connection
- Packet loss (some packets disappear)
- High latency (packets slow down)

**Skill:** Use microsim-p5 to implement this visualization
</details>

## Putting It All Together: Network Commands Cheat Sheet

| Task | Command |
|------|---------|
| Show IP addresses | `ip addr show` |
| Show routing table | `ip route show` |
| Test connectivity | `ping -c 4 host` |
| Trace route to host | `traceroute host` |
| Show listening ports | `ss -tulnp` |
| Look up DNS | `nslookup domain` |
| Download file | `wget URL` or `curl -O URL` |
| Test HTTP response | `curl -I URL` |
| Show WiFi networks | `nmcli device wifi list` |
| Connect to WiFi | `nmcli device wifi connect "SSID" password "pass"` |

## Key Takeaways

Congratulations, network ninja! You now understand:

- **IP addresses**: Your computer's identity on the network
- **MAC addresses**: Hardware-level identifiers
- **DNS**: The phone book that maps names to IPs
- **Interfaces**: Your connection points to networks
- **Ping**: Testing if a host is reachable
- **Traceroute**: Mapping the path to a destination
- **Ports**: Service addresses on a computer
- **curl/wget**: Transferring data from the internet
- **Troubleshooting**: Systematic approach to finding problems

!!! success "You're Network-Savvy Now!"
    The next time someone says "the internet is broken," you'll be the one who figures out it's actually DNS. (It's always DNS.)

## What's Next?

Now that you understand networking, it's time to connect SECURELY! The next chapter covers SSH—the secure way to access remote systems.

---

??? question "Quick Quiz: Networking Fundamentals"
1. What's the difference between an IP address and a MAC address?
2. What command shows your computer's IP address?
3. What does DNS do?
4. How would you test if a remote server is reachable?
5. What's the difference between `ping` and `traceroute`?
6. Which port does HTTPS use?
7. If you can ping 8.8.8.8 but not google.com, what's likely broken?

??? note "Quiz Answers"
1. IP is assigned by network and can change; MAC is hardware-burned and permanent
2. `ip addr show` (or `hostname -I` for just the IP)
3. Translates domain names (like google.com) into IP addresses
4. `ping hostname` or `ping ip-address`
5. `ping` tests if a host is reachable; `traceroute` shows every hop along the path
6. Port 443
7. DNS is broken (you can reach the internet but can't resolve names)

## References

1. [TCP/IP Guide](https://www.rfc-editor.org/rfc/rfc1180.txt) - Classic introduction to TCP/IP networking fundamentals
2. [IP Command Tutorial](https://www.tecmint.com/ip-command-examples/) - Comprehensive guide to the modern ip command with examples
3. [DNS Explained](https://www.cloudflare.com/learning/dns/what-is-dns/) - Cloudflare's clear explanation of how DNS works
4. [Understanding IPv4 vs IPv6](https://www.networkworld.com/article/3254575/what-is-ipv6-and-why-aren-t-we-there-yet.html) - Why IPv6 exists and the transition from IPv4
5. [NetworkManager Guide](https://wiki.archlinux.org/title/NetworkManager) - Complete guide to NetworkManager and nmcli for WiFi configuration
6. [Ping Command Tutorial](https://www.geeksforgeeks.org/ping-command-in-linux-with-examples/) - GeeksForGeeks guide to using ping for network diagnostics
7. [Traceroute Explained](https://www.keycdn.com/support/traceroute-command) - How traceroute works and how to interpret results
8. [Common Network Ports](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) - Official IANA port number registry
9. [curl Tutorial](https://curl.se/docs/manual.html) - Official curl manual with comprehensive examples
10. [wget Command Guide](https://www.gnu.org/software/wget/manual/wget.html) - GNU wget official documentation
11. [NetworkManager nmcli Examples](https://www.redhat.com/sysadmin/nmcli-manage-connections) - Red Hat guide to managing network connections with nmcli
12. [OSI Model Explained](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) - Understanding the seven-layer network model
13. [Netstat vs SS Command](https://www.tecmint.com/ss-command-examples-in-linux/) - Modern ss command replacing deprecated netstat
14. [Network Troubleshooting Guide](https://www.digitalocean.com/community/tutorials/how-to-troubleshoot-common-connection-issues) - DigitalOcean's systematic approach to network issues
15. [Understanding MAC Addresses](https://www.howtogeek.com/764868/what-is-a-mac-address-and-how-does-it-work/) - HowToGeek explanation of MAC addresses and their purpose
16. [curl vs wget Comparison](https://www.baeldung.com/linux/curl-wget) - When to use curl versus wget for downloads
17. [NAT Explained](https://www.howtogeek.com/122641/how-to-forward-ports-on-your-router/) - Understanding Network Address Translation and port forwarding
18. [DNS Resolution Process](https://www.cloudflare.com/learning/dns/dns-server-types/) - Detailed walkthrough of how DNS queries work
19. [Linux Network Commands](https://www.linuxjourney.com/lesson/network-basics) - Linux Journey's beginner-friendly networking lesson
20. [WiFi Configuration on Linux](https://wiki.archlinux.org/title/Network_configuration/Wireless) - Complete guide to wireless networking on Linux
