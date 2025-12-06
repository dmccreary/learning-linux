// UNIX Family Tree (1969-2025)
// Educational vis-network visualization showing UNIX evolution
// Color coding: Blue=Original UNIX, Purple=BSD, Red=System V, Green=GNU/Linux

// ===========================================
// COLOR DEFINITIONS
// ===========================================
const colors = {
    unix: {
        background: '#3498db',
        border: '#2980b9',
        font: '#ffffff'
    },
    bsd: {
        background: '#9b59b6',
        border: '#8e44ad',
        font: '#ffffff'
    },
    sysv: {
        background: '#e74c3c',
        border: '#c0392b',
        font: '#ffffff'
    },
    gnu: {
        background: '#27ae60',
        border: '#1e8449',
        font: '#ffffff'
    }
};

// ===========================================
// NODE DATA - UNIX Family Tree
// ===========================================
// Vertical tree structure: y increases downward
// Centered horizontally with branches left (BSD) and right (System V)
// GNU/Linux on the far right

const nodeData = [
    // Original UNIX (root) - Blue
    {
        id: 'unix',
        label: 'Original UNIX\n(1969)',
        x: -200,
        y: -280,
        category: 'unix',
        year: 1969,
        creator: 'Ken Thompson & Dennis Ritchie at Bell Labs',
        features: 'First multi-user, multitasking operating system. Written in C language. Introduced hierarchical file system, pipes, and shell.',
        tooltip: 'The original UNIX (1969)\n\nCreated at Bell Labs by Ken Thompson and Dennis Ritchie.\nRevolutionary OS that introduced the hierarchical file system,\npipes, shell, and was rewritten in C for portability.\nThe ancestor of all UNIX-like operating systems.'
    },

    // BSD Branch (left side) - Purple
    {
        id: 'bsd',
        label: 'BSD UNIX\n(1977)',
        x: -380,
        y: -150,
        category: 'bsd',
        year: 1977,
        creator: 'UC Berkeley',
        features: 'Berkeley Software Distribution. Added vi editor, C shell, TCP/IP networking stack, and virtual memory.',
        tooltip: 'BSD UNIX (1977)\n\nForked from Original UNIX by UC Berkeley researchers.\nAdded crucial innovations: vi editor, C shell, virtual memory,\nand the TCP/IP stack that became the internet\'s foundation.\nLed to the open-source BSD family.'
    },
    {
        id: 'freebsd',
        label: 'FreeBSD\n(1993)',
        x: -500,
        y: 0,
        category: 'bsd',
        year: 1993,
        creator: 'FreeBSD Project',
        features: 'General-purpose OS known for performance and advanced networking. Powers Netflix, WhatsApp servers.',
        tooltip: 'FreeBSD (1993)\n\nForked from 386BSD after legal disputes with AT&T were resolved.\nFocused on performance and advanced networking features.\nPowers Netflix streaming, WhatsApp servers, and PlayStation OS.\nKnown for excellent documentation and ports system.'
    },
    {
        id: 'netbsd',
        label: 'NetBSD\n(1993)',
        x: -380,
        y: 0,
        category: 'bsd',
        year: 1993,
        creator: 'NetBSD Foundation',
        features: 'Focus on portability. Runs on over 50 hardware platforms. "Of course it runs NetBSD."',
        tooltip: 'NetBSD (1993)\n\nForked from 386BSD with a focus on extreme portability.\nRuns on over 50 hardware platforms from servers to toasters.\nMotto: "Of course it runs NetBSD."\nClean, well-documented codebase used as reference implementation.'
    },
    {
        id: 'openbsd',
        label: 'OpenBSD\n(1995)',
        x: -260,
        y: 0,
        category: 'bsd',
        year: 1995,
        creator: 'Theo de Raadt',
        features: 'Security-focused OS. Created OpenSSH. Emphasizes code correctness and proactive security.',
        tooltip: 'OpenBSD (1995)\n\nForked from NetBSD by Theo de Raadt after a dispute.\nFocused exclusively on security and code correctness.\nCreated OpenSSH (used by 90%+ of internet servers),\nLibreSSL, and pioneered security features like ASLR and W^X.'
    },
    {
        id: 'macos',
        label: 'macOS/Darwin\n(2000)',
        x: -380,
        y: 130,
        category: 'bsd',
        year: 2000,
        creator: 'Apple Inc.',
        features: 'Based on FreeBSD and Mach kernel. Powers Mac computers, iOS, iPadOS. POSIX-compliant.',
        tooltip: 'macOS/Darwin (2000)\n\nApple combined FreeBSD userland with the Mach microkernel\n(from NeXTSTEP) to create Darwin, the open-source core of macOS.\nPowers all Apple devices: Mac, iPhone, iPad, Apple Watch.\nBrings BSD heritage to consumer devices.'
    },

    // System V Branch (center-right) - Red
    {
        id: 'sysv',
        label: 'UNIX System V\n(1983)',
        x: -30,
        y: -150,
        category: 'sysv',
        year: 1983,
        creator: 'AT&T',
        features: 'Commercial UNIX standard. Introduced init system, curses library, shared libraries.',
        tooltip: 'UNIX System V (1983)\n\nAT&T\'s commercial evolution of Original UNIX.\nBecame the basis for commercial UNIX licensing.\nIntroduced the init system, System V IPC, curses library,\nand shared libraries. Defined POSIX standards.'
    },
    {
        id: 'solaris',
        label: 'Solaris\n(1992)',
        x: -120,
        y: 0,
        category: 'sysv',
        year: 1992,
        creator: 'Sun Microsystems',
        features: 'Enterprise-grade OS. Introduced ZFS filesystem, DTrace, Zones containers. Now Oracle Solaris.',
        tooltip: 'Solaris (1992)\n\nSun Microsystems\' System V derivative for SPARC and x86.\nPioneered revolutionary technologies: ZFS filesystem,\nDTrace debugging, and Zones containers.\nNow Oracle Solaris; OpenSolaris spawned illumos.'
    },
    {
        id: 'aix',
        label: 'AIX\n(1986)',
        x: -30,
        y: 0,
        category: 'sysv',
        year: 1986,
        creator: 'IBM',
        features: 'Advanced Interactive eXecutive. Runs on IBM Power Systems. Known for virtualization (LPARs).',
        tooltip: 'AIX (1986)\n\nIBM\'s System V implementation for their hardware.\nAdvanced Interactive eXecutive runs on Power Systems.\nKnown for enterprise reliability, LPARs virtualization,\nand JFS2 filesystem. Still used in enterprise environments.'
    },
    {
        id: 'hpux',
        label: 'HP-UX\n(1984)',
        x: 60,
        y: 0,
        category: 'sysv',
        year: 1984,
        creator: 'Hewlett-Packard',
        features: 'Runs on HP Itanium servers. Known for enterprise reliability and Serviceguard clustering.',
        tooltip: 'HP-UX (1984)\n\nHewlett-Packard\'s System V implementation.\nDesigned for PA-RISC and later Itanium processors.\nKnown for Serviceguard high-availability clustering\nand enterprise mission-critical workloads.'
    },

    // GNU Project - Green
    {
        id: 'gnu',
        label: 'GNU Project\n(1983)',
        x: 200,
        y: -150,
        category: 'gnu',
        year: 1983,
        creator: 'Richard Stallman',
        features: 'GNU\'s Not Unix! Free software movement. Created GCC, Emacs, Bash, GNU utilities. Needed a kernel.',
        tooltip: 'GNU Project (1983)\n\nRichard Stallman started GNU to create a free UNIX-like OS.\n"GNU\'s Not Unix!" - free as in freedom, not price.\nCreated essential tools: GCC compiler, Emacs, Bash shell,\ncoreutils. Had everything except a working kernel.'
    },

    // Linux Kernel - Green
    {
        id: 'linux',
        label: 'Linux Kernel\n(1991)',
        x: 200,
        y: -20,
        category: 'gnu',
        year: 1991,
        creator: 'Linus Torvalds',
        features: 'Free, open-source kernel. Combined with GNU tools creates complete OS. Powers most servers, supercomputers, Android.',
        tooltip: 'Linux Kernel (1991)\n\nLinus Torvalds wrote a free kernel as a hobby project.\nCombined with GNU tools to create a complete free OS.\nNow powers 96%+ of web servers, all supercomputers,\nAndroid phones, and most cloud infrastructure.'
    },

    // Linux Distributions - Green
    {
        id: 'debian',
        label: 'Debian\n(1993)',
        x: 80,
        y: 130,
        category: 'gnu',
        year: 1993,
        creator: 'Ian Murdock',
        features: 'Community-driven, stable distribution. Uses apt package manager. Foundation for many other distros.',
        tooltip: 'Debian (1993)\n\nFounded by Ian Murdock as a community-driven distro.\nKnown for stability, extensive package repository (59,000+),\nand the apt package manager. Strictly free software focus.\nFoundation for Ubuntu, Linux Mint, and 100+ derivatives.'
    },
    {
        id: 'redhat',
        label: 'Red Hat\n(1994)',
        x: 180,
        y: 130,
        category: 'gnu',
        year: 1994,
        creator: 'Red Hat Inc.',
        features: 'Enterprise Linux leader. Created RPM package manager. Now owned by IBM. Basis for CentOS, Fedora.',
        tooltip: 'Red Hat (1994)\n\nPioneered commercial open-source business model.\nCreated RPM package manager and enterprise support.\nRHEL dominates enterprise Linux market.\nAcquired by IBM for $34B. Basis for CentOS, Fedora, Rocky.'
    },
    {
        id: 'ubuntu',
        label: 'Ubuntu\n(2004)',
        x: 80,
        y: 260,
        category: 'gnu',
        year: 2004,
        creator: 'Canonical Ltd.',
        features: 'User-friendly Debian derivative. Most popular desktop Linux. "Linux for human beings."',
        tooltip: 'Ubuntu (2004)\n\nBased on Debian, focused on user-friendliness.\nMark Shuttleworth\'s Canonical made "Linux for human beings."\nMost popular desktop Linux distribution.\nRegular 6-month releases with LTS versions every 2 years.'
    },
    {
        id: 'android',
        label: 'Android\n(2008)',
        x: 300,
        y: 130,
        category: 'gnu',
        year: 2008,
        creator: 'Google (Andy Rubin)',
        features: 'Linux-based mobile OS. Powers 70%+ of smartphones. Uses modified Linux kernel with custom userspace.',
        tooltip: 'Android (2008)\n\nGoogle acquired Android Inc. and released as open source.\nUses Linux kernel but replaces GNU userland with Bionic libc.\nPowers 70%+ of world\'s smartphones and tablets.\nLargest installed base of any operating system.'
    }
];

