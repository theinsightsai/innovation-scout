<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function assignTo()
    {
        return $this->hasOne(User::class, 'id', 'assign_to');
    }
}
