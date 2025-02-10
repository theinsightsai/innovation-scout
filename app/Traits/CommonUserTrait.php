<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

trait CommonUserTrait
{
    public $exceptionMessage = 'Something went wrong';
    #--- Store User Data ---#
    public function storeUserData($request)
    {
        $user = new User();
        $user->name   = $request['name'];
        $user->email  = $request['email'];
        $user->password = Hash::make($request['password']);
        $user->role_id = $request['role_id'] ?? 3; // external users 
        $user->save();
        return $user;
    }
}
