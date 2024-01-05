import { Author } from "./models/Author";
import { Book } from "./models/Book";

export type BookDB = {
    id: number;
    title: string;
    chapters: number;
    pages: number;
    authors: Author[]; 
  };
  
  export type AuthorDB = {
    id: number;
    name: string;
    books: Book[];
  };
  
  export const booksDB: BookDB[] = [];
  export const authorsDB: AuthorDB[] = [];
  