# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MkDocs-based intelligent textbook teaching Linux fundamentals to high school students. The course is 15 weeks with 26 chapters, featuring a learning graph of 550 concepts, interactive MicroSims, and a focus on Raspberry Pi projects.

## Common Commands

```bash
# Serve locally with live reload
mkdocs serve

# Build the site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

Local development URL: `http://127.0.0.1:8000/learning-linux/`

## Architecture

### Content Structure
- `docs/chapters/NN-topic-name/index.md` - Chapter content (26 chapters)
- `docs/chapters/NN-topic-name/quiz.md` - Chapter quizzes with multiple choice questions
- `docs/learning-graph/learning-graph.json` - vis-network format with 550 concepts and dependencies
- `docs/sims/` - Interactive MicroSims (JavaScript-based visualizations)
- `docs/glossary.md` - ISO 11179-compliant term definitions
- `docs/faq.md` - Frequently asked questions

### MicroSims Structure
Each MicroSim lives in `docs/sims/<sim-name>/` with:
- `main.html` - Standalone HTML file (referenced via iframe)
- `*.js` - JavaScript visualization code
- `index.md` - Documentation page
- `metadata.json` - Dublin Core metadata (optional)

Current MicroSims use vis-network.js (graph visualization) and vis-timeline.js (timeline).

### Learning Graph
The learning graph in `docs/learning-graph/learning-graph.json` defines concept dependencies in vis-network format. Related files:
- `concept-list.md` - All 550 concepts listed
- `concept-taxonomy.md` - 16 category definitions
- `quality-metrics.md` - Graph validation metrics

## Key Configuration

### mkdocs.yml Notes
- Uses Material theme with `social` and `social_override` plugins
- Custom CSS in `docs/css/extra.css`
- Do NOT add `navigation.tabs` to features (per user preference)

### Claude Skills
This project uses Claude Code Skills for content generation:
- `learning-graph-generator` - Creates concept dependencies
- `book-chapter-generator` - Designs chapter structure
- `chapter-content-generator` - Writes chapter content
- `quiz-generator` - Creates chapter quizzes
- `glossary-generator` - Generates ISO 11179 definitions
- `microsim-p5` / `vis-network` / `timeline-generator` - Interactive visualizations

## Content Guidelines

- Target audience: High school students
- Reading level: Accessible but technically accurate
- Chapters include hands-on exercises using Raspberry Pi when applicable
- Learning objectives follow Bloom's Taxonomy (Remember through Create)
