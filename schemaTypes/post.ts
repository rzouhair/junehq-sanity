import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),
    defineField({
      name: 'headerImage',
      title: 'Header image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }], // Array of strings representing tags
    }),
  ],

  preview: {
    select: {
      title: 'title',
      authors: `authors[].name`, // Access nested author names
      media: 'headerImage',
    },
    prepare(selection) {
      const authorNames = selection.authors?.map((author: any) => author.name).join(', ');
      return { ...selection, subtitle: authorNames ? `by ${authorNames}` : '' };
    },
  },
})
