const express = require("express")
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

//mongoose.connect('mongodb://localhost/blog')
mongoose.connect('mongodb://127.0.0.1/blog')

app.set("view engine", "ejs")

app.use('/articles', articleRouter)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles})
});

app.listen(3000)