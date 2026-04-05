# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A text summarizer web app ("The Summarizer") with a vanilla HTML/CSS/JS frontend and a Node.js/Express backend that proxies requests to the Anthropic Claude API.

## Development

```bash
npm install            # install dependencies
npm start              # start the Express server (default port 3000)
```

Visit `http://localhost:3000` in a browser. The API key must be set in `.env` as `ANTHROPIC_API_KEY`.

## Architecture

**Backend:**
- **server.js** — Express server that serves static files and exposes `POST /api/summarize`. Uses `@anthropic-ai/sdk` to call Claude. Reads API key from `process.env.ANTHROPIC_API_KEY` via dotenv.

**Frontend (static files served by Express):**
- **index.html** — Single-page layout with text input, summary length slider (1-100 words), summarize button, and summary output area with loading/error states
- **index.js** — ES module. The `summarize()` function sends a `POST /api/summarize` request with `{ text, wordCount }` and displays the result. All other functions handle UI state transitions and DOM manipulation.
- **index.css** — CSS custom properties in `:root` for theming. Responsive grid layout: single column on mobile, two-column at 768px+. Controls switch from column to row at 360px+

## Key Implementation Details

- The app uses three mutually exclusive states in the summary output section: `summary-content`, `loading-section`, and `error-section`, toggled via `display: flex/none`
- Controls (slider, buttons) are enabled/disabled based on whether the text input has content
- Copy button shows timed feedback (3s) with success/failure styling via CSS classes `.copied`/`.failed`
- `index.js` is loaded as `type="module"`
- API key is stored in `.env` (git-ignored), not in source code
