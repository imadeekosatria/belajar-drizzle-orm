import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { userTable } from './db/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const user : typeof userTable.$inferInsert = {
        name: "Alice",
        age: 30,
        email: "alice@example.com",
    }

    await db.insert(userTable).values(user)
    console.log("User inserted successfully")

    const users = await db.select().from(userTable)
    console.log("Getting all users from database", users)

    await db.update(userTable).set({age: 31}).where(eq(userTable.email, user.email))
    console.log("User updated successfully")    

    await db.delete(userTable).where(eq(userTable.email, user.email))
    console.log("User deleted successfully")

}