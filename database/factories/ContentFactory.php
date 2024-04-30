<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class ContentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => rand(1, 3),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'filepath' => "videos/1714072160.mp4",
            'thumbnail' => fake()->imageUrl(640, 480, 'animals', true)
        ];
    }
}
