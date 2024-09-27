import {QueryResultRow, sql} from '@vercel/postgres';

export default async function ping(): Promise<QueryResultRow[] | null> {
    try {
        var query = await sql`SELECT * FROM ping`
        return query.rows;
    } catch (error) {
        console.error('Error running query:', error);
        return null;
    }
}

export const getReadme = async () => {
    try {
        const response = require("./README.md");

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const markdownText = await response.text();
        return markdownText;

    } catch (error) {
        console.error('Error fetching the README.md file:', error);
    }
}