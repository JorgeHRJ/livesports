<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\Publisher;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/", name="chat_")
 */
class ChatController extends AbstractController
{
    const CHAT_TOPIC = 'chat';

    /**
     * @Route("/chat/publish", name="publish", methods={"POST"})
     *
     * @param Request $request
     * @param Publisher $publisher
     *
     * @return JsonResponse
     */
    public function publish(Request $request, Publisher $publisher)
    {
        $update = new Update(self::CHAT_TOPIC, $request->getContent());
        $publisher($update);

        return new JsonResponse(null, JsonResponse::HTTP_OK);
    }
}
