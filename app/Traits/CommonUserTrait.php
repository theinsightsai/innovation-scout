<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

trait CommonUserTrait
{
    public $exceptionMessage = 'Something went wrong';
    #--- Store User Data ---#
    public function storeUserData($request, $userId = null)
    {
        if ($userId) {
            $user = User::find($userId);
        } else {
            $user = new User();
        }
        $user->name   = $request['name'];
        $user->email  = $request['email'];
        $user->status  = $request['status'] ?? 1;
        if(isset($request['image']) && !empty($request['image'])){
            $user->image  = $request['image'];
        }
        if (isset($request['password']) && !empty($request['password'])) {
            $user->password = Hash::make($request['password']);
        }
        $user->role_id = $request['role_id'] ?? 3; // external users 
        $user->save();
        return $user;
    }

    #--- UPLOAD PROFILE IMAGE ----#
    public function upload($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('uploads/profiles', $imageName, 'public');
    }
}
