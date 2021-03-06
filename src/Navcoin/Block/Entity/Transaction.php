<?php

namespace App\Navcoin\Block\Entity;

use JMS\Serializer\Annotation\Accessor;

/**
 * Class Transaction
 *
 * @package App\Navcoin\Block\Entity
 */
class Transaction
{
    /**
     * @var String
     */
    private $id;

    /**
     * @var String
     */
    private $hash;

    /**
     * @var int
     */
    private $height;

    /**
     * @var \DateTime
     */
    private $time;

    /**
     * @var float
     */
    private $stake;

    /**
     * @var float
     */
    private $fees;

    /**
     * @var string
     */
    private $type;

    /**
     * @var Inputs
     *
     * @Accessor(getter="getInputElements")
     */
    private $inputs;

    /**
     * @var Outputs
     *
     * @Accessor(getter="getOutputElements")
     */
    private $outputs;

    /**
     * @var string
     */
    private $raw;

    public function __construct(
        String $id,
        String $hash,
        int $height,
        \DateTime $time,
        float $stake,
        float $fees,
        Inputs $inputs,
        Outputs $outputs,
        string $type,
        string $raw
    ) {
        $this->id = $id;
        $this->hash = $hash;
        $this->height = $height;
        $this->time = $time;
        $this->stake = $stake;
        $this->fees = $fees;
        $this->inputs = $inputs;
        $this->outputs = $outputs;
        $this->raw = $raw;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getHash(): string
    {
        return $this->hash;
    }

    public function getHeight(): int
    {
        return $this->height;
    }

    public function getTime(): \DateTime
    {
        return $this->time;
    }

    public function getStake(): float
    {
        return $this->stake;
    }

    public function isStaking(): bool
    {
        return $this->stake ? true : false;
    }

    public function getFees(): float
    {
        return $this->fees;
    }

    public function hasFees(): bool
    {
        return $this->fees ? true : false;
    }

    public function getInputs(): Inputs
    {
        return $this->inputs;
    }

    public function getInputElements(): array
    {
        return $this->inputs->getElements();
    }

    public function getOutputs(): Outputs
    {
        return $this->outputs;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getOutputElements(): array
    {
        return $this->outputs->getElements();
    }

    public function getSpendForAddress(String $address): float
    {
        return (float) $this->outputs->getBalanceForAddress($address) + $this->inputs->getBalanceForAddress($address);
    }

    public function getRaw()
    {
        return $this->raw;
    }
}
