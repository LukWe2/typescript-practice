export type User = {

    id: number,
    name: string,
    email: string
};

export function printUser(user: User): void {

    console.log(`Name: ${user.name}, E-mail: ${user.email}`);
}