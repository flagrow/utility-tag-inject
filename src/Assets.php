<?php

namespace Flagrow\InjectUtilityTags;

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * @deprecated use Extenders for Flarum beta 8.
 */
class Assets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'assets']);
    }

    public function assets(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $event->addAssets(__DIR__ . '/../js/forum/dist/extension.js');
            $event->addBootstrapper('flagrow/utility-tag-inject/main');
        }
    }
}
