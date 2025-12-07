# Quiz: Networking Fundamentals

Test your understanding of Linux networking concepts and commands.

---

#### 1. What does the `ping` command do?

<div class="upper-alpha" markdown>
1. Downloads files from the internet
2. Tests connectivity to a host by sending ICMP packets
3. Creates a network connection
4. Configures IP addresses
</div>

??? question "Show Answer"
    The correct answer is **B**. `ping` sends ICMP echo request packets to a host and waits for replies, measuring response time and packet loss. It's the first tool to use when troubleshooting network connectivity.

    **Concept Tested:** Ping Command

    **See:** [Chapter 15 - Ping](index.md#ping-command)

---

#### 2. What information does `ip addr` (or `ip a`) show?

<div class="upper-alpha" markdown>
1. Only the public IP address
2. Network interface configurations including IP addresses
3. DNS server addresses
4. Internet speed
</div>

??? question "Show Answer"
    The correct answer is **B**. `ip addr` displays all network interfaces and their configurations, including IP addresses (IPv4 and IPv6), MAC addresses, and interface states (up/down).

    **Concept Tested:** IP Command

    **See:** [Chapter 15 - IP Command](index.md#ip-command)

---

#### 3. What is the difference between a public and private IP address?

<div class="upper-alpha" markdown>
1. There's no difference
2. Public IPs are routable on the internet; private IPs are for local networks
3. Private IPs are faster
4. Public IPs are more secure
</div>

??? question "Show Answer"
    The correct answer is **B**. Public IP addresses are unique and routable on the internet. Private IPs (like 192.168.x.x, 10.x.x.x) are used within local networks and are not directly accessible from the internet.

    **Concept Tested:** IP Addresses

    **See:** [Chapter 15 - IP Addresses](index.md#ip-addresses)

---

#### 4. What does `curl` do?

<div class="upper-alpha" markdown>
1. Curls the screen display
2. Transfers data from or to a server using URLs
3. Compresses files
4. Creates user roles
</div>

??? question "Show Answer"
    The correct answer is **B**. `curl` (Client URL) is a command-line tool for transferring data using various protocols (HTTP, HTTPS, FTP, etc.). It's commonly used for downloading files, testing APIs, and web scraping.

    **Concept Tested:** Curl Command

    **See:** [Chapter 15 - Curl](index.md#curl-command)

---

#### 5. What does `wget` do differently than `curl`?

<div class="upper-alpha" markdown>
1. They're identical
2. wget is designed for downloading files, with resume and recursive support
3. curl is only for downloads
4. wget is faster
</div>

??? question "Show Answer"
    The correct answer is **B**. While both can download files, `wget` is specifically designed for downloading with features like automatic resume, recursive downloads, and background operation. `curl` is more versatile for various HTTP operations and scripting.

    **Concept Tested:** Wget Command

    **See:** [Chapter 15 - Wget](index.md#wget-command)

---

#### 6. What is DNS?

<div class="upper-alpha" markdown>
1. Direct Network Service
2. Domain Name System - translates domain names to IP addresses
3. Data Network Security
4. Distributed Node Service
</div>

??? question "Show Answer"
    The correct answer is **B**. DNS (Domain Name System) translates human-readable domain names (like google.com) into IP addresses (like 142.250.80.46) that computers use to identify each other on the network.

    **Concept Tested:** DNS

    **See:** [Chapter 15 - DNS](index.md#dns)

---

#### 7. What does `traceroute` (or `tracepath`) show?

<div class="upper-alpha" markdown>
1. The contents of a file
2. The path packets take to reach a destination
3. User login history
4. Available routes in a GPS
</div>

??? question "Show Answer"
    The correct answer is **B**. `traceroute` displays the network path (hops) that packets take to reach a destination, showing each router along the way and the time to reach it. Useful for diagnosing where network problems occur.

    **Concept Tested:** Traceroute

    **See:** [Chapter 15 - Traceroute](index.md#traceroute)

---

#### 8. What does `netstat -tuln` show?

<div class="upper-alpha" markdown>
1. Network statistics over time
2. Listening TCP and UDP ports with numeric addresses
3. Network card specifications
4. Internet speed test results
</div>

??? question "Show Answer"
    The correct answer is **B**. `netstat -tuln` shows listening ports: `-t` (TCP), `-u` (UDP), `-l` (listening), `-n` (numeric, don't resolve names). This reveals what services are running and accepting connections.

    **Concept Tested:** Netstat Command

    **See:** [Chapter 15 - Netstat](index.md#netstat-command)

---

#### 9. What file typically contains DNS server configuration?

<div class="upper-alpha" markdown>
1. /etc/hosts
2. /etc/resolv.conf
3. /etc/network
4. /etc/dns
</div>

??? question "Show Answer"
    The correct answer is **B**. `/etc/resolv.conf` contains the DNS nameserver addresses your system uses for name resolution. `/etc/hosts` is used for local hostname mappings, not DNS configuration.

    **Concept Tested:** Network Configuration

    **See:** [Chapter 15 - DNS Configuration](index.md#dns-configuration)

---

#### 10. What is localhost and what IP does it represent?

<div class="upper-alpha" markdown>
1. Your router, 192.168.1.1
2. Your own computer, 127.0.0.1
3. Google's servers, 8.8.8.8
4. The network gateway, 0.0.0.0
</div>

??? question "Show Answer"
    The correct answer is **B**. `localhost` is a hostname that refers to your own computer, mapped to the loopback address 127.0.0.1. Connections to localhost never leave your machine, useful for testing local services.

    **Concept Tested:** Localhost

    **See:** [Chapter 15 - Localhost](index.md#localhost)
