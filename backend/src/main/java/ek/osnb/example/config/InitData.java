package ek.osnb.example.config;

import ek.osnb.example.model.Book;
import ek.osnb.example.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InitData implements CommandLineRunner {

    private final BookRepository bookRepository;

    public InitData(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Harry potter series
        Book b1 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "9780747532699");
        Book b2 = new Book("Harry Potter and the Chamber of Secrets", "J.K. Rowling", "9780747538493");
        Book b3 = new Book("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", "9780747542155");
        Book b4 = new Book("Harry Potter and the Goblet of Fire", "J.K. Rowling", "9780747546245");
        Book b5 = new Book("Harry Potter and the Order of the Phoenix", "J.K. Rowling", "9780747551003");
        Book b6 = new Book("Harry Potter and the Half-Blood Prince", "J.K. Rowling", "9780747581086");
        Book b7 = new Book("Harry Potter and the Deathly Hallows", "J.K. Rowling", "9780747591054");
        Book b8 = new Book("1984", "George Orwell", "9780451524935");
        Book b9 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0060935467");
        Book b10 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565");
        Book b11 = new Book("The Catcher in the Rye", "J.D. Salinger", "9780316769488");

        Book b12 = new Book("A Tale of Two Cities", "Charles Dickens", "9780486417769");
        Book b13 = new Book("Moby Dick", "Herman Melville", "9781503280786");
        Book b14 = new Book("Pride and Prejudice", "Jane Austen", "9781503290563");
        Book b15 = new Book("War and Peace", "Leo Tolstoy", "9781420954309");
        Book b16 = new Book("The Odyssey", "Homer", "9780140268867");
        Book b17 = new Book("Ulysses", "James Joyce", "9780199535675");
        Book b18 = new Book("The Divine Comedy", "Dante Alighieri", "9780140448955");
        Book b19 = new Book("Hamlet", "William Shakespeare", "9780743477123");
        Book b20 = new Book("The Brothers Karamazov", "Fyodor Dostoevsky", "9780374528379");
        bookRepository.saveAll(List.of(b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20));
    }
}
