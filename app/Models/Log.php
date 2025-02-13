<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use Searchable;
    protected $fillable = ['user_id', 'action', 'ip_address'];
    protected $searchable = ['action', 'ip_address'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
