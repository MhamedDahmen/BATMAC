<?php

namespace App\Entity;

use App\Repository\ReponsesRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

#[ORM\Entity(repositoryClass: ReponsesRepository::class)]
/**
 * @ApiResource(formats={"json"})
 */
class Reponses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $reponse;

    #[ORM\ManyToOne(targetEntity: Questions::class, inversedBy: 'reponses')]
    #[ORM\JoinColumn(nullable: false)]
    private $id_question;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReponse(): ?string
    {
        return $this->reponse;
    }

    public function setReponse(string $reponse): self
    {
        $this->reponse = $reponse;

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
        return [
            'id' => $this->id,
            'choix'=> $this->reponse 
            
        ];
    }
}
