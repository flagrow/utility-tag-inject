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
            var tags = app.store.all('tags');

            items.toArray().forEach(component, function (key) {
                // we found a tagN tag listed, now the appended relationship
                // will indicate whether it has discussions with auxiliary tags
                if (key.startsWith('tag')) {}
            });
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