import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel{
    public email: string;
    public password: string;
    
    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static validationSchema = Joi.object({
        email: Joi.string().required().min(10).max(150),
        password: Joi.string().required().min(4).max(50),
    });

    public validate() {
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;