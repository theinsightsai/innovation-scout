<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\CommonUserTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use CommonUserTrait;

    #--- Users Registration ---#
    public function registration(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'name' => ['required', 'string'],
            'password' => 'required',
            'role_id' => ['required', 'exists:roles,id']
        ]);

        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first(), [], 400);
        }

        try {
            $user =   $this->storeUserData($request->input());
            if ($user) {
                $user->token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
            }
            return ResponseHelper::SUCCESS('User register successfuly', $user, 200);
        } catch (Exception $e) {
            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
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
                $user = auth()->user()->load('role');
                $user->token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
                return ResponseHelper::SUCCESS('User login successfuly', $user, 200);
            }
            return ResponseHelper::ERROR('Email or password not match', [], 400);
        } catch (Exception $e) {
           
            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
    }


    #---- LOGOUT ----#
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return ResponseHelper::SUCCESS('User logout successfuly');
    }
}
