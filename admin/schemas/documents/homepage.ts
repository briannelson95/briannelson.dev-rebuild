export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            readOnly: true
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: "title",
                maxLength: 96
            },
            readOnly: true
        }
    ],
}