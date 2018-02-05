'use strict';

System.register('flagrow/utility-tag-inject/addTagList', ['flarum/extend', 'flarum/components/IndexPage', './components/TagUtilityLinkButton', 'flarum/utils/ItemList', './components/SeparatorHeader'], function (_export, _context) {
    "use strict";

    var extend, IndexPage, TagUtilityLinkButton, ItemList, SeparatorHeader;

    _export('default', function () {
        // Add a link to the tags page, as well as a list of all the tags,
        // to the index page's sidebar.
        extend(IndexPage.prototype, 'navItems', function (list) {
            var params = this.stickyParams();
            var tags = app.store.all('tags');
            var currentTag = this.currentTag();
            var replaces = new ItemList();

            var addTag = function addTag(parent, tag) {
                var active = currentTag === tag;

                if (!active && currentTag) {
                    active = currentTag.parent() === tag;
                }

                replaces.add('tag' + parent.id() + '-utility' + tag.id(), TagUtilityLinkButton.component({ tag: tag, params: params, active: active, parent: parent }), -10);
            };

            for (var key in list.items) {
                replaces.add(key, list.items[key].content, list.items[key].priority);

                if (key.startsWith('tag') && key != 'tags') {
                    (function () {
                        var id = key.replace(/^tag/, '');
                        var parent = tags.find(function (tag) {
                            return tag.data.id == id;
                        });

                        if (parent.usesUtilityTags().length > 0) {
                            replaces.add('tag' + parent.id() + '-header-utility', new SeparatorHeader(), -10);
                        }

                        parent.usesUtilityTags().forEach(function (utilityId) {
                            var utility = tags.find(function (tag) {
                                return tag.data.id == utilityId;
                            });
                            addTag(parent, utility);
                        });
                    })();
                }
            }

            list.items = replaces.items;
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
        }, function (_componentsTagUtilityLinkButton) {
            TagUtilityLinkButton = _componentsTagUtilityLinkButton.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_componentsSeparatorHeader) {
            SeparatorHeader = _componentsSeparatorHeader.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/utility-tag-inject/components/TagUtilityLinkButton', ['flarum/components/LinkButton', 'flarum/tags/helpers/tagIcon'], function (_export, _context) {
    "use strict";

    var LinkButton, tagIcon, TagUtilityLinkButton;
    return {
        setters: [function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
        }, function (_flarumTagsHelpersTagIcon) {
            tagIcon = _flarumTagsHelpersTagIcon.default;
        }],
        execute: function () {
            TagUtilityLinkButton = function (_LinkButton) {
                babelHelpers.inherits(TagUtilityLinkButton, _LinkButton);

                function TagUtilityLinkButton() {
                    babelHelpers.classCallCheck(this, TagUtilityLinkButton);
                    return babelHelpers.possibleConstructorReturn(this, (TagUtilityLinkButton.__proto__ || Object.getPrototypeOf(TagUtilityLinkButton)).apply(this, arguments));
                }

                babelHelpers.createClass(TagUtilityLinkButton, [{
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;
                        var active = this.constructor.isActive(this.props);
                        var description = tag && tag.description();

                        return m(
                            'a',
                            { className: 'TagLinkButton TagUtilityLinkButton hasIcon ' + (tag.isChild() ? 'child' : ''), href: this.props.href, config: m.route,
                                style: active && tag ? { color: tag.color() } : '',
                                title: description || '' },
                            tagIcon(tag, { className: 'Button-icon' }),
                            this.props.children
                        );
                    }
                }], [{
                    key: 'initProps',
                    value: function initProps(props) {
                        var tag = props.tag;
                        var parent = props.parent;

                        var params = "tag:" + tag.slug() + " tag:" + parent.slug();

                        props.href = app.route('index', { q: params });
                        props.children = tag ? tag.name() : app.translator.trans('flarum-tags.forum.index.untagged_link');
                    }
                }]);
                return TagUtilityLinkButton;
            }(LinkButton);

            _export('default', TagUtilityLinkButton);
        }
    };
});;
'use strict';

System.register('flagrow/utility-tag-inject/main', ['flarum/extend', 'flarum/Model', 'flarum/tags/models/Tag', './addTagList'], function (_export, _context) {
    "use strict";

    var extend, Model, Tag, addTagList;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumTagsModelsTag) {
            Tag = _flarumTagsModelsTag.default;
        }, function (_addTagList) {
            addTagList = _addTagList.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-utility-tag-inject', function (app) {
                Tag.prototype.usesUtilityTags = Model.attribute('usesUtilityTags') || [];
                addTagList();
            }, -10);
        }
    };
});;
'use strict';

System.register('flagrow/utility-tag-inject/components/SeparatorHeader', ['flarum/Component'], function (_export, _context) {
    "use strict";

    var Component, SeparatorHeader;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }],
        execute: function () {
            SeparatorHeader = function (_Component) {
                babelHelpers.inherits(SeparatorHeader, _Component);

                function SeparatorHeader() {
                    babelHelpers.classCallCheck(this, SeparatorHeader);
                    return babelHelpers.possibleConstructorReturn(this, (SeparatorHeader.__proto__ || Object.getPrototypeOf(SeparatorHeader)).apply(this, arguments));
                }

                babelHelpers.createClass(SeparatorHeader, [{
                    key: 'view',
                    value: function view() {
                        return m(
                            'li',
                            { className: 'Dropdown-separator TagInject--Utility-Header' },
                            app.translator.trans('flagrow-utility-tag-inject.forum.tags.utility-header')
                        );
                    }
                }]);
                return SeparatorHeader;
            }(Component);

            SeparatorHeader.isListItem = true;

            _export('default', SeparatorHeader);
        }
    };
});