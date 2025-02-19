<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Imports\ExcelAnalysisImport;
use App\Imports\ExcelDataForecastImport;
use App\Traits\CommonFunctionsTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\Process\Process;

class AnalysisController extends Controller
{
    use CommonFunctionsTrait;
    #---- Data predictions service ----#
    public function index(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:xlsx,csv|max:2048',
            'column' => 'required|string',
            'periods' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'error' => $validator->errors()->first()], 400);
        }

        try {
            $import = new ExcelDataForecastImport($request->column);
            Excel::import($import, $request->file('file'));
            $data =  $import->getJsonData();
        } catch (ValidationException $e) {
            return response()->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }

        try {
            if (isset($data) && !empty($data)) {
                // $this->uploadFile($request->file('file'));
                // Send data to Flask API
                $response = Http::withHeaders([
                    'Accept' => 'application/json',
                ])->post('http://127.0.0.1:5000/forecast', [
                    'data' => $data,
                    'periods' => ($request->periods * 30)

                ]);
                return $response;
            }
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }
    }


    #---- ANALYSIS DATA USING AI AND PYTHON -----#
    public function analysis(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:xlsx,csv|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'error' => $validator->errors()->first()], 400);
        }

        try {
            $import = new ExcelAnalysisImport();
            Excel::import($import, $request->file('file'));
            $data =  $import->getJsonData();
        } catch (ValidationException $e) {
            return response()->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }

        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->post('http://127.0.0.1:5000/data', [
            'data' => $data,
            'prompt' => 'profit and loss'
        ]);
        return $response;
    }
}
