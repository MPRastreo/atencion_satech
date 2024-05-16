<?php

use App\Http\Controllers\FeedbackController;
use App\Models\Category;
use App\Models\Content;
use App\Services\LogService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    try {
        $categories = Category::with('contents')->get();
        $content = Content::with('category')->orderByDesc("created_at")->get();
        return Inertia::render('Home/Index', ['categories' => $categories, 'content'=> $content]);
    }
    catch (Exception $ex)
    {
        LogService::sendToLog($ex->getMessage());
        Log::error($ex->getMessage());
        Log::error($ex->getTraceAsString());
        abort(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error de servidor');
    }
})->name('index');

Route::get("/blog/{slug}", function (string $slug) {
    try {
        $category = Category::with('contents')->where('slug', '=', $slug)->first();

        if (!isset($category)) {
            return to_route('index');
        }

        $categories = Category::orderByDesc("created_at")->get();
        return Inertia::render('Home/CategoryDetail', ['category' => $category, 'categories' => $categories]);
    }
    catch (Exception $ex)
    {
        LogService::sendToLog($ex->getMessage());
        Log::error($ex->getMessage());
        Log::error($ex->getTraceAsString());
        abort(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error de servidor');
    }
})->name('category.index');

Route::get("/blog/{slug}/{id}", function (string $slug, string $id) {
    try {
        $content = Content::with('category')->find($id);

        if (!isset($content))
            return to_route('index');

        if ($content->category->slug !== $slug)
            return to_route('index');

        $categories = Category::all();
        return Inertia::render('Home/ContentDetail', ['categories' => $categories, 'content' => $content]);
    }
    catch (Exception $ex)
    {
        LogService::sendToLog($ex->getMessage());
        Log::error($ex->getMessage());
        Log::error($ex->getTraceAsString());
        abort(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error de servidor');
    }
})->name('content.detail');

Route::resource('feedback', FeedbackController::class)->only('store');