// ===========================================
// EDGE DATA - Inheritance relationships
// ===========================================
const edgeData = [
    // From Original UNIX
    { from: 'unix', to: 'bsd', label: 'forked' },
    { from: 'unix', to: 'sysv', label: 'evolved' },

    // BSD derivatives
    { from: 'bsd', to: 'freebsd' },
    { from: 'bsd', to: 'netbsd' },
    { from: 'bsd', to: 'openbsd' },
    { from: 'freebsd', to: 'macos', label: 'basis for' },

    // System V derivatives
    { from: 'sysv', to: 'solaris' },
    { from: 'sysv', to: 'aix' },
    { from: 'sysv', to: 'hpux' },

    // GNU/Linux lineage
    { from: 'gnu', to: 'linux', label: 'combined' },
    { from: 'linux', to: 'debian' },
    { from: 'linux', to: 'redhat' },
    { from: 'linux', to: 'android' },
    { from: 'debian', to: 'ubuntu', label: 'based on' }
];

// ===========================================
// ENVIRONMENT DETECTION
// ===========================================
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================
let nodes, edges, network;

function initializeNetwork() {
    // Build nodes with colors
    const visNodes = nodeData.map(node => {
        const colorSet = colors[node.category];
        return {
            id: node.id,
            label: node.label,
            title: node.tooltip,  // vis-network uses 'title' for hover tooltips
            x: node.x,
            y: node.y,
            color: {
                background: colorSet.background,
                border: colorSet.border,
                highlight: {
                    background: colorSet.background,
                    border: '#ffd700'
                },
                hover: {
                    background: colorSet.background,
                    border: '#ffd700'
                }
            },
            font: {
                color: colorSet.font,
                size: 14,
                face: 'Arial',
                multi: true
            },
            // Store metadata for click events
            year: node.year,
            creator: node.creator,
            features: node.features,
            category: node.category
        };
    });

    // Build edges
    const visEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        label: edge.label || '',
        color: { color: '#666666', hover: '#333333' },
        width: 2,
        font: {
            size: 10,
            color: '#666666',
            strokeWidth: 3,
            strokeColor: '#ffffff'
        }
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    // Enable mouse interaction only when not in iframe
    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            selectConnectedEdges: false,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            dragNodes: false,
            navigationButtons: true,
            hover: true,
            tooltipDelay: 200
        },
        nodes: {
            shape: 'box',
            margin: {
                top: 10,
                bottom: 10,
                left: 15,
                right: 15
            },
            font: {
                size: 14,
                face: 'Arial'
            },
            borderWidth: 3,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.2)',
                size: 5,
                x: 2,
                y: 2
            }
        },
        edges: {
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 1.0
                }
            },
            width: 2,
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'vertical',
                roundness: 0.4
            }
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Set up click handler
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const node = nodes.get(nodeId);
            showNodeDetails(node);
        } else {
            resetDetails();
        }
    });

    // Set initial view position
    setTimeout(positionView, 200);
}

// ===========================================
// VIEW POSITIONING
// ===========================================
function positionView() {
    if (network) {
        // Fit all nodes in view with padding
        network.fit({
            padding: 50,
            animation: false
        });
    }
}

// ===========================================
// NODE DETAILS DISPLAY
// ===========================================
function showNodeDetails(node) {
    const statusText = document.getElementById('status-text');

    const categoryNames = {
        unix: 'Original UNIX',
        bsd: 'BSD Variant',
        sysv: 'System V Commercial UNIX',
        gnu: 'GNU/Linux'
    };

    statusText.innerHTML = `
        <div class="detail-year">${node.label.replace('\n', ' ')}</div>
        <div class="detail-creator">${node.creator}</div>
        <div class="detail-features">${node.features}</div>
    `;
}

function resetDetails() {
    const statusText = document.getElementById('status-text');
    statusText.innerHTML = 'Click on any node to see details about that operating system.';
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();
    window.addEventListener('resize', positionView);
});
