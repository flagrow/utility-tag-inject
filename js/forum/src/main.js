import {extend} from 'flarum/extend';

import addTagList from './addTagList';

app.initializers.add('flagrow-utility-tag-inject', function(app) {
    addTagList()
});
