import LinkButton from 'flarum/components/LinkButton';
import tagIcon from 'flarum/tags/helpers/tagIcon';

export default class TagUtilityLinkButton extends LinkButton {
    view() {
        const tag = this.props.tag;
        const active = this.constructor.isActive(this.props);
        const description = tag && tag.description();

        return (
            <a className={'TagLinkButton TagUtilityLinkButton hasIcon ' + (tag.isChild() ? 'child' : '')} href={this.props.href} config={m.route}
                style={active && tag ? {color: tag.color()} : ''}
                title={description || ''}>
                {tagIcon(tag, {className: 'Button-icon'})}
                {this.props.children}
            </a>
        );
    }

    static initProps(props) {
        const tag = props.tag;
        const parent = props.parent;

        const params = "tag:" + tag.slug() + " tag:" + parent.slug();

        props.href = app.route('index', {q: params});
        props.children = tag ? tag.name() : app.translator.trans('flarum-tags.forum.index.untagged_link');
    }
}
