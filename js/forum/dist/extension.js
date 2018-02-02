'use strict';

System.register('flagrow/utility-tag-inject/addTagList', ['flarum/extend', 'flarum/components/IndexPage', './components/TagUtilityLinkButton'], function (_export, _context) {
    "use strict";

    var extend, IndexPage, TagUtilityLinkButton;

    _export('default', function () {
        // Add a link to the tags page, as well as a list of all the tags,
        // to the index page's sidebar.
        extend(IndexPage.prototype, 'navItems', function (list) {
            var params = this.stickyParams();
            var tags = app.store.all('tags');
            var currentTag = this.currentTag();

            var addTag = function addTag(parent, tag) {
                var active = currentTag === tag;

                if (!active && currentTag) {
                    active = currentTag.parent() === tag;
                }

                list.add('utilityTag' + parent.id() + '-' + tag.id(), TagUtilityLinkButton.component({ tag: tag, params: params, active: active }), -10);
            };

            for (var key in list.items) {
                if (key.startsWith('tag') && key != 'tags') {
                    (function () {
                        var id = key.replace(/^tag/, '');
                        var parent = tags.find(function (tag) {
                            return tag.data.id == id;
                        });

                        parent.usesUtilityTags().forEach(function (utilityId) {
                            var utility = tags.find(function (tag) {
                                return tag.data.id == utilityId;
                            });
                            addTag(parent, utility);
                        });
                    })();
                }
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
        }, function (_componentsTagUtilityLinkButton) {
            TagUtilityLinkButton = _componentsTagUtilityLinkButton.default;
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

                        props.params.tags = tag ? tag.slug() : 'untagged';
                        props.href = app.route('tag', props.params);
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
});