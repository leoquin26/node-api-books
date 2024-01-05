import { Request, Response } from 'express';
import { booksDB, authorsDB } from '../database';
import { Book } from '../models/Book';
import { Author } from '../models/Author';
export const createBook = (req: Request, res: Response) => {
    const { title, chapters, pages, authorIds } = req.body;
  
    if (!title || !chapters || !pages || !Array.isArray(authorIds)) {
      return res.status(400).json({ message: 'Datos de entrada no válidos.' });
    }
  
    let validAuthors: Author[] = [];
    
    if (Array.isArray(authorIds)) {
      validAuthors = authorIds
        .map((authorId: number) => authorsDB.find((a: { id: number; }) => a.id === authorId))
        .filter(Boolean) as Author[];
  
      if (validAuthors.length !== authorIds.length) {
        return res.status(400).json({ message: 'Alguno(s) de los autores no existen.' });
      }
    }
  
    const newBook: Book = {
      id: booksDB.length + 1,
      title,
      chapters,
      pages,
      authors: validAuthors,
    };
  
    booksDB.push(newBook);
  
    res.status(201).json(newBook);
  };

export const getAllBooks = (req: Request, res: Response) => {
    const booksWithAuthors = booksDB.map((book: { id: any; title: any; chapters: any; pages: any; authors: any[]; }) => ({
      id: book.id,
      title: book.title,
      chapters: book.chapters,
      pages: book.pages,
      authors: book.authors.map(author => (author)),
    }));
  
    res.json(booksWithAuthors);
  };
  
