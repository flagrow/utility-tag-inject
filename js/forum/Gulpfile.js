var gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/utility-tag-inject': [
            'src/**/*.js'
        ]
    }
});
