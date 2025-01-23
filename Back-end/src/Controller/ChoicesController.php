<?php

namespace App\Controller;

use App\Entity\Questions;
use App\Entity\Reponses;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\QuestionsRepository ; 
use App\Repository\ReponsesRepository ; 
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client ; 

require_once '../vendor/autoload.php'; 
// use App\Repository\TestRepository ;

/**
 * @Route("/choices")
 */

class ChoicesController extends AbstractController
{

     
      /**
     * @Route("/batmac/getchoices", name="getC", methods={"GET"})
     */
    public function index(ReponsesRepository $choixRepositor): Response
    {
         $choix=  $choixRepositor->findAll() ;  
    
        $choixArray = [] ; 
      
       

        foreach($choix as $choice)
         {
               $choixArray[]=$choice->toArray(); 
                            
          }
         
        

         
          return $this->json( $choixArray ) ;  
     } 












   /** 
         * @Route ("/post", name="choix_add", methods={"POST"})
         */
        public function add(Request $request,QuestionsRepository $QuestionRepository):Response {
            
            $choix = new Reponses();
            
            
            $parameter = json_decode($request->getContent(), true);
            
            $choix->setReponse($parameter['choix']);

            

            $qi = $QuestionRepository->findOneBy(['id'=> $parameter['idquestion']]);
            
            $choix->setIdQuestion($qi);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($choix);
            $em-> flush ();


 

 


            return  $this->json("a77");
        }
         /**
           * @Route ("/update/{id}", name="reponse_update", methods={"PUT"})
           */
     
          public function update(Request $request, $id, QuestionsRepository $questionRepository):Response {
            $choix = new Reponses();
            $data= $this->getDoctrine()->getRepository(Reponses::class)->find($id);
            $parameter = json_decode($request->getContent(), true);
            
            $data->setReponse($parameter['choix']);
            $choix = $questionRepository->findOneBy(['id'=> $parameter['idquestion']]);
            
            $data->setIdQuestion($choix);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($data);
            $em-> flush ();


            return  $this->json('tbadalt eb3ed zebi');
        }

          /** 
         * @Route ("/delete/{id}", name="answer_delete", methods={"DELETE"})
            */
            public function delete($id):Response {
              $choix = new Reponses();
              $data= $this->getDoctrine()->getRepository(Reponses::class)->find($id);
              
              $em = $this->getDoctrine()->getManager();
              $em ->remove ($data);
              $em-> flush ();
  
  
              return  $this->json('deleted');
          }
}

