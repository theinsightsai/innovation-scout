<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExcelDataForecastImport implements ToCollection, WithHeadingRow, SkipsEmptyRows
{
    public $data  = [];
    public $column;

    function __construct($column)
    {
        $this->column = $column;
    }
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
        $rows = $rows->toArray();

        // Check for duplicate rows
        // if (count($rows) !== count(array_unique($rows, SORT_REGULAR))) {
        //     throw ValidationException::withMessages([
        //         'error' => ['Duplicate rows found in the Excel file.']
        //     ]);
        // }
        // Validate each row
        foreach ($rows as $row) {
            $validator = Validator::make($row, [
                'date' => 'required|date',
                $this->column => 'required'
            ]);

            if ($validator->fails()) {
                throw ValidationException::withMessages([
                    'error' => $validator->getMessageBag()->first()
                ]);
            }
            $this->data[] = [
                'ds' => $row['date'],
                'y' => $row[$this->column]
            ];
        }
    }

    public function getJsonData()
    {
        return $this->data;
    }
}
