<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\Publisher;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/", name="feed_")
 */
class FeedController extends AbstractController
{
    const FEED_TOPIC = 'feed';

    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        return $this->render('feed/index.html.twig');
    }

    /**
     * @Route("/feed/update", name="update")
     */
    public function update()
    {
        return $this->render('feed/update.html.twig');
    }

    /**
     * @Route("/feed/publish", name="publish", methods={"POST"})
     *
     * @param Request $request
     * @param Publisher $publisher
     *
     * @return JsonResponse
     */
    public function publish(Request $request, Publisher $publisher)
    {
        $update = new Update(self::FEED_TOPIC, $request->getContent());
        $publisher($update);

        return new JsonResponse(null, JsonResponse::HTTP_OK);
    }
}
