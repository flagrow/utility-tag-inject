import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import Separator from 'flarum/components/Separator';
import LinkButton from 'flarum/components/LinkButton';

import TagLinkButton from 'flarum/tags/components/TagLinkButton';
import TagsPage from 'flarum/tags/components/TagsPage';
import sortTags from 'flarum/tags/utils/sortTags';

export default function() {
  // Add a link to the tags page, as well as a list of all the tags,
  // to the index page's sidebar.
  extend(IndexPage.prototype, 'navItems', function(items) {
      const tags = app.store.all('tags');

      items.toArray().forEach(component, key => {
          // we found a tagN tag listed, now the appended relationship
          // will indicate whether it has discussions with auxiliary tags
          if (key.startsWith('tag')) {

          }
      })
  });
}
