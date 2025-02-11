<?php

namespace App\Http\Controllers\Api;

use App\Helpers\LogHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Role;
use App\Models\User;
use App\Traits\CommonFunctionsTrait;
use App\Traits\CommonUserTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    use CommonUserTrait, CommonFunctionsTrait;
    public function __construct()
    {
        $this->middleware('PermissionCheck'); // check is admin or have permissions

    }

    #--- GET USERS LISTS ---#
    public function getUsersList(Request $request)
    {
        $type = $request->type;
        $limit = $request->limit;
        $users = User::where('role_id', $type)->with(['role'])->paginate($limit);
        $data  = $this->paginateData($users);

        return  ResponseHelper::SUCCESS('Users lists', $data);
    }

    #---- CREATE USER ----#
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
            $data = $request->input();
            if ($request->hasFile('image')) {
                $data['image'] = $this->upload($request->image);
            }
            $user =  $this->storeUserData($data);
            LogHelper::logAction(Auth::id(), 'Users created');

            return ResponseHelper::SUCCESS('User created successfuly', $user, 200);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
    }

    #---- GET ROLES LISTS ---#
    public function getRoleList(Request $request)
    {
        $limit = $request->limit;
        $data = Role::paginate($limit);
        $data  = $this->paginateData($data);
        LogHelper::logAction(Auth::id(), 'Roles List fetch');
        return  ResponseHelper::SUCCESS('Users lists', $data);
    }

    #---- DELTE USER ---#
    public function deleteUser(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:users,id']
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first(), [], 400);
        }
        try {
            User::find($request->id)->delete();
            LogHelper::logAction(Auth::id(), 'User deleted');
            return ResponseHelper::SUCCESS('User deleted successfuly');
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
    }

    #---- GET LOGS ----#
    public function getLogs(Request $request)
    {
        $limit = $request->limit;
        $data = Log::paginate($limit);
        $data  = $this->paginateData($data);

        return ResponseHelper::SUCCESS('logs data', $data);
    }

    #---- GET LOG ----#
    public function getLog($id)
    {
        if ($id) {
            $data = Log::find($id);
        }
        return ResponseHelper::SUCCESS('log data', $data ?? null);
    }
}
