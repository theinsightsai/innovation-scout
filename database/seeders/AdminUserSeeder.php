<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'admin first',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);

        User::factory()->create([
            'name' => 'admin demo',
            'email' => 'admin@demo.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);
    }
}
