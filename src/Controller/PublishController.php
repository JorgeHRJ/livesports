<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\Publisher;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class PublishController extends AbstractController
{
    const FEED_TOPIC = 'feed';
    const CHAT_TOPIC = 'chat';
    const ALLOWED_TOPICS = [self::FEED_TOPIC, self::CHAT_TOPIC];

    /**
     * @Route("/publish/{topic}", name="publish", methods={"POST"})
     *
     * @param Request $request
     * @param Publisher $publisher
     * @param string $topic
     *
     * @return JsonResponse
     */
    public function publish(Request $request, Publisher $publisher, string $topic)
    {
        if (!in_array($topic, self::ALLOWED_TOPICS)) {
            return new JsonResponse(null, JsonResponse::HTTP_BAD_REQUEST);
        }

        $update = new Update($topic, $request->getContent());
        $publisher($update);

        return new JsonResponse(null, JsonResponse::HTTP_OK);
    }
}
