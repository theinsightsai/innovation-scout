<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExcelAnalysisImport implements ToCollection, WithHeadingRow, SkipsEmptyRows
{
    /**
     * @param Collection $collection
     */
    public $data  = [];
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        // Check if sheet is empty
        if ($rows->isEmpty()) {
            throw ValidationException::withMessages([
                'error' => ['The uploaded Excel file is empty.']
            ]);
        }

        // Convert collection to array for duplicate check
        $data = $rows->toArray();

        // Check for duplicate rows
        if (count($data) !== count(array_unique($data, SORT_REGULAR))) {
            throw ValidationException::withMessages([
                'error' => ['Duplicate rows found in the Excel file.']
            ]);
        }

        $this->data = $rows;

    }

    public function getJsonData()
    {
        return $this->data;
    }
}
