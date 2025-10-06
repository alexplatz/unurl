import { date, integer, serial, text, pgSchema } from 'drizzle-orm/pg-core'

export const schema = pgSchema("schema")
export const urlSchema = schema.table('urls', {
  urlId: serial('urlId').primaryKey(),
  origUrl: text('origUrl'),
  shortUrl: text('shortUrl'),
  clicks: integer('clicks').default(0),
  date: date('date').default(Date.now),
})
