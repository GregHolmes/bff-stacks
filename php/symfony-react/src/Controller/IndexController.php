<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class IndexController extends Controller
{
    /**
     * @Route("/{reactRoute}", name="react_path", defaults={"reactRoute": null}, requirements={"page": "^(?!api).+"})
     */
    public function dashboard(): Response
    {
        return $this->render('index.html.twig');
    }
}
