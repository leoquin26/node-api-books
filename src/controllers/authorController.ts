import { Request, Response } from 'express';
import {  booksDB, authorsDB, AuthorDB, BookDB } from '../database';
import { Author } from '../models/Author';
import { Book } from '../models/Book';

export const createAuthor = (req: Request, res: Response) => {
    const { name, bookIds } = req.body;
  
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'El nombre es obligatorio y debe ser una cadena.' });
    }
  
    let validBooks: Book[] = [];
    
    if (Array.isArray(bookIds)) {
      validBooks = bookIds
        .map((bookId: number) => booksDB.find(b => b.id === bookId))
        .filter(Boolean) as Book[];
  
      if (validBooks.length !== bookIds.length) {
        return res.status(400).json({ message: 'Alguno(s) de los libros no existen.' });
      }
    }
  
    const newAuthor: Author = {
      id: authorsDB.length + 1,
      name,
      books: validBooks,
    };
  
    authorsDB.push(newAuthor);
  
    res.status(201).json(newAuthor);
  };

  export const getAllAuthors = (req: Request, res: Response) => {
    const authorsWithBooks = authorsDB.map((authorDB: AuthorDB) => {
      const author: Author = {
        id: authorDB.id,
        name: authorDB.name,
        books: [],
      };
  
      console.log(authorDB);
      console.log(booksDB);
      author.books = authorDB.books.map((book: Book) => {
        const foundBook = booksDB.find((dbBook: BookDB) => dbBook.id === book.id);
        if (foundBook) {
          return {
            id: foundBook.id,
            title: foundBook.title,
            chapters: foundBook.chapters,
            pages: foundBook.pages,
          };
        } else {
          return null;
        }
      }).filter((book): book is Book => !!book);
  
      return author;
    });
  
    res.json(authorsWithBooks);
  };
  
