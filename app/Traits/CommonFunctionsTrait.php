<?php

namespace App\Traits;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

trait CommonFunctionsTrait
{
    public function paginateData($data)
    {
        return [
            'data' => $data->items(),
            'total' => $data->total(),
            // 'current_page' => $data->currentPage(),
            'per_page' => $data->perPage(),
            // 'last_page' => $data->lastPage(),
            'total_pages' =>  $data->total() > 0 ? ceil($data->total() / $data->perPage()) : 0
        ];
    }

    #---- send notifications to admins -----#
    public function storeNotificationForAdmins($msg)
    {
        $admins = User::where('role_id', 1);
        if (Auth::user()->role->id === 1) {
            $admins =  $admins->where('id','!=',Auth::id());
        }
        $admins = $admins->get();
        foreach ($admins as $user) {
            Notification::create([
                'user_id' => $user->id,
                'message' => $msg
            ]);
        }
    }
    
    #---- send notifications to admins -----#
    public function storeNotification($user_id, $msg)
    {
       return Notification::create([
            'user_id' => $user_id,
            'message' => $msg
        ]);
    }

    #--- UPLOAD FILE ----#
    public function uploadFile($file)
    {
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        return $file->storeAs('uploads/files', $fileName, 'public');
    }
}
