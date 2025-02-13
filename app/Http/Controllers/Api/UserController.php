<?php

namespace App\Http\Controllers\Api;

use App\Helpers\LogHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Traits\CommonUserTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    use CommonUserTrait;
    public function __construct()
    {
        $this->middleware('PermissionCheck')->only('updateProfile'); // check is admin or have permissions

    }

    #---- GET USER DATA ---#
    public function getUserData($id = null)
    {
        if ($id) {
            $user_id = $id;
        } else {
            $user_id = Auth::id();
        }
        $data = User::with(['role'])->find($user_id);
        // LogHelper::logAction(Auth::id(), 'User data fetch');
        return  ResponseHelper::SUCCESS('User data', $data);
    }

    #--- UPDATE PROFILE ----#
    public function updateProfile(Request $request)
    {
        $userId = $request->user_id ?? Auth::id();
        $valid = Validator::make($request->all(), [
            'email' => 'nullable|email|unique:users,email,' . $userId,
            'name' => ['nullable', 'string'],
            'role_id' => ['nullable', 'exists:roles,id'],
            'status' => ['required', Rule::in(0, 1)]
        ]);

        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }

        try {
            $userId = $request->user_id ?? Auth::id();
            $data = $request->input();
            if ($request->hasFile('image')) {
                $data['image'] = $this->upload($request->image);
            }
            $user =  $this->storeUserData($data, $userId);
            LogHelper::logAction(Auth::id(), 'User data updated');
            return ResponseHelper::SUCCESS('Data updated successfuly', $user);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }
}
