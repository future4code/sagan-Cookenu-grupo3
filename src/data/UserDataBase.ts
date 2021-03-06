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

    public async getOwnProfile(id: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(BaseDatabase.USERS_TABLE_NAME)
            .where({ id });
        return result[0];
    }

    public async getOtherProfile(id: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(BaseDatabase.USERS_TABLE_NAME)
            .where({ id })

        return result[0]
    }
    public async followUser(follower_id: string, followed_id: string): Promise<void> {
        await this.getConnection()
            .insert({
                follower_id,
                followed_id
            }).into(BaseDatabase.FOLLOWS_TABLE_NAME);
    }
    public async deleteFollowUser(follower_id: string, followed_id: string): Promise<any> {
        await this.getConnection()
            .delete()
            .from(BaseDatabase.FOLLOWS_TABLE_NAME)
            .where({ follower_id, followed_id })

    };
    public async deleteUser(id: string): Promise<any> {
        await this.getConnection()
            .delete()
            .from(BaseDatabase.USERS_TABLE_NAME)
            .where({ id })
    };
}
