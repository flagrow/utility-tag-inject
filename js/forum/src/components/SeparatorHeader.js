import Component from 'flarum/Component';

/**
 * The `Separator` component defines a menu separator item.
 */
class SeparatorHeader extends Component {
    view() {
        return <li className="Dropdown-separator TagInject--Utility-Header">{app.translator.trans('flagrow-utility-tag-inject.forum.tags.utility-header')}</li>;
    }
}

SeparatorHeader.isListItem = true;

export default SeparatorHeader;
