<?php

namespace App\Controller;
use App\Entity\Test;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\TestRepository ;


/**
 * @Route("/batmac/test")
 */


class TestController extends AbstractController
{


      /**
     * @Route("/aleatoire", name="aleatoire", methods={"GET"})
     */
     public function aleatoire(TestRepository $testRepository): Response
    {
         $Tests =  $testRepository->findAll() ;  
    
        $testArray = [] ; 
       $randomArray = [] ;
       $allTest=[];
       

        foreach($Tests as $test)
         {
               $testArray[]=$test->toArray(); 
                            
          }
         
          $random = array_rand($testArray);
          $v =  $testArray[$random];
          $randomArray  [] = $v ; 

         
          return $this->json( $randomArray ) ;  
     } 


    
        /** 
         * @Route ("/post", name="Test_add", methods={"POST"})
         */
        public function add(Request $request):Response {
            $Test = new Test();
            
            $parameter = json_decode($request->getContent(), true);
            
            $Test->setTitle($parameter['title']);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($Test);
            $em-> flush ();


            return  $this->json($Test);
        }


          /**
           * @Route ("/update/{id}", name="test_update", methods={"PUT"})
           */
     
          public function update(Request $request, $id):Response {
            $test = new Test();
            $data= $this->getDoctrine()->getRepository(Test::class)->find($id);
            $parameter = json_decode($request->getContent(), true);
            
            $data->setTitle($parameter['title']);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($data);
            $em-> flush ();


            return  $this->json('tbadalt ');
        }


 /** 
         * @Route ("/delete/{id}", name="test_delete", methods={"DELETE"})
            */
            public function delete($id):Response {
              $test = new Test();
              $data= $this->getDoctrine()->getRepository(Test::class)->find($id);
              
              $em = $this->getDoctrine()->getManager();
              $em ->remove ($data);
              $em-> flush ();
  
  
              return  $this->json('deleted');
          }


           /** 
            * @Route ("/getQuestions/{id}", name="c", methods={"GET"})
            */
            public function getQuestionOfThisTest($id):Response {
             
              $test= $this->getDoctrine()->getRepository(Test::class)->find($id);
              $questionsArray = [] ; 

              foreach($test->getQuestions() as $question)
                {
                  $questionsArray[] = $question->toArray() ; 
                }

      
              return  $this->json($questionsArray); 
          }



}
