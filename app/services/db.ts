import { QueryResultRow, sql } from "@vercel/postgres";

export default async function ping(): Promise<QueryResultRow[] | null> {
  try {
    const query = await sql`SELECT * FROM ping`;
    return query.rows;
  } catch (error) {
    console.error("Error running query:", error);
    return null;
  }
}
