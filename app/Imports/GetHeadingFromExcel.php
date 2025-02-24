<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToArray;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GetHeadingFromExcel implements ToArray
{
    public $headers;
    /**
     * @param Collection $collection
     */
    public function array(array $rows)
    {
       return $this->headers = $rows[0];
    }

    public function getHeaders()
    {
        return $this->headers;
    }
}
