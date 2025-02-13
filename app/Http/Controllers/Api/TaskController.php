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
        $search = $request->search ?? '';

        $tasks = Task::search($search)->with(['user', 'assignTo'])->orderBy('created_at','desc')->paginate($limit);
        $data  = $this->paginateData($tasks);
        // LogHelper::logAction(Auth::id(), 'Task fetched');

        return  ResponseHelper::SUCCESS('Tasks lists', $data);
    }

    #--- GET TASK BY ID  ---#
    public function show(Request $request)
    {
        $id = $request->id;
        $task = Task::with(['user', 'assignTo'])->find($id);
        // LogHelper::logAction(Auth::id(), 'Task fetched');
        if ($task) {
            return  ResponseHelper::SUCCESS('Task data', $task);
        }
        return ResponseHelper::ERROR('Task not found');
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
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {

            $task = new Task();
            $task->user_id = Auth::id();
            $task->title = $request->description;
            $task->description = $request->description;
            $task->assign_to = $request->assign_to;
            $task->priority = $request->priority;
            $task->save();

            LogHelper::logAction(Auth::id(), 'Task created');

            return ResponseHelper::SUCCESS('Task created successfuly', $task);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }

    #--- UPDATE TASK ---#
    public function update(Request $request)
    {
        $priorities = Config::get('task.priority');
        $status = Config::get('task.status');

        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:tasks,id'],
            'title' => 'required',
            'description' => ['required'],
            'assign_to' => ['required', 'exists:users,id'],
            'priority' => ['required', Rule::in($priorities)],
            'status' => ['required', Rule::in($status)]
        ]);

        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            $task = Task::find($request->id);
            $task->title = $request->description;
            $task->description = $request->description;
            $task->assign_to = $request->assign_to;
            $task->priority = $request->priority;
            $task->status = $request->status;
            $task->save();

            LogHelper::logAction(Auth::id(), 'Task updated');

            return ResponseHelper::SUCCESS('Task updated successfuly', $task);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }


    #---- DELTE Task ---#
    public function delete(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:tasks,id']
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            Task::find($request->id)->delete();
            LogHelper::logAction(Auth::id(), 'Task deleted');
            return ResponseHelper::SUCCESS('Task deleted successfuly');
        } catch (Exception $e) {
            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }

    #--- UPDATE TASK PRIORITY ------#
    public function updatePriority(Request $request)
    {
        $priorities = Config::get('task.priority');

        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:tasks,id'],
            'priority' => ['required', Rule::in($priorities)],
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            $task = Task::find($request->id);
            $task->priority = $request->priority;
            $task->save();

            LogHelper::logAction(Auth::id(), 'Task priority updated');

            return ResponseHelper::SUCCESS('Task priority updated successfuly', $task,  200);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage);
        }
    }

    #--- UPDATE TASK STATUS ------#
    public function updateStatus(Request $request)
    {
        $status = Config::get('task.status');

        $valid = Validator::make($request->all(), [
            'id' => ['required', 'exists:tasks,id'],
            'status' => ['required', Rule::in($status)]
        ]);
        if ($valid->fails()) {
            return ResponseHelper::ERROR($valid->getMessageBag()->first());
        }
        try {
            $task = Task::find($request->id);
            $task->status = $request->status;
            $task->save();

            LogHelper::logAction(Auth::id(), 'Task status updated');

            return ResponseHelper::SUCCESS('Task status updated successfuly', $task,  200);
        } catch (Exception $e) {

            return ResponseHelper::ERROR($this->exceptionMessage,);
        }
    }
}
