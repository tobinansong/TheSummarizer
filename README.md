# The Summarizer

### *In which we build a machine that reads so we don't have to*

---

We live in an age of information glut. Not information, mind you — for information implies something formed, something shaped by human intention — but *data*, vast and undifferentiated, pouring through our screens like water through a sieve. The problem of our age is not that we lack knowledge, but that we are drowning in words and starving for meaning.

**The Summarizer** is a modest attempt to address this predicament. It is a web application that takes a block of text — however sprawling, however dense — and distills it into something briefer. You paste. You choose a length. You press a button. The machine, powered by Anthropic's Claude, returns to you the essence of what was said, or at least its best approximation of it.

Whether this constitutes understanding is, of course, another question entirely.

---

## How It Works

The architecture is deliberately simple, which is to say, it does not pretend to be more than it is.

A **frontend** — built in plain HTML, CSS, and JavaScript, without the fashionable scaffolding of frameworks — presents the user with two panels: one for input, one for output. Between them sits a slider, allowing you to specify the desired length of the summary in words, from one to one hundred. The interface is dressed in the aesthetic of science fiction: dark backgrounds, glowing cyan text, frosted glass. One might call it *cyberpunk*. Neil Postman might call it *amusing ourselves to death*. Either way, it is legible.

A **backend** — a Node.js server running Express — receives the text and the word count, and forwards the request to the Claude API. The server exists for a single, important reason: to keep the API key out of the browser, where any curious visitor could find it. The key lives in a `.env` file, which is never committed to version control.

```
User → Browser → Express Server → Claude API → Express Server → Browser → User
```

The user sees only the summary. The machinery is hidden, as machinery ought to be.

---

## Getting Started

You will need [Node.js](https://nodejs.org/) installed on your machine.

```bash
# Clone the repository
git clone https://github.com/tobinansong/TheSummarizer.git
cd TheSummarizer

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Then edit .env and add your Anthropic API key

# Start the server
npm start
```

Open your browser to `http://localhost:3000`. Paste some text. Summarize it. Consider what was lost in the compression.

---

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key. Required. |
| `PORT` | Server port. Defaults to `3000`. |

---

## Project Structure

```
├── server.js        # Express backend — proxies requests to Claude
├── index.html       # The page itself
├── index.js         # Frontend logic — event handling, API calls
├── index.css        # Glassmorphism styling, responsive layout
├── images/          # Dog with sunglasses, loading spinner
├── .env             # API key (git-ignored, as God intended)
└── package.json     # Dependencies: express, @anthropic-ai/sdk, dotenv
```

---

## A Final Word

Every technology, Postman reminded us, is both a burden and a blessing — not an either-or, but a this-and-that. The Summarizer gives you brevity, but it takes from you the slow, difficult work of reading. Whether you gain more than you lose depends entirely on what you do with the time you save.

Use it wisely, or at least interestingly.

---

*Built with [Claude](https://anthropic.com) by Anthropic.*
