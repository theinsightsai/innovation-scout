<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    #---- Data predictions service ----#
    public function index(Request $request)
    {
        dd($request->file('file'));
    }
}
