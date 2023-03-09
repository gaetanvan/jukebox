<?php

namespace App\Controller;

use App\Entity\Favorites;
use App\Entity\User;
use App\Service\CallApiService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class JuxeboxController extends AbstractController
{
    #[Route('/', name: 'app_juxebox')]
    public function index(CallApiService $service, Request $request, EntityManagerInterface $entityManager, Security
    $security):
    Response
    {
//        $body = $request->getContent();
//        $data = json_decode($body, true);
//        $user = $this->getUser();
////        $user = $entityManager->getRepository(User::class)->findOneBy(['id' => '1']);
////        $userId = $user->getId();
////        $favorites2 = $user->getFavorites();
////        $favorites = $entityManager->getRepository(Favorites::class)->findBy(['userId' => $user]);
//        $favorites = $user->getFavorites();
//        foreach ($favorites as $favorite){
//            dd($favorite->getUserId());
//        }
//
//
//
//        if(isset($data)) {
//            $myArray = $data['myArray'];
//            $jsonData = json_encode($myArray);
//            // Récupère l'id de l'utilisateur connecté
//
//           // $favoritesRepository = $entityManager->getRepository(Favorites::class);
//            // Enregistrer les données dans une base de données
//             if($favorites) {
//                $favorites->setMusicId($jsonData);
//                $entityManager->flush();
//             }
//             else {
//                $favorites = new Favorites();
//                $favorites->setMusicId($jsonData);
//                $favorites->addUserId($user);
//                 $entityManager->persist($favorites);
//                 $entityManager->flush();
//            }
//        }
        return $this->render('juxebox/index.html.twig', [
            'data' => $service->getMusicData(),

        ]);
    }

    #[Route('/favoris/ajout/{id}', name: 'app_favoris')]
    public function ajoutFavoris(Favorites $favorites, User $user, EntityManagerInterface $entityManager)
    {
        $userId = $this->getUser();
        $user->addFavorite($userId->getId());

        $entityManager->persist($user);
        $entityManager->flush();
        return $this->redirect('app_juxebox');
    }

    #[Route('/favoris/retrait/{id}', name: 'app_delete_favoris')]
    public function retraitFavoris(Favorites $favorites, User $user, EntityManagerInterface $entityManager)
    {
        $user->removeFavorite($this->getUser());

        $entityManager->persist($user);
        $entityManager->flush();
        return $this->redirect('app_juxebox');
    }
}
