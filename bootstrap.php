<?php

namespace Flagrow\InjectUtilityTags;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Assets::class);
    $events->subscribe(Relations::class);
};
