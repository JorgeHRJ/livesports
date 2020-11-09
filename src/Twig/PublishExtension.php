<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class PublishExtension extends AbstractExtension
{
    /** @var string */
    private $hubUrl;

    public function __construct(string $hubUrl)
    {
        $this->hubUrl = $hubUrl;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('get_hub_url', [$this, 'getHubUrl'])
        ];
    }

    /**
     * @return string
     */
    public function getHubUrl(): string
    {
        return $this->hubUrl;
    }
}
