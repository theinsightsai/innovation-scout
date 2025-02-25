<?php

namespace App\Http\Controllers\Api;

use App\Helpers\LogHelper;
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
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }

        try {
            $user =   $this->storeUserData($request->input());
            if ($user) {
                $user->token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
            }
            LogHelper::logAction($user->id, 'User Registration');
            return ResponseHelper::SUCCESS('User register successfuly', $user);
        } catch (Exception $e) {
            return ResponseHelper::ERROR($this->exceptionMessage);
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
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user()->load('role');
                $user->token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
                LogHelper::logAction($user->id, 'User Login');
                return ResponseHelper::SUCCESS('User login successfuly', $user);
            }
            return ResponseHelper::ERROR('Email or password not match');
        } catch (Exception $e) {
            dd($e);
            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }


    #---- LOGOUT ----#
    public function logout(Request $request)
    {
        LogHelper::logAction(Auth::id(), 'User Logout');
        Auth::user()->tokens()->delete();
        return ResponseHelper::SUCCESS('User logout successfuly');
    }
}
