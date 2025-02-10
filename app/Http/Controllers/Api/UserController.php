<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Traits\CommonUserTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use CommonUserTrait;
    public function __construct()
    {
        $this->middleware('PermissionCheck'); // check is admin or have permissions

    }

    #--- GET USERS LISTS ---#
    public function getUsersList($type)
    {
        $users = User::where('role_id', $type)->with(['role'])->paginate(15);
        return  ResponseHelper::SUCCESS('Users lists', $users);
    }


    public function createUser(Request $request)
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

            $user =  $this->storeUserData($request->input());
            return ResponseHelper::SUCCESS('User created successfuly', $user, 200);
            return ResponseHelper::ERROR('Not have access to creat users', [], 400);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
    }

    public function getRoleList(Request $request)
    {
        $data = Role::paginate(10);
        return  ResponseHelper::SUCCESS('Users lists', $data);
    }
}
