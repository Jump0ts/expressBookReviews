const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let found = false;
    users.forEach((user) => {
        if(user.username === req.body.username) {
            found = true;
        }
    });
    if(found){
        return res.status(300).json({message: "User is already registered"});
    }
    users.push({username: req.body.username, password: req.body.password})
    return res.status(300).json({message: "User succesfully registered"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.status(300).json({book: books[req.params.isbn]});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let keys = Object.keys(books)
  let filteredBooks = [];
  keys.forEach(index => {
    if(books[index].author.indexOf(req.params.author) !== -1){
        filteredBooks.push(books[index])
    }
  });
  return res.status(300).json({filteredBooks});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let keys = Object.keys(books)
  let filteredBooks = [];
  keys.forEach(index => {
    if(books[index].title.indexOf(req.params.title) !== -1){
        filteredBooks.push(books[index])
    }
  });
  return res.status(300).json({filteredBooks});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    return res.status(300).json({title: books[req.params.isbn].title, reviews: books[req.params.isbn].reviews});
});

module.exports.general = public_users;
