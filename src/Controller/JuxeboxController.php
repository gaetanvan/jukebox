<?php

namespace App\Controller;

use App\Service\CallApiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JuxeboxController extends AbstractController
{
    #[Route('/', name: 'app_juxebox')]
    public function index(CallApiService $service): Response
    {
        return $this->render('juxebox/index.html.twig', [
            'data' => $service->getMusicData(),
        ]);
    }
}
