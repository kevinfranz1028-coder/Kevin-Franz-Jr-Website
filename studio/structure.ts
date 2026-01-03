import {StructureBuilder} from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Website Pages Section
      S.listItem()
        .title('🌐 Website Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-home')
                .title('🏠 Home Page'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-basketball')
                .title('🏀 Basketball'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-football')
                .title('🏈 Football'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-academics')
                .title('📚 Academics'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-media')
                .title('📸 Media & Photography'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-projects')
                .title('🎯 Projects & Passion'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-character')
                .title('💪 Character & Service'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-updates')
                .title('📰 Updates Page'),
              S.documentListItem()
                .schemaType('websitePage')
                .id('page-contact')
                .title('📧 Contact'),
            ])
        ),

      S.divider(),

      // Basketball Section
      S.listItem()
        .title('🏀 Basketball')
        .child(
          S.list()
            .title('Basketball Content')
            .items([
              S.listItem()
                .title('📅 Timeline')
                .child(
                  S.documentTypeList('timelineYear')
                    .title('Basketball Timeline')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('🎮 Games & Schedule')
                .child(
                  S.documentTypeList('game')
                    .title('Games')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),
            ])
        ),

      S.divider(),

      // Football Section
      S.listItem()
        .title('🏈 Football')
        .child(
          S.list()
            .title('Football Content')
            .items([
              S.listItem()
                .title('📅 Timeline')
                .child(
                  S.documentTypeList('footballTimeline')
                    .title('Football Timeline')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('🏈 Games & Schedule')
                .child(
                  S.documentTypeList('footballGame')
                    .title('Football Games')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),
            ])
        ),

      S.divider(),

      // Content Section
      S.listItem()
        .title('📝 Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('📰 Updates')
                .child(
                  S.documentTypeList('update')
                    .title('Updates')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),
              S.listItem()
                .title('📸 Media Library')
                .child(
                  S.documentTypeList('media')
                    .title('Media Library')
                ),
            ])
        ),

      S.divider(),

      // Settings
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
