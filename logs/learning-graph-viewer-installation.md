# Learning Graph Viewer Installation Log

**Skill Version:** install-learning-graph-viewer v1.0
**Date:** 2025-12-06
**Course:** Learning Linux

---

## Prerequisites Check

**Status:** COMPLETED

- Verified learning-graph.json exists at `docs/learning-graph/learning-graph.json`
- Graph contains 550 concepts with 16 taxonomy categories
- Uses pastel CSS color names (not hex values)

---

## Step 1: Create Directory Structure

**Status:** COMPLETED

Created directory: `docs/sims/graph-viewer/`

---

## Step 2: Copy Asset Files

**Status:** COMPLETED

Copied from skill assets:
- `main.html` - HTML viewer with vis-network.js integration
- `local.css` - Styling for sidebar, search, and graph display
- `index.md` - Documentation page for MkDocs

---

## Step 3: Customize script.js with Color Name Mappings

**Status:** COMPLETED

The original `getColorName()` function only supported basic colors and hex codes. Updated to include all 16 pastel CSS color names used in the Learning Linux learning-graph.json:

| CSS Color Name | Display Label |
|----------------|---------------|
| LightCoral | Light Coral |
| PeachPuff | Peach Puff |
| LightYellow | Light Yellow |
| Thistle | Thistle |
| PaleGreen | Pale Green |
| Honeydew | Honeydew |
| LavenderBlush | Lavender Blush |
| PowderBlue | Powder Blue |
| MistyRose | Misty Rose |
| LightSteelBlue | Light Steel Blue |
| PaleTurquoise | Pale Turquoise |
| LightPink | Light Pink |
| Aquamarine | Aquamarine |
| Lavender | Lavender |
| Gainsboro | Gainsboro |
| Plum | Plum |

Also added additional pastel colors for future compatibility:
- AliceBlue, AntiqueWhite, Beige, BlanchedAlmond, Cornsilk
- FloralWhite, LemonChiffon, Linen, MintCream, OldLace
- PapayaWhip, Seashell, Snow, Wheat, WhiteSmoke

---

## Step 4: Update index.md

**Status:** COMPLETED

Fixed the learning-graph.json link text for clarity.

---

## Step 5: Update mkdocs.yml Navigation

**Status:** COMPLETED

Added new MicroSims section to navigation:

```yaml
- MicroSims:
    - Learning Graph Viewer: sims/graph-viewer/index.md
```

---

## Files Created

| File | Description |
|------|-------------|
| `docs/sims/graph-viewer/main.html` | HTML viewer with vis-network.js |
| `docs/sims/graph-viewer/local.css` | Sidebar, search, and graph styling |
| `docs/sims/graph-viewer/script.js` | JavaScript with pastel color mappings |
| `docs/sims/graph-viewer/index.md` | MkDocs documentation page |

---

## Files Modified

| File | Change |
|------|--------|
| `mkdocs.yml` | Added MicroSims section with Learning Graph Viewer |

---

## Features Installed

### Search Functionality
- Type-ahead search for node names
- Displays matching results in dropdown
- Shows node group/category in results
- Clicking a result focuses and highlights the node
- Only searches visible nodes (respects taxonomy filters)

### Taxonomy Legend with Checkboxes
- Sidebar legend with all 16 node categories
- Toggle visibility of entire node groups
- Color-coded categories matching the graph
- Human-readable color names (not hex values)
- "Check All" and "Uncheck All" buttons
- Collapsible sidebar

### Graph Statistics
- **Nodes**: Count of visible nodes
- **Edges**: Count of visible edges
- **Orphans**: Nodes with no connections

### Metadata Integration
- Automatically reads title from learning-graph.json metadata
- Sets page title to "Learning Linux - Learning Graph Viewer"

---

## Testing

To test the installation:

1. Run `mkdocs serve`
2. Navigate to MicroSims → Learning Graph Viewer
3. Click "Run the Learning Graph Viewer" button
4. Verify:
   - All 550 nodes display correctly
   - Legend shows readable color names (e.g., "Light Coral" not "lightcoral")
   - Search finds concepts by name
   - Category checkboxes filter nodes properly
   - Statistics update when filtering

---

## Notes

- The viewer loads data from `../../learning-graph/learning-graph.json` (relative path from sims/graph-viewer/)
- Uses vis-network.js from CDN (unpkg.com)
- Physics simulation uses forceAtlas2Based solver for optimal layout
- All pastel colors render with black text for readability

---

*Installation completed: 2025-12-06*
*Skill: install-learning-graph-viewer v1.0*
