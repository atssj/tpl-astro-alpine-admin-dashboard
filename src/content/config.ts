// src/content/config.ts
import { defineCollection, z } from 'astro:content'

const legalCollection = defineCollection({
	type: 'content', // 'content' for Markdown/MDX files
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		publishDate: z.date(),
		updatedDate: z.date().optional()
		// Potentially add other fields like:
		// author: z.string().optional(),
		// tags: z.array(z.string()).optional(),
	})
})

export const collections = {
	legal: legalCollection
}
