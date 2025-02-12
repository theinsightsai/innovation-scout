<?php

namespace App\Traits;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

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


    #--- UPLOAD FILE ----#
    public function uploadFile($file)
    {
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        return $file->storeAs('uploads/files', $fileName, 'public');
    }
}
