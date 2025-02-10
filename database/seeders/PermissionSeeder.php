<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::factory()->create([
            'name' => 'Create Lead',
            'slug' => 'create_lead'
        ]);
        Permission::factory()->create([
            'name' => 'Edit Lead',
            'slug' => 'edit_lead'
        ]);
        Permission::factory()->create([
            'name' => 'Show Lead',
            'slug' => 'show_lead'
        ]);
    }
}
