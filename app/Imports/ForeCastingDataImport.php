<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToArray;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ForeCastingDataImport implements ToCollection, WithHeadingRow, SkipsEmptyRows
{

    public $dateColumn, $valueColumn, $data;
    function __construct($dateColumn, $valueColumn)
    {
        $this->dateColumn = $dateColumn;
        $this->valueColumn = $valueColumn;
    }
    /**
     * @param Collection $collection
     */

    public function collection(collection $rows)
    {
        foreach ($rows as $row) {
            $this->data[] = [
                'ds' => $row[$this->dateColumn],
                'y' => $row[$this->valueColumn]
            ];
        }

        return $this->data;
    }
    
    public function getJsonData()
    {
        return $this->data;
    }
}
