<?php

namespace App\Imports;

use DateTime;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToArray;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GetHeadingFromExcel implements ToArray, WithHeadingRow
{
    public $headers;
    protected $dateColumns = [];
    protected $otherColumns = [];

    /**
     * @param Collection $collection
     */
    public function array(array $rows)
    {
        if (!empty($rows)) {
            $headers = array_keys($rows[0]);

            foreach ($headers as $column) {

                if ($this->isDateColumn($column, $rows)) {
                    $this->headers['dateColumns'][] = $column;
                } else {
                    $this->headers['otherColumns'][] = $column;
                }
            }
        }
    }

    private function isDateColumn(string $column, array $rows): bool
    {
        $totalCount = 0;
        $validDateCount = 0;

        foreach ($rows as $row) {
            $value = trim($row[$column] ?? '');

            if ($value !== '') {
                $totalCount++;

                // Attempt to create a DateTime object
                $dateTime = DateTime::createFromFormat('Y-m-d', $value) ?:
                    DateTime::createFromFormat('Y/m/d', $value) ?:
                    DateTime::createFromFormat('d/m/Y', $value) ?:
                    DateTime::createFromFormat('m/d/Y', $value) ?:
                    DateTime::createFromFormat('d M Y', $value) ?:
                    DateTime::createFromFormat('M d, Y', $value) ?:
                    DateTime::createFromFormat('Ymd', $value);

                // Check if the dateTime object is valid and matches the original value
                if ($dateTime && $dateTime->format('Y-m-d') === $value) {
                    $validDateCount++;
                }
            }
        }

        // Check for 100% accuracy
        return $totalCount > 0 && $validDateCount === $totalCount;
    }


    public function getHeaders()
    {
        return $this->headers;
    }
}
