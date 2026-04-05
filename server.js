require('dotenv').config()
const express = require('express')
const Anthropic = require('@anthropic-ai/sdk').default

const app = express()
const PORT = process.env.PORT || 3000

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
})

app.use(express.json())
app.use(express.static('.'))

app.post('/api/summarize', async (req, res) => {
    const { text, wordCount } = req.body

    if (!text || !wordCount) {
        return res.status(400).json({ error: 'text and wordCount are required' })
    }

    try {
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: `Summarize the following text in approximately ${wordCount} words. Return only the summary, no preamble.\n\n${text}`,
                },
            ],
        })

        const summary = message.content[0].text
        res.json({ summary })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
