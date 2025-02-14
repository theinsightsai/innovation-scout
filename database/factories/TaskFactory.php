<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::where('role_id', 2)->inRandomOrder()->first()->id ?? User::factory(),
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['pending', 'completed']),
            'priority' => $this->faker->randomElement(['highest', 'high', 'medium', 'low', 'lowest']),
            'assign_to' => User::where('role_id', 2)->inRandomOrder()->first()->id ?? User::factory(),
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
