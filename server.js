const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT);

const quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter);

quotesRouter.get('/', (req, res, next) => {
  const { person } = req.query;

  if (!person) {
    return res.send(quotes);
  }

  const filteredQuotes = quotes.filter((quote) => quote.person === person);
  return res.send({ quotes: filteredQuotes });
});

quotesRouter.get('/random', (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.send({ quote: quote });
});

quotesRouter.post('/', (req, res, next) => {
  const { quote, person } = req.query;

  if (!quote || !person) {
    return res.status(400).send();
  }

  const quoteObj = { quote, person };
  quotes.push(quoteObj);
  return res.send({ quote: quoteObj });
});
