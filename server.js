const express = require('express');
const app = express();

// const { quotes } = require('./data');
const { quotes } = require('./data2');
const {
  getRandomElement,
  getElementById,
  getElementIndexById,
} = require('./utils');

let nextId = quotes.length + 1;

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT);

// app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

  const quoteObj = { id: nextId, quote, person };
  nextId++;
  quotes.push(quoteObj);
  return res.send({ quote: quoteObj });
});

quotesRouter.put('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  console.log(req.body);

  const { quote, person } = req.body;

  if (!quote || !person) {
    return res.status(400).send();
  }

  const quoteObj = getElementById(quotes, id);
  if (!quoteObj) {
    return res.status(404).send();
  }

  quoteObj.quote = quote;
  quoteObj.person = person;

  return res.status(200).send();
});

quotesRouter.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);

  const index = getElementIndexById(quotes, id);

  if (index === -1) {
    return res.status(404).send();
  }

  const quoteObj = quotes.splice(index, 1)[0];

  return res.status(200).send({ quote: quoteObj });
});
