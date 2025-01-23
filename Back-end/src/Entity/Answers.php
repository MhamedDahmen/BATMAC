<?php

namespace App\Entity;

use App\Repository\AnswersRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

#[ORM\Entity(repositoryClass: AnswersRepository::class)]
/**
 * @ApiResource(formats={"json"})
 */
class Answers
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $solution;

    #[ORM\OneToOne(targetEntity: Questions::class, cascade: ['persist', 'remove'])]
    private $id_question;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSolution(): ?string
    {
        return $this->solution;
    }

    public function setSolution(string $solution): self
    {
        $this->solution = $solution;

        return $this;
    }

    public function getIdQuestion(): ?questions
    {
        return $this->id_question;
    }

    public function setIdQuestion(?questions $id_question): self
    {
        $this->id_question = $id_question;

        return $this;
    }
    public function toArray() 
    {
        return ['id'=>$this->id,'answer'=>$this->getSolution()] ; 
    }
}
