<?php

namespace App\Http\Controllers\Api;

use App\Helpers\LogHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Imports\DataAnalysisImport;
use App\Imports\ExcelAnalysisImport;
use App\Imports\ExcelDataForecastImport;
use App\Imports\ForeCastingDataImport;
use App\Imports\GetHeadingFromExcel;
use App\Models\UserFile;
use App\Traits\CommonFunctionsTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\Process\Process;
use Illuminate\Support\Str;

class AnalysisController extends Controller
{

    use CommonFunctionsTrait;
    public $PYTHON_URL = '';

    public function __construct()
    {
        // Set PHP execution time and file upload limits for all methods in this controller
        ini_set('max_execution_time', 300);  // Set execution time to 5 minutes
        ini_set('upload_max_filesize', '50M');  // Set file upload size to 50MB
        ini_set('post_max_size', '50M');  // Set post max size to 50MB

        $this->PYTHON_URL = env('PYTHON_URL');
    }

    #---- Data predictions service ----#
    public function index(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:xlsx,csv|max:2048',
            'column' => 'required|string',
            'periods' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::ERROR($validator->errors()->first());
        }

        try {
            $import = new ExcelDataForecastImport($request->column);
            Excel::import($import, $request->file('file'));
            $data =  $import->getJsonData();

            if (isset($data) && !empty($data)) {
                // $this->uploadFile($request->file('file'));
                // Send data to Flask API
                $response = Http::timeout(300)->withHeaders([
                    'Accept' => 'application/json',
                ])->post($this->PYTHON_URL . '/forecast', [
                    'data' => $data,
                    'periods' => ($request->periods * 30)

                ]);
                LogHelper::logAction(Auth::id(), 'Forecasting request');
                return $response;
            }
        } catch (ValidationException $e) {
            return ResponseHelper::ERROR($e->getMessage());
        } catch (Exception $e) {
            return ResponseHelper::ERROR($e->getMessage());
        }
    }


    #---- ANALYSIS DATA USING AI AND PYTHON -----#
    public function analysis(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:xlsx,csv|max:2048',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::ERROR($validator->errors()->first());
        }

        try {
            $import = new ExcelAnalysisImport();
            Excel::import($import, $request->file('file'));
            $data =  $import->getJsonData();
        } catch (ValidationException $e) {
            return ResponseHelper::ERROR($e->getMessage());
        }

        $response = Http::timeout(300)->withHeaders([
            'Accept' => 'application/json',
        ])->post($this->PYTHON_URL . '/data', [
            'data' => $data,
            'prompt' => 'profit and loss'
        ]);
        LogHelper::logAction(Auth::id(), 'Data analysis request');

        return $response;
    }

    #---- ANALYSIS DATA USING AI AND PYTHON NEW  -----#
    public function analysisV1(Request $request)
    {
        $startTime = microtime(true); // Start time for Laravel request

        $validator = Validator::make($request->all(), [
            'file_id' => 'required|exists:user_files,id',
            'prompt' => 'nullable'
        ]);

        if ($validator->fails()) {
            return ResponseHelper::ERROR($validator->errors()->first());
        }

        try {
            $fileStartTime = microtime(true); // Start time for file processing

            $file = UserFile::where('user_id', Auth::id())->where('id', $request->file_id)->first()->file;
            $filePath = storage_path('app/public/' . $file);

            $import = new DataAnalysisImport();
            Excel::import($import, $filePath);
            $data = $import->getJsonData();

            $fileEndTime = microtime(true); // End time for file processing
            $fileProcessingTime = $fileEndTime - $fileStartTime;
            Log::info("File processing time: {$fileProcessingTime} seconds");
        } catch (ValidationException $e) {
            return ResponseHelper::ERROR($e->getMessage());
        }

        $pythonStartTime = microtime(true); // Start time for Python API request

        $response = Http::timeout(300)->withHeaders([
            'Accept' => 'application/json',
        ])->post($this->PYTHON_URL . '/data', [
            'data' => $data,
            'prompt' => 'profit and loss'
        ]);

        $pythonEndTime = microtime(true); // End time for Python API request
        $pythonResponseTime = $pythonEndTime - $pythonStartTime;
        Log::info("Python API response time: {$pythonResponseTime} seconds");

        LogHelper::logAction(Auth::id(), 'Data analysis request');

        $endTime = microtime(true); // End time for full Laravel request
        $totalExecutionTime = $endTime - $startTime;
        Log::info("Total Laravel request execution time: {$totalExecutionTime} seconds");

        return $response;
    }


    #---- UPLOAD FILE ----#
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:xlsx,csv|max:2048',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::ERROR($validator->errors()->first());
        }

        try {
            $path = $this->uploadFile($request->file('file'));
            if (isset($path) && !empty($path)) {
                $data = new UserFile();
                $data->user_id = Auth::id();
                $data->file = $path;
                $data->save();

                $filePath = storage_path('app/public/' . $path);

                $import = new GetHeadingFromExcel();
                Excel::import($import, $filePath);
                $data->columns = $import->getHeaders();

                LogHelper::logAction(Auth::id(), 'Excel file uploaded');

                return ResponseHelper::SUCCESS('File uploaded successfuly', $data);
            }
        } catch (Exception $e) {
            return ResponseHelper::ERROR($e->getMessage());
        }
    }

    #---- DATA FORECASTING NEW VERSION -----#
    public function forecastingVersion1(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'file_id' => 'required|exists:user_files,id',
            'date_column' => ['required'],
            'value_column' => ['required'],
            'periods' => ['required', 'integer', 'digits_between: 1,12']
        ]);

        if ($validator->fails()) {
            return ResponseHelper::ERROR($validator->errors()->first());
        }

        try {
            $file = UserFile::where('user_id', Auth::id())->where('id', $request->file_id)->first()->file;
            $filePath = storage_path('app/public/' . $file);

            $import = new ForeCastingDataImport(Str::lower($request->date_column), Str::lower($request->value_column));
            Excel::import($import, $filePath);
            $data =  $import->getJsonData();

            if (isset($data) && !empty($data)) {
                // Send data to Flask API
                $response = Http::timeout(300)->withHeaders([
                    'Accept' => 'application/json',
                ])->post($this->PYTHON_URL . '/forecast', [
                    'data' => $data,
                    'periods' => ($request->periods * 30)

                ]);
                LogHelper::logAction(Auth::id(), 'New Dataforecasting api request');

                return $response;
            }
        } catch (ValidationException $e) {
            return ResponseHelper::ERROR($e->getMessage());
        } catch (Exception $e) {
            return ResponseHelper::ERROR($e->getMessage());
        }
    }


    #--- SENTIMENT ANALYSIS ----#
    public function sentimentAnalysis(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::ERROR($validator->errors()->first());
        }

        try {
            $response = Http::timeout(300)->withHeaders([
                'Accept' => 'application/json',
            ])->post($this->PYTHON_URL . '/sentiment-analysis', [
                'data' => $request->text
            ]);

            return $response;
        } catch (Exception) {
            ResponseHelper::ERROR('Something went wrong');
        }
    }
}
