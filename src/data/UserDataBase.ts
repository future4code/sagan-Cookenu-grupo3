import { BaseDatabase } from "./BaseDataBase";

export class UserDatabase extends BaseDatabase {
    public async createUser(
        id: string,
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                id,
                name,
                email,
                password,
                role
            })
            .into(BaseDatabase.USERS_TABLE_NAME);
    }

    public async getUserByEmail(email: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(BaseDatabase.USERS_TABLE_NAME)
            .where({ email });

        return result[0];
    }

    public async getUserById(id: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(BaseDatabase.USERS_TABLE_NAME)
            .where({ id });
        return result[0];
    }

}
