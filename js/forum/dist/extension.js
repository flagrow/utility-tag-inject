'use strict';

System.register('flagrow/utility-tag-inject/main', ['flarum/extend', './addTagList'], function (_export, _context) {
    "use strict";

    var extend, addTagList;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_addTagList) {
            addTagList = _addTagList.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-utility-tag-inject', function (app) {
                addTagList();
            });
        }
    };
});;
'use strict';

System.register('flagrow/utility-tag-inject/addTagList', ['flarum/extend', 'flarum/components/IndexPage', 'flarum/components/Separator', 'flarum/components/LinkButton', 'flarum/tags/components/TagLinkButton', 'flarum/tags/components/TagsPage', 'flarum/tags/utils/sortTags'], function (_export, _context) {
  "use strict";

  var extend, IndexPage, Separator, LinkButton, TagLinkButton, TagsPage, sortTags;

  _export('default', function () {
    // Add a link to the tags page, as well as a list of all the tags,
    // to the index page's sidebar.
    extend(IndexPage.prototype, 'navItems', function (items) {
      console.log(items);
      items.remove('tags');
      //
      //
      // items.add('tags', LinkButton.component({
      //   icon: 'th-large',
      //   children: app.translator.trans('flarum-tags.forum.index.tags_link'),
      //   href: app.route('tags')
      // }), -10);
      //
      // if (app.current instanceof TagsPage) return;
      //
      // items.add('separator', Separator.component(), -10);
      //
      // const params = this.stickyParams();
      // const tags = app.store.all('tags');
      // const currentTag = this.currentTag();
      //
      // const addTag = tag => {
      //   let active = currentTag === tag;
      //
      //   if (!active && currentTag) {
      //     active = currentTag.parent() === tag;
      //   }
      //
      //   items.add('tag' + tag.id(), TagLinkButton.component({tag, params, active}), -10);
      // };
      //
      // sortTags(tags)
      //   .filter(tag => tag.position() !== null && (!tag.isChild() || (currentTag && (tag.parent() === currentTag || tag.parent() === currentTag.parent()))))
      //   .forEach(addTag);
      //
      // const more = tags
      //   .filter(tag => tag.position() === null)
      //   .sort((a, b) => b.discussionsCount() - a.discussionsCount());
      //
      // more.splice(0, 3).forEach(addTag);
      //
      // if (more.length) {
      //   items.add('moreTags', LinkButton.component({
      //     children: app.translator.trans('flarum-tags.forum.index.more_link'),
      //     href: app.route('tags')
      //   }), -10);
      // }
    });
  });

  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsIndexPage) {
      IndexPage = _flarumComponentsIndexPage.default;
    }, function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }, function (_flarumTagsComponentsTagLinkButton) {
      TagLinkButton = _flarumTagsComponentsTagLinkButton.default;
    }, function (_flarumTagsComponentsTagsPage) {
      TagsPage = _flarumTagsComponentsTagsPage.default;
    }, function (_flarumTagsUtilsSortTags) {
      sortTags = _flarumTagsUtilsSortTags.default;
    }],
    execute: function () {}
  };
});