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
        $search = $request->search ?? '';

        $users = User::search($search)->where('role_id', $type)->with(['role'])->orderBy('created_at','desc')->paginate($limit);
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
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            $data = $request->input();
            if ($request->hasFile('image')) {
                $data['image'] = $this->upload($request->image);
            }
            $user =  $this->storeUserData($data);
            LogHelper::logAction(Auth::id(), 'Users created');

            return ResponseHelper::SUCCESS('User created successfuly', $user);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }

    #---- GET ROLES LISTS ---#
    public function getRoleList(Request $request)
    {
        $limit = $request->limit;
        $data = Role::orderBy('created_at','desc')->paginate($limit);
        $data  = $this->paginateData($data);
        // LogHelper::logAction(Auth::id(), 'Roles List fetch');
        return  ResponseHelper::SUCCESS('Users lists', $data);
    }

    #---- DELTE USER ---#
    public function deleteUser(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:users,id']
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            User::find($request->id)->delete();
            LogHelper::logAction(Auth::id(), 'User deleted');
            return ResponseHelper::SUCCESS('User deleted successfuly');
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }

    #---- GET LOGS ----#
    public function getLogs(Request $request)
    {
        $limit = $request->limit;
        $search = $request->search ?? '';
        $data = Log::search($search)->with('user.role')->orderBy('created_at','desc')->paginate($limit);
        $data  = $this->paginateData($data);

        return ResponseHelper::SUCCESS('logs data', $data);
    }

    #---- GET LOG ----#
    public function getLog($id)
    {
        $data = Log::with('user.role')->find($id);
        if ($data) {
            return ResponseHelper::SUCCESS('log data', $data ?? null);
        }
        return ResponseHelper::ERROR('Log data not found');
    }

    #------ DELETE LOGS -----#
    public function deleteLogs(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:logs,id']
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            Log::find($request->id)->delete();
            LogHelper::logAction(Auth::id(), 'Logs deleted');
            return ResponseHelper::SUCCESS('Logs deleted successfuly');
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }
}
