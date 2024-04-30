<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Services\LogService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\File;

class ContentController extends Controller
{
    private const videoPath = "public/videos/";
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : JsonResponse
    {
        $videoName = "";

        try 
        {
            $request->validate
            (
                [
                    'category_id' => 'required|integer',
                    'title' => 'required|string|unique:contents',
                    'description' => 'required|string',
                    'thumbnail' => 'required|string',
                    'video' => 'required|file|mimes:mp4,mov,avi,flv|max:204800'
                ]
            );

            if (!$request->hasFile('video'))
                return response()->json(["message" => "Upload failed!"], HttpResponse::HTTP_BAD_REQUEST);

            DB::beginTransaction();

            $video = $request->file('video');
            $filename = time() . '.' . $video->getClientOriginalExtension();
            $videoName = $filename;
            $video->move(base_path(self::videoPath), $filename);
            $path = '/videos/'.$filename;

            Content::create
            ([
                'category_id' => $request->category_id,
                'title' => $request->title,
                'description' => $request->description,
                'thumbnail' => $request->thumbnail,
                'filepath' => $path,
            ]);

            DB::commit();

            return response()->json(['message' => 'Video cargado exitosamente', 'path' => $path], HttpResponse::HTTP_OK);
        } 
        catch (ValidationException $vex) 
        {
            return response()->json($vex->errors(), HttpResponse::HTTP_UNPROCESSABLE_ENTITY);
        } 
        catch (Exception $ex) 
        {
            DB::rollBack();
            if (file_exists(base_path(self::videoPath) . $videoName)) 
            {
                File::delete(base_path(self::videoPath) . $videoName);
            }
            LogService::sendToLog($ex->getMessage());
            Log::error($ex->getMessage());
            Log::error($ex->getTraceAsString());
            return response()->json(["error" => "Error de servidor, intente de nuevo más tarde"], HttpResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        //
    }
}
