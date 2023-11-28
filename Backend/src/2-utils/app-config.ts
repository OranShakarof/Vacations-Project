class AppConfig {

    // Server Port:
    public readonly port = process.env.PORT;

    // Database Host (on which computer the database exists):
    public readonly mySqlHost = process.env.MYSQL_HOST;

    // Database User
    public readonly mySqlUser = process.env.MYSQL_ROOT;

    // Database Password: 
    public readonly mySqlPassword = process.env.MYSQL_PASSWORD;

    // Database Name: 
    public readonly mySqlDatabase = process.env.MYSQL_DATABASE; // Fill in database name

    //Domain Name: 
    public readonly domainName = process.env.ORIGIN + this.port;
}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
