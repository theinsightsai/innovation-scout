<?php

namespace App\Helpers;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class LogHelper
{
    public static function logAction($user_id, $action)
    {
        return Log::create([
            'user_id' => $user_id,
            'action' => $action,
            'ip_address' => Request::ip(),
        ]);
    }
}
