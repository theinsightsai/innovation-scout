<?php

namespace App\Helpers;

class ResponseHelper
{
    public static function SUCCESS($message, $data = null, $status = 200)
    {
        $response['status'] = $status;
        $response['message'] = $message;

        if (!is_null($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $status);
    }

    public static function ERROR($message, $data = null, $status = 400)
    {
        $response['status'] = $status;
        $response['message'] = $message;

        if (!empty($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $status);
    }
}
