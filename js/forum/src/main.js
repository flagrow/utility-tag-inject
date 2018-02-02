import {extend} from 'flarum/extend';
import Model from 'flarum/Model';
import Tag from 'flarum/tags/models/Tag';
import addTagList from './addTagList';

app.initializers.add('flagrow-utility-tag-inject', function(app) {
    Tag.prototype.usesUtilityTags = Model.attribute('usesUtilityTags') || [];
    addTagList();
}, -10);
