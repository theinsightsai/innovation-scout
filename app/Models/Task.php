<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use Searchable;

    protected $searchable = ['title', 'assignTo.name'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function assignTo()
    {
        return $this->hasOne(User::class, 'id', 'assign_to');
    }
}


