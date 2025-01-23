<?php

namespace App\Controller;

use App\Entity\Questions;
use App\Entity\Answers;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\QuestionsRepository ; 
use ApiPlatform\Core\Annotation\ApiResource;
/**
 * @Route("/solution")
 */


class SolutionController extends AbstractController
{
        /** 
         * @Route ("/post", name="solution_add", methods={"POST"})
         */
        public function add(Request $request,QuestionsRepository $QuestionRepository):Response {
            
            $solution = new Answers();
            
            
            $parameter = json_decode($request->getContent(), true);
            
            $solution->setSolution($parameter['solution']);

            

            $qi = $QuestionRepository->findOneBy(['id'=> $parameter['idquestion']]);
            
            $solution->setIdQuestion($qi);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($solution);
            $em-> flush ();


            return  $this->json("a77");
        }
         /**
           * @Route ("/update/{id}", name="solution_update", methods={"PUT"})
           */
     
          public function update(Request $request, $id, QuestionsRepository $questionRepository):Response {
            $solution = new Answers();
            $data= $this->getDoctrine()->getRepository(Answers::class)->find($id);
            $parameter = json_decode($request->getContent(), true);
            
            $data->setSolution($parameter['solution']);
            $Answers = $questionRepository->findOneBy(['id'=> $parameter['idquestion']]);
            
            $data->setIdQuestion($Answers);
            
            $em = $this->getDoctrine()->getManager();
            $em ->persist ($data);
            $em-> flush ();


            return  $this->json('tbadalt eb3ed zebi');
        }
         /** 
         * @Route ("/delete/{id}", name="solution_delete", methods={"DELETE"})
            */
            public function delete($id):Response {
              $solution = new Answers();
              $data= $this->getDoctrine()->getRepository(Answers::class)->find($id);
              //$solution = $questionRepository->findOneBy(['id'=> $parameter['idquestion']]);
             // $data->getIdQuestion($solution);
              $em = $this->getDoctrine()->getManager();
              $em ->remove ($data);
              $em-> flush ();
  
  
              return  $this->json('deleted');
          }
}
