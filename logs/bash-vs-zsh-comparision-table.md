# Session Log: Bash vs Zsh Comparison Table MicroSim

**Date:** 2025-12-07

## Summary

Created an interactive two-column comparison infographic MicroSim comparing Bash and Zsh shells for the Learning Linux course. The MicroSim features side-by-side tables with star ratings, hover tooltips, a Venn diagram, and responsive design.

## Tasks Completed

### 1. Initial Setup
- Created directory structure at `docs/sims/bash-vs-zsh/`
- Used the `comparison-table-generator` skill as a starting point

### 2. Created Files
- `main.html` - Two-column comparison layout with:
  - Bash column (orange theme) with `$` prompt icon
  - Zsh column (green theme) with `%` prompt icon
  - Star ratings for strengths (5 stars) and weaknesses (3-4 stars)
  - Hover tooltips with detailed explanations
  - Venn diagram showing "Both support the same basic commands"
  - Recommendation banner: "Start with Bash, graduate to Zsh when ready!"

- `style.css` - Custom styling with:
  - Orange/green color themes for each shell
  - CSS-only tooltips
  - Star rating color system
  - Responsive layout forced side-by-side

- `index.md` - Documentation page with iframe embed (100% width, 570px height)

- `metadata.json` - Dublin Core metadata

### 3. Updated Navigation
- Added "Bash vs Zsh" entry to `mkdocs.yml` under MicroSims section

## Refinements Made

### Layout Adjustments
1. **Removed extra vertical padding** from title and header
2. **Made arrows 2x larger** in the shell-kernel-flow MicroSim (separate task)
3. **Forced tables side-by-side** - Removed responsive media query that stacked columns vertically, added `flex-wrap: nowrap !important` and `flex-direction: row !important`
4. **Set iframe to 100% width** - Made container fully responsive
5. **Changed backgrounds to aliceblue** for shell columns and common section

### Star Rating Fix
- Wrapped filled and empty stars in `<span class="star-group">` container
- Added `white-space: nowrap` CSS to prevent gap between filled and empty stars

### Compact Spacing
- Reduced rating row padding: 4px → 2px
- Reduced rating row margin-bottom: 3px → 1px
- Reduced ratings section margin-bottom: 10px → 6px
- Reduced section h4 padding/margin
- Reduced shell header padding: 8px → 6px

## Files Modified

| File | Action |
|------|--------|
| `docs/sims/bash-vs-zsh/main.html` | Created |
| `docs/sims/bash-vs-zsh/style.css` | Created |
| `docs/sims/bash-vs-zsh/index.md` | Created |
| `docs/sims/bash-vs-zsh/metadata.json` | Created |
| `mkdocs.yml` | Updated navigation |

## Content Details

### Bash Strengths (5 stars each)
- Universal Compatibility
- Documentation
- Server Standard
- Beginner Resources

### Bash Weaknesses (3 stars each)
- Customization
- Tab Completion
- Modern Features

### Zsh Strengths (5 stars each)
- Tab Completion
- Customization
- Plugin Ecosystem
- User Experience

### Zsh Weaknesses (4 stars each)
- Learning Curve
- Script Portability

## Preview URL

Local: `http://127.0.0.1:8000/learning-linux/sims/bash-vs-zsh/`
