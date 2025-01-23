<?php

namespace App\Controller;

use App\Entity\Questions;
use App\Entity\Test;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Repository\QuestionsRepository ; 
use App\Repository\TestRepository;
use ApiPlatform\Core\Annotation\ApiResource;
/**
 * @Route("/question")
 */


class QuestionsController extends AbstractController
{
        
      /**
     * @Route("/batmac/getQuestions", name="getQ", methods={"GET"})
     */
     public function index(QuestionsRepository $questionRepositor): Response
     {
          $questions =  $questionRepositor->findAll() ;  
     
         $QuestionsArray = [] ; 
       
        
 
         foreach($questions as $question)
          {
                $QuestionsArray[]=$question->toArray(); 
                             
           }
          
         
 
          
           return $this->json( $QuestionsArray ) ;  
      } 


 

        /** 
         * @Route ("/post", name="question_add", methods={"POST"})
         */
        public function add(Request $request,TestRepository $TestRepository):Response {
            $question = new Questions();
            
            
            $parameter = json_decode($request->getContent(), true);
            
            $question->setQuestion($parameter['question']);
            $test = $TestRepository->findOneBy(['id'=> $parameter['idtest']]);
            
            $question->setIdTest($test);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($question);
            $em-> flush ();


            return  $this->json('gshqjhj');
        }


           /**
           * @Route ("/update/{id}", name="question_update", methods={"PUT"})
           */
     
          public function update(Request $request, $id, TestRepository $TestRepository):Response {
            $question = new questions();
            $data= $this->getDoctrine()->getRepository(Questions::class)->find($id);
            $parameter = json_decode($request->getContent(), true);
            
            $data->setQuestion($parameter['question']);
            $question = $TestRepository->findOneBy(['id'=> $parameter['idtest']]);
            
            $data->setIdTest($question);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($data);
            $em-> flush ();


            return  $this->json('tbadalt eb3ed zebi');
        }

            /** 
         * @Route ("/delete/{id}", name="question_delete", methods={"DELETE"})
            */
            public function delete($id):Response {
                $question = new Questions();
                $data= $this->getDoctrine()->getRepository(Questions::class)->find($id);
                
                $em = $this->getDoctrine()->getManager();
                $em ->remove ($data);
                $em-> flush ();
    
    
                return  $this->json('deleted');
            }



}
