<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public $exceptionMessage = 'Something went wrong';

    #--- Users Registration ---#
    public function registration(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => ['required', 'string'],
            'password' => 'required',
            'role_id' => ['required', 'exists:roles,id']
        ]);

        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first(), [], 400);
        }

        try {
            $user =   $this->storeUserData($request);
            if ($user) {
                $user->token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
            }
            return ResponseHelper::SUCCESS('User register successfuly', $user, 200);
        } catch (Exception $e) {
            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
    }

    #--- Store User Data ---#
    public function storeUserData(Request $request)
    {
        $user = new User();
        $user->name   = $request->name;
        $user->email  = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_id = $request['role_id'] ?? 3; // external users 
        $user->save();
        return $user;
    }

    #--- User Login ---#
    public function login(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first(), [], 400);
        }
        try {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                $user->token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
                return ResponseHelper::SUCCESS('User login successfuly', $user, 200);
            }
            return ResponseHelper::ERROR('Email or password not match', [], 400);
        } catch (Exception $e) {
            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
    }
}
