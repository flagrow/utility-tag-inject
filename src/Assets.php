<?php

namespace Flagrow\InjectUtilityTags;

use DirectoryIterator;
use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * @deprecated use Extenders for Flarum beta 8.
 */
class Assets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'assets']);
        $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
    }

    public function assets(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $event->addAssets([
                __DIR__ . '/../resources/less/tag-utility-link-button.less',
                __DIR__ . '/../js/forum/dist/extension.js'
            ]);
            $event->addBootstrapper('flagrow/utility-tag-inject/main');
        }
    }

    /**
     * Provides i18n files.
     *
     * @param ConfigureLocales $event
     */
    public function addLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__ . '/../resources/locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
            }
        }
    }
}
