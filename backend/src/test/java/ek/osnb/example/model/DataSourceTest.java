package ek.osnb.example.model;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.sql.DataSource;

@DataJpaTest
// Uncomment the following annotations to test with the Docker container database
//@ActiveProfiles("docker")
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DataSourceTest {
    @Autowired
    DataSource dataSource;

    @Test
    void testDataSource() throws Exception {
        String dbName = dataSource.getConnection().getMetaData().getDatabaseProductName();
        System.out.println("Database Product Name: " + dbName); // H2
    }
}
