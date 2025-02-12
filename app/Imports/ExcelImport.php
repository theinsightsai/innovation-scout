<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExcelImport implements ToCollection, WithHeadingRow, SkipsEmptyRows
{
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
       
        // Validate each row
        foreach ($rows as $row) {
            $validator = Validator::make($row->toArray(), [
                'ds' => 'required',
                'v'  => 'required',
            ]);

            if ($validator->fails()) {
                throw ValidationException::withMessages([
                    'error' => $validator->getMessageBag()->first()
                ]);
            }
            $this->data[] = $row->toArray();
        }
    }

    public function getJsonData()
    {
        return $this->data;
    }
}
