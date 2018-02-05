import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import TagUtilityLinkButton from './components/TagUtilityLinkButton';
import ItemList from 'flarum/utils/ItemList';
import SeparatorHeader from './components/SeparatorHeader';

export default function() {
  // Add a link to the tags page, as well as a list of all the tags,
  // to the index page's sidebar.
  extend(IndexPage.prototype, 'navItems', function(list) {
      const params = this.stickyParams();
      const tags = app.store.all('tags');
      const currentTag = this.currentTag();
      const replaces = new ItemList;

      const addTag = (parent, tag) => {
          let active = currentTag === tag;

          if (!active && currentTag) {
              active = currentTag.parent() === tag;
          }

          replaces.add(
              'tag' + parent.id() + '-utility' + tag.id(),
              TagUtilityLinkButton.component({tag, params, active, parent}),
              -10
          );
      };

      for (const key in list.items) {
          replaces.add(key, list.items[key].content, list.items[key].priority)

          if (key.startsWith('tag') && key != 'tags') {
              const id = key.replace(/^tag/, '');
              const parent = tags.find(tag => tag.data.id == id);

              if (parent.usesUtilityTags().length > 0) {
                  replaces.add(
                      'tag'+parent.id() + '-header-utility',
                      new SeparatorHeader,
                      -10
                  )
              }

              parent.usesUtilityTags().forEach(utilityId => {
                  const utility = tags.find(tag => tag.data.id == utilityId);
                  addTag(parent, utility);
              })
          }
      }

      list.items = replaces.items;
  });
}
