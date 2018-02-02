<?php

namespace Flagrow\InjectUtilityTags;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Tag;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class Relations
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'attributes']);
    }

    public function attributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(TagSerializer::class)) {
            /** @var Tag $tag */
            $tag = $event->model;

            if ($tag->position === null && $tag->parent_id === null) {
                $event->attributes['usesUtilityTags'] = [];
            } else {
                $event->attributes['usesUtilityTags'] = Tag::whereVisibleTo($event->actor)->withStateFor($event->actor)
                    ->whereNull('position')
                    ->whereNull('parent_id')
                    ->whereHas('discussions.tags', function ($q) use ($tag) {
                        $q->where('id', $tag->id);
                    })
                    ->get()->pluck('id')->all();
            }
        }
    }
}
