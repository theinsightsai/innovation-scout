<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        Role::create([
            'name' => 'admin',
            'slug' => 'admin',

        ]);
        Role::create([
            'name' => 'team',
            'slug' => 'team',
        ]);
        Role::create([
            'name' => 'client',
            'slug' => 'client',
        ]);
        Role::create([
            'name' => 'restrict',
            'slug' => 'restrict'
        ]);
    }
}
