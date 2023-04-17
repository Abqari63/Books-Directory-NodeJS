const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');


app.get('/:query', (req, res) => {
    let query = req.params.query
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=ebooks&printType=books&maxResults=40&key=AIzaSyCzA4PHtco5XPjYlOaF9vWvUS2uf3hhT54`


    axios.get(url)
        .then(response => {
            const data = response.data
            const book = JSON.stringify(data);
            fs.writeFileSync('./Data/Books.json', book);

            const booksObj = JSON.parse(fs.readFileSync('./Data/Books.json'))
            const bookArr = booksObj.items
            res.render('BooksViews', { bookArr })
        })
        .catch(error => {
            console.log('Cannot find reference to the book')
        })
});



app.listen(2000, () => {
    console.log('Servers is listening on localhost:2000')
})

