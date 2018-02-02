import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import TagUtilityLinkButton from './components/TagUtilityLinkButton';

export default function() {
  // Add a link to the tags page, as well as a list of all the tags,
  // to the index page's sidebar.
  extend(IndexPage.prototype, 'navItems', function(list) {
      const params = this.stickyParams();
      const tags = app.store.all('tags');
      const currentTag = this.currentTag();

      const addTag = (parent, tag) => {
          let active = currentTag === tag;

          if (!active && currentTag) {
              active = currentTag.parent() === tag;
          }

          list.add(
              'utilityTag' + parent.id() + '-' + tag.id(),
              TagUtilityLinkButton.component({tag, params, active}),
              -10);
      };

      for (const key in list.items) {
          if (key.startsWith('tag') && key != 'tags') {
              const id = key.replace(/^tag/, '');
              const parent = tags.find(tag => tag.data.id == id);

              parent.usesUtilityTags().forEach(utilityId => {
                  const utility = tags.find(tag => tag.data.id == utilityId);
                  addTag(parent, utility);
              })
          }
      }
  });
}
