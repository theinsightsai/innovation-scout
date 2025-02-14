<?php

namespace App\Http\Controllers\Api;

use App\Helpers\LogHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Traits\CommonFunctionsTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    use CommonFunctionsTrait;
    public $exceptionMessage = 'Something went wrong';

    public function __construct()
    {
        $this->middleware('PermissionCheck'); // check is admin or have permissions

    }

    #---- GET ROLES LISTS ---#
    public function index(Request $request)
    {
        $limit = $request->limit;
        $data = Role::orderBy('created_at', 'desc')->paginate($limit);
        $data  = $this->paginateData($data);
        return  ResponseHelper::SUCCESS('Roles lists', $data);
    }

    #---- GET SINGLE ROLE ---#
    public function show(Request $request)
    {
        $id = $request->id;
        $data = Role::find($id);
        return  ResponseHelper::SUCCESS('Role data', $data);
    }

    #----- CREATE ROLES -----#
    public function store(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'name' => ['required', 'string', 'unique:roles,name'],
            'status' => ['required', 'in:0,1'],
            'users' => ['nullable', 'array']
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }

        try {
            $role =  new Role();
            $role->name = $request->name;
            $role->status = $request->status;
            $role->slug = Str::slug($request->name);
            $role->is_deletable = 1;
            $role->save();

            if ($role && !empty($request->users)) {
                User::whereIn('id', $request->users)->update(['role_id' => $role->id]);
            }

            LogHelper::logAction(Auth::id(), 'Role created');
            return ResponseHelper::SUCCESS('Role Created successfuly', $role);
        } catch (Exception $e) {
            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }


    #--- UPDATE ----#
    public function update(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:roles,id'],
            'name' => ['required', 'string',  Rule::unique('roles', 'name')->ignore($request->id)],
            'status' => ['required', 'in:0,1']
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }

        try {
            $role = Role::find($request->id);
            $role->name = $request->name;
            $role->status = $request->status;
            $role->slug = Str::slug($request->name);
            $role->save();

            LogHelper::logAction(Auth::id(), 'Role updated');
            return ResponseHelper::SUCCESS('Role updated successfuly', $role);
        } catch (Exception $e) {
            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }


    #---- DELETE ----#
    public function delete(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:roles,id'],
            'new_id' => ['required', 'exists:roles,id']
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            User::where('role_id', $request->id)->update(['role_id' => $request->new_id]);
            Role::find($request->id)->delete();
            LogHelper::logAction(Auth::id(), 'Role deleted');
            return ResponseHelper::SUCCESS('Role deleted successfuly');
        } catch (Exception $e) {
            dd($e);
            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }
}
