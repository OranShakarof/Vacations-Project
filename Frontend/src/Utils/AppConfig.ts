abstract class AppConfig {
    public vacationByUserUrl = this.baseUrl + "/api/vacations-by-user/";
    public vacationsUrl = this.baseUrl + "/api/vacations/";
    public registerUrl = this.baseUrl + "/api/register/";
    public loginUrl = this.baseUrl + "/api/login/";
    public FollowerUrl = this.baseUrl + "/api/followers/";
    public constructor (private baseUrl: string) { }
}

class DevelopmentConfig extends AppConfig{
    public constructor(){
        super("http://localhost:4000"); // Development backend address.
    }
}

class ProductionConfig extends AppConfig{
    public constructor(){
        super(" "); // Production backend address.
    }
}

const appConfig = new DevelopmentConfig();
// const appConfig = new ProductionConfig();

export default appConfig;
