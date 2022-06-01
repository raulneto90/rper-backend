import User from "../models/User";

interface createUserDTO {
    name: string;
    email: string;
    password: string;
}

class UsersRepository {
    private users: User[];

    constructor() {
        this.users = []
    }

    public all(): User[] {
        return this.users;
    }

    public findByEmail(email: string): User | null {
        const findUserWithSameEmail = this.users.find(user => user.email === email);

        return findUserWithSameEmail || null;
    }

    public create({ name, email, password }: createUserDTO): User {
        const user = new User({ name, email, password });

        this.users.push(user);
        return user;
    }

}

export default UsersRepository;