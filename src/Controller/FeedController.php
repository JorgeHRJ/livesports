<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}
