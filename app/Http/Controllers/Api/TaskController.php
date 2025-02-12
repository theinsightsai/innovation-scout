<?php

namespace App\Http\Controllers\Api;

use App\Helpers\LogHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Traits\CommonFunctionsTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    use CommonFunctionsTrait;
    public $exceptionMessage = 'Something went wrong';
    public function __construct()
    {
        $this->middleware('PermissionCheck'); // check is admin or have permissions

    }

    #--- GET TASKS ---#
    public function index(Request $request)
    {
        $limit = $request->limit;
        $tasks = Task::with(['user', 'assignTo'])->paginate($limit);
        $data  = $this->paginateData($tasks);
        LogHelper::logAction(Auth::id(), 'Task fetched');

        return  ResponseHelper::SUCCESS('Tasks lists', $data);
    }

    #--- CREATE TASK ---#
    public function store(Request $request)
    {
        $priorities = Config::get('task.priority');

        $valid = Validator::make($request->all(), [
            'title' => 'required',
            'description' => ['required'],
            'assign_to' => ['required', 'exists:users,id'],
            'priority' => ['required', Rule::in($priorities)]
        ]);

        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first(), [], 400);
        }
        try {

            $task = new Task();
            $task->user_id = Auth::id();
            $task->title = Auth::id();
            $task->description = Auth::id();
            

            LogHelper::logAction(Auth::id(), 'Task created');

            return ResponseHelper::SUCCESS('Task created successfuly',  200);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage, [], 400);
        }
    }
}
