<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;

class DataAnalysisImport implements ToCollection, WithHeadingRow, SkipsEmptyRows
{
    public $data;
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        return $this->data = $rows;
    }

    public function getJsonData()
    {
        return $this->data;
    }
}
